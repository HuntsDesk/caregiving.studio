import React, { useState } from 'react';
import { X, PillIcon } from 'lucide-react';
import { format } from 'date-fns';
import { useRxLogs } from '../../hooks/useRxLogs';
import DeleteButton from '../shared/DeleteButton';
import Overlay from '../shared/Overlay';
import Alert from '../shared/Alert';
import type { RxLogWithDetails } from '../../types/rxLog';

interface RxLogDetailsTrayProps {
  log: RxLogWithDetails;
  onClose: () => void;
}

export default function RxLogDetailsTray({ log, onClose }: RxLogDetailsTrayProps) {
  const [error, setError] = useState<string | null>(null);
  const { deleteLog } = useRxLogs();

  const handleDelete = async () => {
    try {
      await deleteLog(log.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete log entry');
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
            
            <div className="relative px-6 pt-6 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <PillIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-center gap-3">
                  <DeleteButton 
                    onDelete={handleDelete}
                    confirmMessage="Are you sure you want to delete this log entry?"
                  />
                  <button
                    onClick={onClose}
                    className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {log.prescription.name}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {log.prescription.dosage}
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              {error && (
                <Alert
                  type="error"
                  title="Error"
                  message={error}
                />
              )}

              <div className="space-y-4">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  <p>Administered: {format(new Date(log.administeredAt), 'MMM d, yyyy h:mm a')}</p>
                  <p>Patient: {log.prescription.patient.firstName} {log.prescription.patient.lastName}</p>
                </div>

                {log.notes && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {log.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}