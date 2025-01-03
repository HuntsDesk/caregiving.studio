import React from 'react';
import PrescriptionItem from './PrescriptionItem';
import type { Prescription } from '../../types/prescription';

interface PatientGroupProps {
  name: string;
  patientId: string;
  prescriptions: Prescription[];
  onContactClick: (patientId: string) => void;
  onPrescriptionClick: (prescription: Prescription) => void;
  onAdministered: () => void;
}

export default function PatientGroup({
  name,
  patientId,
  prescriptions,
  onContactClick,
  onPrescriptionClick,
  onAdministered
}: PatientGroupProps) {
  return (
    <div className="pl-[26px]">
      <button
        onClick={() => onContactClick(patientId)}
        className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline text-left mb-3"
      >
        {name}
      </button>

      <div className="pl-[32px] space-y-4">
        {prescriptions.map((prescription) => (
          <PrescriptionItem
            key={prescription.id}
            prescription={prescription}
            onPrescriptionClick={onPrescriptionClick}
            onAdministered={onAdministered}
          />
        ))}
      </div>
    </div>
  );
}