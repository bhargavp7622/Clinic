import AsyncStorage from '@react-native-async-storage/async-storage';
import { LayoutConfig, Booking } from '@types';

const STORAGE_KEYS = {
  LAYOUT_CONFIG: '@tapza/layout_config_cache',
  CONFIG_MODE: '@tapza/active_config_mode',
  BOOKINGS: '@tapza/user_bookings',
  DOSE_HISTORY: '@tapza/dose_taken_history',
  DEV_SETTINGS: '@tapza/dev_resilience_settings',
  LANGUAGE: '@tapza/user_language',
};

export interface DevSettings {
  simulatedLatencyMs: number;
  forceFailure: boolean;
  simulateSlotConflict: boolean;
}

export const DEFAULT_DEV_SETTINGS: DevSettings = {
  simulatedLatencyMs: 400,
  forceFailure: false,
  simulateSlotConflict: false,
};

export const StorageService = {
  async saveCachedConfig(config: LayoutConfig): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LAYOUT_CONFIG, JSON.stringify(config));
    } catch {}
  },

  async getCachedConfig(): Promise<LayoutConfig | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.LAYOUT_CONFIG);
      return data ? (JSON.parse(data) as LayoutConfig) : null;
    } catch {
      return null;
    }
  },

  async saveActiveConfigMode(mode: 'normal' | 'festival'): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CONFIG_MODE, mode);
    } catch {}
  },

  async getActiveConfigMode(): Promise<'normal' | 'festival'> {
    try {
      const mode = await AsyncStorage.getItem(STORAGE_KEYS.CONFIG_MODE);
      return mode === 'festival' ? 'festival' : 'normal';
    } catch {
      return 'normal';
    }
  },

  async getBookings(): Promise<Booking[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.BOOKINGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  async saveBooking(booking: Booking): Promise<Booking[]> {
    try {
      const current = await this.getBookings();
      const filtered = current.filter(b => b.id !== booking.id);
      const updated = [booking, ...filtered];
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
      return updated;
    } catch {
      return [];
    }
  },

  async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<void> {
    try {
      const current = await this.getBookings();
      const updated = current.map(b => (b.id === bookingId ? { ...b, status, isOptimistic: false } : b));
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch {}
  },

  async removeBooking(bookingId: string): Promise<void> {
    try {
      const current = await this.getBookings();
      const updated = current.filter(b => b.id !== bookingId);
      await AsyncStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    } catch {}
  },

  async getDoseHistory(): Promise<Record<string, boolean>> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DOSE_HISTORY);
      return data ? JSON.parse(data) : {};
    } catch {
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
    } catch {
      return {};
    }
  },

  async getDevSettings(): Promise<DevSettings> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.DEV_SETTINGS);
      return data ? { ...DEFAULT_DEV_SETTINGS, ...JSON.parse(data) } : DEFAULT_DEV_SETTINGS;
    } catch {
      return DEFAULT_DEV_SETTINGS;
    }
  },

  async saveDevSettings(settings: DevSettings): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DEV_SETTINGS, JSON.stringify(settings));
    } catch {}
  },

  async getLanguage(): Promise<string> {
    try {
      return (await AsyncStorage.getItem(STORAGE_KEYS.LANGUAGE)) || 'en';
    } catch {
      return 'en';
    }
  },

  async saveLanguage(lang: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    } catch {}
  },

  async clearAll(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.LAYOUT_CONFIG),
        AsyncStorage.removeItem(STORAGE_KEYS.CONFIG_MODE),
        AsyncStorage.removeItem(STORAGE_KEYS.BOOKINGS),
        AsyncStorage.removeItem(STORAGE_KEYS.DOSE_HISTORY),
      ]);
    } catch {}
  },
};
