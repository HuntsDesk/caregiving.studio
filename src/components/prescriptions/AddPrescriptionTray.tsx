import React, { useState } from 'react';
import { X, PillIcon } from 'lucide-react';
import Button from '../shared/Button';
import Overlay from '../shared/Overlay';
import { useToast } from '../../contexts/ToastContext';
import PrescriptionForm from './PrescriptionForm';
import type { PrescriptionFormData } from '../../types/prescription';

interface AddPrescriptionTrayProps {
  onClose: () => void;
  onAdd: (prescription: PrescriptionFormData) => Promise<void>;
}

export default function AddPrescriptionTray({ onClose, onAdd }: AddPrescriptionTrayProps) {
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (data: PrescriptionFormData) => {
    if (!data.name.trim() || !data.patientId) {
      showToast('Please enter medication name and select a patient', 'error');
      return;
    }

    setLoading(true);
    try {
      await onAdd(data);
      showToast('Prescription added successfully', 'success');
      onClose();
    } catch (err) {
      showToast(
        err instanceof Error ? err.message : 'Failed to add prescription',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-y-0 right-0 w-full md:w-[32rem] bg-white dark:bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
            
            <div className="relative px-6 pt-6 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <PillIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New Prescription
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <PrescriptionForm
              onSubmit={handleSubmit}
              loading={loading}
              onCancel={onClose}
            />
          </div>
        </div>
      </div>
    </Overlay>
  );
}