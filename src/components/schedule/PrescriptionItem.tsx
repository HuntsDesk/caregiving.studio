import React, { useEffect } from 'react';
import { useRxLogs } from '../../hooks/useRxLogs';
import AdministerButton from './AdministerButton';
import { format } from 'date-fns';
import type { Prescription } from '../../types/prescription';

interface PrescriptionItemProps {
  prescription: Prescription;
  onPrescriptionClick: (prescription: Prescription) => void;
  onAdministered: () => void;
}

export default function PrescriptionItem({
  prescription,
  onPrescriptionClick,
  onAdministered
}: PrescriptionItemProps) {
  const { logs, refresh } = useRxLogs(prescription.id);
  
  useEffect(() => {
    refresh();
  }, [refresh]);

  const latestLog = logs[0];
  const today = new Date().toDateString();
  const isAdministered = latestLog && 
    new Date(latestLog.administeredAt).toDateString() === today;

  const handleAdministered = () => {
    refresh();
    onAdministered();
  };

  return (
    <div className="group relative -mx-3 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-blue-50/80 dark:hover:bg-blue-900/20">
      <div className="flex items-center justify-between gap-4 min-h-[3.5rem]">
        <button
          onClick={() => onPrescriptionClick(prescription)}
          className="flex-1 text-left"
        >
          <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {prescription.name}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
            {prescription.dosage}
          </div>
          {latestLog && (
            <div className="text-sm text-gray-500 dark:text-gray-500 mt-1 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              {isAdministered ? 
                `Administered today at ${format(new Date(latestLog.administeredAt), 'h:mm a')}` : 
                `Last administered ${format(new Date(latestLog.administeredAt), 'MMM d, yyyy')}`}
            </div>
          )}
        </button>

        <AdministerButton
          prescriptionId={prescription.id}
          onAdministered={handleAdministered}
        />
      </div>
    </div>
  );
}