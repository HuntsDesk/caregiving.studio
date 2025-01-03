import { Users, UserCog, Building } from 'lucide-react';
import type { ContactType } from '../types/contact';

export const contactTypes = [
  { 
    type: 'patient' as ContactType, 
    label: 'Patients', 
    dropdownLabel: 'Patient',
    icon: Users 
  },
  { 
    type: 'doctor' as ContactType, 
    label: 'Doctors', 
    dropdownLabel: 'Doctor',
    icon: UserCog 
  },
  { 
    type: 'pharmacy' as ContactType, 
    label: 'Pharmacies', 
    dropdownLabel: 'Pharmacy',
    icon: Building 
  },
] as const;

export const getContactTypeIcon = (type: ContactType) => {
  const typeConfig = contactTypes.find(t => t.type === type);
  return typeConfig?.icon;
};

export const getContactTypeStyles = (type: ContactType) => {
  switch (type) {
    case 'doctor':
      return { iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50 dark:bg-emerald-900/20' };
    case 'pharmacy':
      return { iconColor: 'text-purple-600', bgColor: 'bg-purple-50 dark:bg-purple-900/20' };
    default:
      return { iconColor: 'text-blue-600', bgColor: 'bg-blue-50 dark:bg-blue-900/20' };
  }
};