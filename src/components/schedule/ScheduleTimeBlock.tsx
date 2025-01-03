import React from 'react';
import { cn } from '../../lib/utils';
import { scheduleIcons, scheduleColors, type AccentColor } from '../../utils/scheduleConstants';
import { groupAndSortByPatient } from '../../utils/scheduleHelpers';
import TimeBlockHeader from './TimeBlockHeader';
import PatientGroup from './PatientGroup';
import type { Prescription } from '../../types/prescription';

interface ScheduleTimeBlockProps {
  title: string;
  subtitle?: string;
  accentColor: AccentColor;
  prescriptions: Prescription[];
  onContactClick: (patientId: string) => void;
  onPrescriptionClick: (prescription: Prescription) => void;
  onAdministered: () => void;
}

export default function ScheduleTimeBlock({ 
  title, 
  subtitle, 
  accentColor, 
  prescriptions,
  onContactClick,
  onPrescriptionClick,
  onAdministered
}: ScheduleTimeBlockProps) {
  const Icon = scheduleIcons[title as keyof typeof scheduleIcons];
  const colors = scheduleColors[accentColor];
  const patientGroups = groupAndSortByPatient(prescriptions);

  return (
    <div className={cn(
      "relative pl-6 before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:rounded-full",
      colors.border
    )}>
      <TimeBlockHeader 
        title={title}
        subtitle={subtitle}
        icon={Icon}
        colors={colors}
      />

      <div className="space-y-8">
        {patientGroups.map(({ name, prescriptions: patientPrescriptions }) => (
          <PatientGroup
            key={patientPrescriptions[0].patientId}
            name={name}
            patientId={patientPrescriptions[0].patientId}
            prescriptions={patientPrescriptions}
            onContactClick={onContactClick}
            onPrescriptionClick={onPrescriptionClick}
            onAdministered={onAdministered}
          />
        ))}
        
        {prescriptions.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 pl-[26px]">
            No medications scheduled
          </p>
        )}
      </div>
    </div>
  );
}