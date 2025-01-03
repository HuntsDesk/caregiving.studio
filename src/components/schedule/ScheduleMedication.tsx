import React from 'react';
import { Check } from 'lucide-react';
import type { Prescription } from '../../types/prescription';

interface ScheduleMedicationProps {
  prescription: Prescription;
}

export default function ScheduleMedication({ prescription }: ScheduleMedicationProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <h5 className="font-medium text-gray-900 dark:text-white">
          {prescription.name}
        </h5>
        <p className="text-sm text-gray-500">
          {prescription.dosage}
        </p>
      </div>

      <button className="shrink-0 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center gap-1.5 text-sm font-medium transition-colors">
        <Check className="w-3.5 h-3.5" />
        Administer
      </button>
    </div>
  );
}