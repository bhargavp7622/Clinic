import { MockApiClient, updateApiClientDevSettings, ApiError, generateMockSlots } from '@api';

describe('Booking State & Mock API Tests', () => {
  beforeEach(async () => {
    await updateApiClientDevSettings({
      simulatedLatencyMs: 0,
      forceFailure: false,
      simulateSlotConflict: false,
    });
  });

  it('generates consistent slots for doctor and selected date', () => {
    const slots = generateMockSlots('doc-1', '2026-10-25');
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0].doctorId).toBe('doc-1');
    expect(slots.some(s => s.available)).toBe(true);
    expect(slots.some(s => !s.available)).toBe(true);
  });

  it('creates booking successfully via MockApiClient', async () => {
    const booking = await MockApiClient.createBooking({
      doctorId: 'doc-1',
      doctorName: 'Dr. A. Srinivas Rao',
      specialty: 'General Physician',
      slotId: 'doc-1-2026-10-25-0900',
      date: '2026-10-25',
      startsAt: '09:00 AM',
      endsAt: '09:30 AM',
      feeInr: 450,
      clinicName: 'Tapza Clinic, Banjara Hills',
    });

    expect(booking).toBeDefined();
    expect(booking.id).toMatch(/^bk-/);
    expect(booking.status).toBe('confirmed');
    expect(booking.feeInr).toBe(450);
  });

  it('throws 409 ApiError when simulateSlotConflict is enabled', async () => {
    await updateApiClientDevSettings({
      simulateSlotConflict: true,
    });

    await expect(
      MockApiClient.createBooking({
        doctorId: 'doc-1',
        slotId: 'doc-1-2026-10-25-0900',
        date: '2026-10-25',
      })
    ).rejects.toThrow(ApiError);

    try {
      await MockApiClient.createBooking({
        doctorId: 'doc-1',
        slotId: 'doc-1-2026-10-25-0900',
        date: '2026-10-25',
      });
    } catch (e: any) {
      expect(e.status).toBe(409);
      expect(e.message).toContain('409 Conflict');
    }
  });

  it('falls back to cached config when network failure is simulated', async () => {
    await updateApiClientDevSettings({ forceFailure: false, simulatedLatencyMs: 0 });
    const initial = await MockApiClient.getConfig();
    expect(initial.fromCache).toBe(false);

    await updateApiClientDevSettings({ forceFailure: true });
    const fallback = await MockApiClient.getConfig();

    expect(fallback.config).toBeDefined();
    expect(fallback.fromCache).toBe(true);
  });
});
