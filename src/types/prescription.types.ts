export type MedicineTiming = 'morning' | 'afternoon' | 'night';

export interface Medicine {
  id: string;
  name: string;
  dose: string;       // e.g. "500 mg", "1 tablet"
  days: number;       // e.g. 5, 14, 30
  timing: MedicineTiming[];
  instructions?: string; // e.g. "After food with warm water"
}

export interface Prescription {
  id: string;
  issuedAt: string;
  doctorName: string;
  clinicName: string;
  patientName?: string;
  diagnosis?: string;
  medicines: Medicine[];
}

export interface DoseRecordKey {
  prescriptionId: string;
  medicineId: string;
  timing: MedicineTiming;
  dateStr: string; // YYYY-MM-DD
}
