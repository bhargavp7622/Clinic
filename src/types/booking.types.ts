export interface Slot {
  id: string;
  doctorId: string;
  startsAt: string; // e.g. "09:30 AM" or ISO string
  endsAt: string;   // e.g. "10:00 AM" or ISO string
  available: boolean;
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  doctorId: string;
  doctorName: string;
  specialty: string;
  slotId: string;
  date: string; // YYYY-MM-DD
  startsAt: string;
  endsAt: string;
  feeInr: number;
  clinicName: string;
  status: BookingStatus;
  createdAt: string;
  isOptimistic?: boolean;
}

export interface CreateBookingPayload {
  doctorId: string;
  slotId: string;
  date: string;
  doctorName?: string;
  specialty?: string;
  feeInr?: number;
  clinicName?: string;
  startsAt?: string;
  endsAt?: string;
}
