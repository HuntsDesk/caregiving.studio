export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'asNeeded';

export interface ScheduleItem {
  id: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  timeOfDay: TimeOfDay;
  startDate: string;
  endDate?: string;
  lastAdministered?: string;
  previousAdministered?: string;
  patientId: string;
  patientName: string;
}

export const timeOfDayLabels: Record<TimeOfDay, string> = {
  morning: 'Morning (6 AM - 12 PM)',
  afternoon: 'Afternoon (12 PM - 5 PM)',
  evening: 'Evening (5 PM - 9 PM)',
  bedtime: 'Bedtime (9 PM - 11 PM)',
  asNeeded: 'As Needed'
};

export const timeOfDayColors: Record<TimeOfDay, {
  bg: string,
  text: string,
  icon: string
}> = {
  morning: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    icon: 'text-orange-600 dark:text-orange-400'
  },
  afternoon: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    icon: 'text-blue-600 dark:text-blue-400'
  },
  evening: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    icon: 'text-indigo-600 dark:text-indigo-400'
  },
  bedtime: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    icon: 'text-purple-600 dark:text-purple-400'
  },
  asNeeded: {
    bg: 'bg-gray-50 dark:bg-gray-800',
    text: 'text-gray-600 dark:text-gray-400',
    icon: 'text-gray-600 dark:text-gray-400'
  }
};