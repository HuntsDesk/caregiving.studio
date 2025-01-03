import React, { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { Clock, User, PillIcon, Edit2 } from 'lucide-react';
import { useRxLogs } from '../../hooks/useRxLogs';
import LoadingSpinner from '../shared/LoadingSpinner';
import Alert from '../shared/Alert';
import EditLogModal from './EditLogModal';

interface RxLogListProps {
  patientId?: string;
}

export default function RxLogList({ patientId }: RxLogListProps) {
  const [editingLog, setEditingLog] = useState<string | null>(null);
  const { logs, loading, error } = useRxLogs(undefined, patientId);

  const handleEditClick = useCallback((logId: string) => {
    setEditingLog(logId);
  }, []);

  const handleCloseModal = useCallback(() => {
    setEditingLog(null);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <Alert
        type="error"
        title="Error loading medication logs"
        message={error}
      />
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-800">
      {logs.map(log => (
        <div
          key={log.id}
          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <PillIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {log.prescription.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {log.prescription.dosage}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleEditClick(log.id)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <div className="text-sm text-gray-500">
                {format(new Date(log.administeredAt), 'MMM d, yyyy h:mm a')}
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <User className="w-4 h-4" />
            <span>
              {log.prescription.patient.firstName} {log.prescription.patient.lastName}
            </span>
          </div>

          {log.notes && (
            <div className="mt-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {log.notes}
              </p>
            </div>
          )}
        </div>
      ))}

      {editingLog && (
        <EditLogModal
          logId={editingLog}
          onClose={handleCloseModal}
        />
      )}

      {logs.length === 0 && (
        <p className="text-center text-gray-500 dark:text-gray-400 py-8">
          No medication logs found
        </p>
      )}
    </div>
  );
}