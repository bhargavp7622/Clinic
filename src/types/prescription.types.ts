export type MedicineTiming = 'morning' | 'afternoon' | 'night';

export interface Medicine {
  id: string;
  name: string;
  dose: string;
  days: number;
  timing: MedicineTiming[];
  instructions?: string;
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
  dateStr: string;
}
