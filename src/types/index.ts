export interface Contact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface Professional {
  id: string;
  name: string;
  specialty: string;
  facility: string;
  phone: string;
  email: string;
  address: string;
  nextAppointment?: string;
  notes?: string;
}

export interface Prescription {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedBy: string;
  pharmacy: string;
  refillDate?: string;
  notes?: string;
  active: boolean;
  takeWithFood?: boolean;
  adverseReaction?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'medical' | 'medication' | 'other';
  description?: string;
  location?: string;
}

export interface Document {
  id: string;
  title: string;
  type: 'medical' | 'legal' | 'insurance' | 'other';
  uploadDate: Date;
  lastModified: Date;
  size: number;
  url: string;
  tags?: string[];
}