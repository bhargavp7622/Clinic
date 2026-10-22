import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Prescription, MedicineTiming } from '@/types/prescription.types';
import { MockApiClient } from '@/api/mockApiClient';
import { StorageService } from '@/services/storage.service';
import { triggerHaptic } from '@/utils/haptics';

interface PrescriptionContextType {
  prescriptions: Prescription[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
  doseHistory: Record<string, boolean>;
  todayDateStr: string;
  isDoseTaken: (prescriptionId: string, medicineId: string, timing: MedicineTiming, dateStr?: string) => boolean;
  toggleDoseTaken: (prescriptionId: string, medicineId: string, timing: MedicineTiming, dateStr?: string) => Promise<boolean>;
  getPrescriptionById: (id: string) => Prescription | undefined;
  refreshPrescriptions: (searchQuery?: string) => Promise<void>;
}

const PrescriptionContext = createContext<PrescriptionContextType>({
  prescriptions: [],
  isLoading: false,
  isError: false,
  errorMessage: null,
  doseHistory: {},
  todayDateStr: '',
  isDoseTaken: () => false,
  toggleDoseTaken: async () => false,
  getPrescriptionById: () => undefined,
  refreshPrescriptions: async () => {},
});

const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [doseHistory, setDoseHistory] = useState<Record<string, boolean>>({});

  const todayDateStr = useMemo(() => getTodayDateString(), []);

  const loadData = useCallback(async (searchQuery?: string) => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage(null);
    try {
      const [rxList, history] = await Promise.all([
        MockApiClient.getPrescriptions(searchQuery),
        StorageService.getDoseHistory(),
      ]);
      setPrescriptions(rxList);
      setDoseHistory(history);
    } catch (e: any) {
      setIsError(true);
      setErrorMessage(e?.message || 'Failed to load prescriptions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isDoseTaken = useCallback(
    (prescriptionId: string, medicineId: string, timing: MedicineTiming, dateStr?: string): boolean => {
      const targetDate = dateStr || todayDateStr;
      const key = `${prescriptionId}_${medicineId}_${timing}_${targetDate}`;
      return !!doseHistory[key];
    },
    [doseHistory, todayDateStr]
  );

  const toggleDoseTaken = useCallback(
    async (
      prescriptionId: string,
      medicineId: string,
      timing: MedicineTiming,
      dateStr?: string
    ): Promise<boolean> => {
      const targetDate = dateStr || todayDateStr;
      const currentStatus = isDoseTaken(prescriptionId, medicineId, timing, targetDate);
      const newStatus = !currentStatus;

      triggerHaptic(newStatus ? 'success' : 'light');

      const key = `${prescriptionId}_${medicineId}_${timing}_${targetDate}`;
      setDoseHistory(prev => {
        const next = { ...prev };
        if (newStatus) {
          next[key] = true;
        } else {
          delete next[key];
        }
        return next;
      });

      await StorageService.setDoseTaken(prescriptionId, medicineId, timing, targetDate, newStatus);
      return newStatus;
    },
    [isDoseTaken, todayDateStr]
  );

  const getPrescriptionById = useCallback(
    (id: string) => {
      return prescriptions.find(p => p.id === id);
    },
    [prescriptions]
  );

  const value = useMemo(
    () => ({
      prescriptions,
      isLoading,
      isError,
      errorMessage,
      doseHistory,
      todayDateStr,
      isDoseTaken,
      toggleDoseTaken,
      getPrescriptionById,
      refreshPrescriptions: loadData,
    }),
    [
      prescriptions,
      isLoading,
      isError,
      errorMessage,
      doseHistory,
      todayDateStr,
      isDoseTaken,
      toggleDoseTaken,
      getPrescriptionById,
      loadData,
    ]
  );

  return <PrescriptionContext.Provider value={value}>{children}</PrescriptionContext.Provider>;
};

export const usePrescriptions = () => useContext(PrescriptionContext);
