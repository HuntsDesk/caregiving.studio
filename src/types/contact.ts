export type ContactType = 'patient' | 'doctor' | 'pharmacy';

export interface Contact {
  id: string;
  type: ContactType;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  notes?: string;
  specialty?: string; // For doctors
  facility?: string; // For doctors/pharmacies
  prescriptions?: string[]; // IDs of associated prescriptions
}

export interface MedicationSchedule {
  morning: string[];
  afternoon: string[];
  evening: string[];
  bedtime: string[];
}