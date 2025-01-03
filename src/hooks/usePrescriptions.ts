import { useState } from 'react';
import type { Prescription } from '../types';

export function usePrescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '14mg',
      frequency: 'Twice daily',
      startDate: '2024-01-01',
      prescribedBy: 'Dr. David Williams',
      pharmacy: 'Health Plus Downtown',
      active: true,
      takeWithFood: true,
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '600mg',
      frequency: 'Daily',
      startDate: '2024-01-01',
      prescribedBy: 'Dr. David Williams',
      pharmacy: 'Health Plus Downtown',
      active: true,
      takeWithFood: false,
    },
  ]);

  const togglePrescriptionStatus = (id: string) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.id === id
          ? { ...prescription, active: !prescription.active }
          : prescription
      )
    );
  };

  const updatePrescription = (id: string, updates: Partial<Prescription>) => {
    setPrescriptions(prevPrescriptions =>
      prevPrescriptions.map(prescription =>
        prescription.id === id
          ? { ...prescription, ...updates }
          : prescription
      )
    );
  };

  return { prescriptions, togglePrescriptionStatus, updatePrescription };
}