import React from 'react';
import ScheduleTimeBlock from './ScheduleTimeBlock';
import type { Prescription } from '../../types/prescription';

interface ScheduleLayoutProps {
  scheduleGroups: {
    morning: Prescription[];
    afternoon: Prescription[];
    evening: Prescription[];
    bedtime: Prescription[];
    asNeeded: Prescription[];
  };
  onContactClick: (patientId: string) => void;
  onPrescriptionClick: (prescription: Prescription) => void;
  onAdministered: () => void;
}

export default function ScheduleLayout({
  scheduleGroups,
  onContactClick,
  onPrescriptionClick,
  onAdministered
}: ScheduleLayoutProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Today's Schedule
        </h2>
      </div>
      
      <div className="p-6 space-y-12">
        <ScheduleTimeBlock
          title="Morning"
          subtitle="(6 AM - 12 PM)"
          accentColor="orange"
          prescriptions={scheduleGroups.morning}
          onContactClick={onContactClick}
          onPrescriptionClick={onPrescriptionClick}
          onAdministered={onAdministered}
        />
        
        <ScheduleTimeBlock
          title="Afternoon"
          subtitle="(12 PM - 5 PM)"
          accentColor="blue"
          prescriptions={scheduleGroups.afternoon}
          onContactClick={onContactClick}
          onPrescriptionClick={onPrescriptionClick}
          onAdministered={onAdministered}
        />
        
        <ScheduleTimeBlock
          title="Evening"
          subtitle="(5 PM - 9 PM)"
          accentColor="indigo"
          prescriptions={scheduleGroups.evening}
          onContactClick={onContactClick}
          onPrescriptionClick={onPrescriptionClick}
          onAdministered={onAdministered}
        />
        
        <ScheduleTimeBlock
          title="Bedtime"
          subtitle="(9 PM - 11 PM)"
          accentColor="purple"
          prescriptions={scheduleGroups.bedtime}
          onContactClick={onContactClick}
          onPrescriptionClick={onPrescriptionClick}
          onAdministered={onAdministered}
        />

        <ScheduleTimeBlock
          title="As Needed"
          accentColor="gray"
          prescriptions={scheduleGroups.asNeeded}
          onContactClick={onContactClick}
          onPrescriptionClick={onPrescriptionClick}
          onAdministered={onAdministered}
        />
      </div>
    </div>
  );
}