export const PRESCRIPTION_SCHEDULES = [
  'Once daily (morning)',
  'Once daily (evening)',
  'Once daily (bedtime)',
  'Twice daily',
  'Three times daily', 
  'Four times daily',
  'As needed',
  'Monthly'
] as const;

export type PrescriptionSchedule = typeof PRESCRIPTION_SCHEDULES[number];

export interface PrescriptionPatient {
  id: string;
  firstName: string;
  lastName: string;
}

export interface PrescriptionDoctor {
  id: string;
  firstName: string;
  lastName: string;
  specialty?: string;
}

export interface PrescriptionPharmacy {
  id: string;
  firstName: string;
  lastName: string;
  facility?: string;
}

export interface PrescriptionFormData {
  name: string;
  dosage: string;
  frequency: PrescriptionSchedule;
  startDate: string;
  endDate?: string;
  active: boolean;
  takeWithFood: boolean;
  notes?: string;
  patientId: string;
  doctorId?: string;
  pharmacyId?: string;
}

export interface Prescription extends PrescriptionFormData {
  id: string;
  adverseReaction?: string | null;
  createdAt: string;
  updatedAt: string;
  patient: PrescriptionPatient;
  doctor?: PrescriptionDoctor;
  pharmacy?: PrescriptionPharmacy;
}