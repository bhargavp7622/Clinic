import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutConfig } from '../types/config.types';
import { Booking } from '../types/booking.types';

const STORAGE_KEYS = {
  LAYOUT_CONFIG: '@tapza/layout_config_cache',
  CONFIG_MODE: '@tapza/active_config_mode',
  BOOKINGS: '@tapza/user_bookings',
  DOSE_HISTORY: '@tapza/dose_taken_history',
  DEV_SETTINGS: '@tapza/dev_resilience_settings',
  LANGUAGE: '@tapza/user_language',
};

export interface DevSettings {
  simulatedLatencyMs: number; // 0, 1000, 3000
  forceFailure: boolean;
  simulateSlotConflict: boolean;
}

export const DEFAULT_DEV_SETTINGS: DevSettings = {
  simulatedLatencyMs: 400,
  forceFailure: false,
  simulateSlotConflict: false,
};

export const StorageService = {
  // Config caching for offline resilience
  async saveCachedConfig(config: LayoutConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAYOUT_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.warn('Failed to cache layout config to storage', e);
    }
  },

  async getCachedConfig(): Promise<LayoutConfig | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAYOUT_CONFIG);
      return data ? (JSON.parse(data) as LayoutConfig) : null;
    } catch (e) {
      console.warn('Failed to read cached layout config', e);
      return null;
    }
  },

  // Active runtime config mode ('normal' | 'festival')
  async saveActiveConfigMode(mode: 'normal' | 'festival'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CONFIG_MODE, mode);
    } catch (e) {
      console.warn('Failed to save config mode', e);
    }
  },

  async getActiveConfigMode(): Promise<'normal' | 'festival'> {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.CONFIG_MODE);
      return mode === 'festival' ? 'festival' : 'normal';
    } catch (e) {
      return 'normal';
    }
  },

  // User Bookings
  async getBookings(): Promise<Booking[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },

  async saveBooking(booking: Booking): Promise<Booking[]> {
    try {
      const current = await this.getBookings();
      // Remove any existing duplicate or optimistic version with same id
      const filtered = current.filter(b => b.id !== booking.id);
      const updated = [booking, ...filtered];
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch (e) {
      console.warn('Failed to save booking', e);
      return [];
    }
  },

  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
    try {
      const current = await this.getBookings();
      const updated = current.map(b => (b.id === bookingId ? { ...b, status, isOptimistic: false } : b));
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to update booking status', e);
    }
  },

  async removeBooking(bookingId: string): Promise<void> {
    try {
      const current = await this.getBookings();
      const updated = current.filter(b => b.id !== bookingId);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to remove booking', e);
    }
  },

  // Dose History (Prescription ID + Medicine ID + Timing + Date)
  async getDoseHistory(): Promise<Record<string, boolean>> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DOSE_HISTORY);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      return {};
    }
  },

  async setDoseTaken(
    prescriptionId: string,
    medicineId: string,
    timing: string,
    dateStr: string,
    taken: boolean
  ): Promise<Record<string, boolean>> {
    try {
      const history = await this.getDoseHistory();
      const key = `${prescriptionId}_${medicineId}_${timing}_${dateStr}`;
      if (taken) {
        history[key] = true;
      } else {
        delete history[key];
      }
      await AsyncStorage.setItem(STORAGE_KEYS.DOSE_HISTORY, JSON.stringify(history));
      return history;
    } catch (e) {
      console.warn('Failed to update dose history', e);
      return {};
    }
  },

  // Resilience & Dev Settings (Switch for latency & failure)
  async getDevSettings(): Promise<DevSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DEV_SETTINGS);
      return data ? { ...DEFAULT_DEV_SETTINGS, ...JSON.parse(data) } : DEFAULT_DEV_SETTINGS;
    } catch (e) {
      return DEFAULT_DEV_SETTINGS;
    }
  },

  async saveDevSettings(settings: DevSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DEV_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save dev settings', e);
    }
  },

  // Language setting (en, hi, te)
  async getLanguage(): Promise<string> {
    try {
      return (await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE)) || 'en';
    } catch (e) {
      return 'en';
    }
  },

  async saveLanguage(lang: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch (e) {
      console.warn('Failed to save language', e);
    }
  },

  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.LAYOUT_CONFIG),
        AsyncStorage.removeItem(STORAGE_KEYS.CONFIG_MODE),
        AsyncStorage.removeItem(STORAGE_KEYS.BOOKINGS),
        AsyncStorage.removeItem(STORAGE_KEYS.DOSE_HISTORY),
      ]);
    } catch (e) {
      console.warn('Failed to clear storage', e);
    }
  },
};
