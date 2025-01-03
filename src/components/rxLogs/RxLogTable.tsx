import React, { useState, useMemo } from 'react';
import { formatDisplayDate } from '../../utils/dateFormatters';
import { useRxLogs } from '../../hooks/useRxLogs';
import LoadingSpinner from '../shared/LoadingSpinner';
import Alert from '../shared/Alert';
import AdministratorInfo from './AdministratorInfo';
import RxLogDetailsTray from './RxLogDetailsTray';
import SortIcon from '../shared/SortIcon';
import type { RxLogWithDetails } from '../../types/rxLog';

interface RxLogTableProps {
  patientId?: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}

type SortField = 'date' | 'medication' | 'patient' | 'administrator';
type SortDirection = 'asc' | 'desc';

export default function RxLogTable({ patientId, dateRange }: RxLogTableProps) {
  const [selectedLog, setSelectedLog] = useState<RxLogWithDetails | null>(null);
  const [sortField, setSortField] = useState<SortField>('date');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const { logs, loading, error } = useRxLogs(undefined, patientId, dateRange);

  const sortedLogs = useMemo(() => {
    return [...logs].sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case 'date':
          comparison = new Date(a.administeredAt).getTime() - new Date(b.administeredAt).getTime();
          break;
        case 'medication':
          comparison = a.prescription.name.localeCompare(b.prescription.name);
          break;
        case 'patient':
          comparison = `${a.prescription.patient.lastName}, ${a.prescription.patient.firstName}`
            .localeCompare(`${b.prescription.patient.lastName}, ${b.prescription.patient.firstName}`);
          break;
        case 'administrator':
          if (!a.administrator && !b.administrator) comparison = 0;
          else if (!a.administrator) comparison = -1;
          else if (!b.administrator) comparison = 1;
          else comparison = a.administrator.displayName.localeCompare(b.administrator.displayName);
          break;
      }
      
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [logs, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <Alert type="error" title="Error" message={error} />;

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800">
              <th 
                className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-1">
                  Date/Time
                  <SortIcon active={sortField === 'date'} direction={sortDirection} />
                </div>
              </th>
              <th 
                className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('medication')}
              >
                <div className="flex items-center gap-1">
                  Medication
                  <SortIcon active={sortField === 'medication'} direction={sortDirection} />
                </div>
              </th>
              <th 
                className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('patient')}
              >
                <div className="flex items-center gap-1">
                  Patient
                  <SortIcon active={sortField === 'patient'} direction={sortDirection} />
                </div>
              </th>
              <th 
                className="text-left py-4 px-6 text-sm font-medium text-gray-600 dark:text-gray-400 cursor-pointer"
                onClick={() => handleSort('administrator')}
              >
                <div className="flex items-center gap-1">
                  Administered By
                  <SortIcon active={sortField === 'administrator'} direction={sortDirection} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedLogs.map((log) => (
              <tr 
                key={log.id}
                onClick={() => setSelectedLog(log)}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <td className="py-4 px-6 text-sm text-gray-900 dark:text-white">
                  {formatDisplayDate(log.administeredAt)}
                </td>
                <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                  {log.prescription.name}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900 dark:text-white">
                  {log.prescription.patient.firstName} {log.prescription.patient.lastName}
                </td>
                <td className="py-4 px-6">
                  <AdministratorInfo 
                    email={log.administrator?.email}
                    displayName={log.administrator?.displayName}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {sortedLogs.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No medication logs found
          </div>
        )}
      </div>

      {selectedLog && (
        <RxLogDetailsTray
          log={selectedLog}
          onClose={() => setSelectedLog(null)}
        />
      )}
    </>
  );
}