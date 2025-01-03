import React, { useState, useMemo } from 'react';
import { PillIcon, Clock, User, ChevronUp, ChevronDown } from 'lucide-react';
import { formatDisplayDate } from '../../utils/dateFormatters';
import type { Prescription } from '../../types/prescription';

interface PrescriptionTableProps {
  prescriptions: Prescription[];
  onPrescriptionClick: (prescription: Prescription) => void;
}

type SortField = 'name' | 'schedule' | 'patient' | 'doctor' | 'startDate';
type SortDirection = 'asc' | 'desc';

export default function PrescriptionTable({ prescriptions, onPrescriptionClick }: PrescriptionTableProps) {
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const sortedPrescriptions = useMemo(() => {
    return [...prescriptions].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'schedule':
          comparison = a.frequency.localeCompare(b.frequency);
          break;
        case 'patient':
          comparison = `${a.patient.lastName}, ${a.patient.firstName}`
            .localeCompare(`${b.patient.lastName}, ${b.patient.firstName}`);
          break;
        case 'doctor':
          if (!a.doctor && !b.doctor) comparison = 0;
          else if (!a.doctor) comparison = -1;
          else if (!b.doctor) comparison = 1;
          else {
            comparison = `${a.doctor.lastName}, ${a.doctor.firstName}`
              .localeCompare(`${b.doctor.lastName}, ${b.doctor.firstName}`);
          }
          break;
        case 'startDate':
          comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [prescriptions, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center gap-1">
                Medication
                <SortIcon field="name" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('schedule')}
            >
              <div className="flex items-center gap-1">
                Schedule
                <SortIcon field="schedule" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('patient')}
            >
              <div className="flex items-center gap-1">
                Patient
                <SortIcon field="patient" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('doctor')}
            >
              <div className="flex items-center gap-1">
                Doctor
                <SortIcon field="doctor" />
              </div>
            </th>
            <th 
              className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
              onClick={() => handleSort('startDate')}
            >
              <div className="flex items-center gap-1">
                Start Date
                <SortIcon field="startDate" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {sortedPrescriptions.map((prescription) => (
            <tr 
              key={prescription.id}
              onClick={() => onPrescriptionClick(prescription)}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
            >
              <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/50 rounded-lg">
                    <PillIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{prescription.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{prescription.dosage}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{prescription.frequency}</span>
                </div>
              </td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-900 dark:text-white">
                    {`${prescription.patient.firstName} ${prescription.patient.lastName}`}
                  </span>
                </div>
              </td>
              <td className="py-4 px-6">
                <span className="text-gray-900 dark:text-white">
                  {prescription.doctor ? 
                    `Dr. ${prescription.doctor.firstName} ${prescription.doctor.lastName}` +
                    (prescription.doctor.specialty ? ` (${prescription.doctor.specialty})` : '')
                    : '-'}
                </span>
              </td>
              <td className="py-4 px-6">
                <span className="text-gray-900 dark:text-white">
                  {formatDisplayDate(prescription.startDate)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {sortedPrescriptions.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No prescriptions found
        </div>
      )}
    </div>
  );
}