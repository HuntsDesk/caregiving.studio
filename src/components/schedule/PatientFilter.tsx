import React from 'react';
import { ChevronDown } from 'lucide-react';
import { useSupabaseContacts } from '../../hooks/useSupabaseContacts';

interface PatientFilterProps {
  selectedPatient: string;
  onPatientChange: (value: string) => void;
}

export default function PatientFilter({ selectedPatient, onPatientChange }: PatientFilterProps) {
  const { contacts } = useSupabaseContacts();
  const patients = contacts.filter(c => c.type === 'patient');

  return (
    <div className="relative">
      <select
        value={selectedPatient}
        onChange={(e) => onPatientChange(e.target.value)}
        className="appearance-none w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Patients</option>
        {patients.map(patient => (
          <option key={patient.id} value={patient.id}>
            {patient.firstName} {patient.lastName}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
        <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
    </div>
  );
}