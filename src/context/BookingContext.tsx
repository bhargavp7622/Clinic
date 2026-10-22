import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Booking, CreateBookingPayload } from '@types';
import { MockApiClient, ApiError } from '@api';
import { StorageService } from '@services';
import { triggerHaptic } from '@utils';

interface BookingContextType {
  bookings: Booking[];
  isLoading: boolean;
  isBookingInProgress: boolean;
  lastBookedItem: Booking | null;
  createBooking: (payload: CreateBookingPayload) => Promise<{ success: boolean; booking?: Booking; error?: string }>;
  cancelBooking: (bookingId: string) => Promise<void>;
  refreshBookings: () => Promise<void>;
}

const BookingContext = createContext<BookingContextType>({
  bookings: [],
  isLoading: false,
  isBookingInProgress: false,
  lastBookedItem: null,
  createBooking: async () => ({ success: false }),
  cancelBooking: async () => {},
  refreshBookings: async () => {},
});

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isBookingInProgress, setIsBookingInProgress] = useState<boolean>(false);
  const [lastBookedItem, setLastBookedItem] = useState<Booking | null>(null);

  const loadBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const stored = await StorageService.getBookings();
      setBookings(stored);
    } catch {} finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const createBooking = useCallback(
    async (payload: CreateBookingPayload): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
      setIsBookingInProgress(true);

      const tempId = `temp-bk-${Date.now()}`;
      const optimisticBooking: Booking = {
        id: tempId,
        doctorId: payload.doctorId,
        doctorName: payload.doctorName || 'Specialist Doctor',
        specialty: payload.specialty || 'General Physician',
        slotId: payload.slotId,
        date: payload.date,
        startsAt: payload.startsAt || '10:00 AM',
        endsAt: payload.endsAt || '10:30 AM',
        feeInr: payload.feeInr || 450,
        clinicName: payload.clinicName || 'Tapza Clinic',
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        isOptimistic: true,
      };

      setBookings(prev => [optimisticBooking, ...prev]);
      setLastBookedItem(optimisticBooking);
      triggerHaptic('success');

      try {
        const confirmedBooking = await MockApiClient.createBooking(payload);

        setBookings(prev =>
          prev.map(b => (b.id === tempId ? { ...confirmedBooking, isOptimistic: false } : b))
        );
        setLastBookedItem(confirmedBooking);

        return { success: true, booking: confirmedBooking };
      } catch (err: any) {
        if (err instanceof ApiError && err.status === 409) {
          setBookings(prev => prev.filter(b => b.id !== tempId));
          setLastBookedItem(null);
          triggerHaptic('warning');
          return {
            success: false,
            error: err.message || 'This slot was just taken by another patient. Please pick another slot.',
          };
        }

        const offlineBooking: Booking = {
          ...optimisticBooking,
          id: `offline-${Date.now()}`,
          status: 'pending',
          isOptimistic: false,
        };

        setBookings(prev => prev.map(b => (b.id === tempId ? offlineBooking : b)));
        await StorageService.saveBooking(offlineBooking);

        return {
          success: true,
          booking: offlineBooking,
          error: 'Offline mode: Booking saved locally and will sync once reconnected.',
        };
      } finally {
        setIsBookingInProgress(false);
      }
    },
    []
  );

  const cancelBooking = useCallback(async (bookingId: string) => {
    try {
      await StorageService.removeBooking(bookingId);
      setBookings(prev => prev.filter(b => b.id !== bookingId));
      triggerHaptic('light');
    } catch {}
  }, []);

  const value = useMemo(
    () => ({
      bookings,
      isLoading,
      isBookingInProgress,
      lastBookedItem,
      createBooking,
      cancelBooking,
      refreshBookings: loadBookings,
    }),
    [bookings, isLoading, isBookingInProgress, lastBookedItem, createBooking, cancelBooking, loadBookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};

export const useBooking = () => useContext(BookingContext);
