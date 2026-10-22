import {
  LayoutConfig,
  Doctor,
  Slot,
  Booking,
  CreateBookingPayload,
  Prescription,
} from '@types';
import {
  NORMAL_LAYOUT_CONFIG,
  FESTIVAL_LAYOUT_CONFIG,
  MOCK_DOCTORS,
  MOCK_PRESCRIPTIONS,
  generateMockSlots,
} from './mockData';
import { StorageService, DevSettings, DEFAULT_DEV_SETTINGS } from '@services';

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

let currentDevSettings: DevSettings = { ...DEFAULT_DEV_SETTINGS };
let currentConfigMode: 'normal' | 'festival' = 'normal';

export const initApiClient = async () => {
  currentDevSettings = await StorageService.getDevSettings();
  currentConfigMode = await StorageService.getActiveConfigMode();
};

export const updateApiClientDevSettings = async (settings: Partial<DevSettings>) => {
  currentDevSettings = { ...currentDevSettings, ...settings };
  await StorageService.saveDevSettings(currentDevSettings);
};

export const getApiClientDevSettings = (): DevSettings => currentDevSettings;

export const setRuntimeConfigMode = async (mode: 'normal' | 'festival') => {
  currentConfigMode = mode;
  await StorageService.saveActiveConfigMode(mode);
};

export const getRuntimeConfigMode = (): 'normal' | 'festival' => currentConfigMode;

const simulateNetwork = async () => {
  if (currentDevSettings.simulatedLatencyMs > 0) {
    await new Promise<void>(resolve => {
      setTimeout(() => resolve(), currentDevSettings.simulatedLatencyMs);
    });
  }
  if (currentDevSettings.forceFailure) {
    throw new ApiError('Simulated Network Failure: Unable to connect to Tapza Care servers', 503);
  }
};

export const MockApiClient = {
  async getConfig(): Promise<{ config: LayoutConfig; fromCache: boolean }> {
    try {
      await simulateNetwork();
      const config = currentConfigMode === 'festival' ? FESTIVAL_LAYOUT_CONFIG : NORMAL_LAYOUT_CONFIG;
      await StorageService.saveCachedConfig(config);
      return { config, fromCache: false };
    } catch {
      const cached = await StorageService.getCachedConfig();
      if (cached) {
        return { config: cached, fromCache: true };
      }
      return { config: NORMAL_LAYOUT_CONFIG, fromCache: true };
    }
  },

  async getDoctors(options?: {
    search?: string;
    specialty?: string;
    page?: number;
    limit?: number;
  }): Promise<{ doctors: Doctor[]; total: number; hasMore: boolean }> {
    await simulateNetwork();

    let list = [...MOCK_DOCTORS];

    if (options?.specialty && options.specialty !== 'All') {
      const q = options.specialty.toLowerCase();
      list = list.filter(d => d.specialty.toLowerCase().includes(q));
    }

    if (options?.search) {
      const q = options.search.toLowerCase().trim();
      list = list.filter(
        d =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.clinicLocation.toLowerCase().includes(q) ||
          d.languages.some(lang => lang.toLowerCase().includes(q))
      );
    }

    const page = options?.page || 1;
    const limit = options?.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      doctors: paginated,
      total: list.length,
      hasMore: startIndex + limit < list.length,
    };
  },

  async getSlots(doctorId: string, dateStr: string): Promise<Slot[]> {
    await simulateNetwork();
    return generateMockSlots(doctorId, dateStr);
  },

  async createBooking(payload: CreateBookingPayload): Promise<Booking> {
    await simulateNetwork();

    if (currentDevSettings.simulateSlotConflict) {
      throw new ApiError('409 Conflict: This slot was just reserved by another patient. Please choose another time.', 409);
    }

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      doctorId: payload.doctorId,
      doctorName: payload.doctorName || 'Doctor',
      specialty: payload.specialty || 'General Physician',
      slotId: payload.slotId,
      date: payload.date,
      startsAt: payload.startsAt || '10:00 AM',
      endsAt: payload.endsAt || '10:30 AM',
      feeInr: payload.feeInr || 450,
      clinicName: payload.clinicName || 'Tapza Clinic, Hyderabad',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      isOptimistic: false,
    };

    await StorageService.saveBooking(newBooking);
    return newBooking;
  },

  async getPrescriptions(searchQuery?: string): Promise<Prescription[]> {
    await simulateNetwork();
    if (!searchQuery) {
      return [...MOCK_PRESCRIPTIONS];
    }
    const q = searchQuery.toLowerCase().trim();
    return MOCK_PRESCRIPTIONS.filter(
      p =>
        p.doctorName.toLowerCase().includes(q) ||
        p.clinicName.toLowerCase().includes(q) ||
        p.diagnosis?.toLowerCase().includes(q) ||
        p.medicines.some(m => m.name.toLowerCase().includes(q))
    );
  },
};
