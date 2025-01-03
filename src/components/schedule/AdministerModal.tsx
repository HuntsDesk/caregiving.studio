import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useRxLogs } from '../../hooks/useRxLogs';
import Button from '../shared/Button';
import Overlay from '../shared/Overlay';

interface AdministerModalProps {
  prescriptionId: string;
  onClose: () => void;
  onAdministered: () => void;
}

export default function AdministerModal({ 
  prescriptionId, 
  onClose, 
  onAdministered 
}: AdministerModalProps) {
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const { addLog } = useRxLogs();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addLog(prescriptionId, notes);
      onAdministered();
      onClose();
    } catch (error) {
      console.error('Error logging administration:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-md">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Log Medication Administration
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label 
                htmlFor="notes" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg"
                placeholder="Add any notes about this administration..."
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging...' : 'Log Administration'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Overlay>
  );
}