import React, { useState, useEffect } from 'react';
import { X, PillIcon } from 'lucide-react';
import { useSupabasePrescriptions } from '../../hooks/useSupabasePrescriptions';
import DeleteButton from '../shared/DeleteButton';
import EditablePrescriptionHeader from './EditablePrescriptionHeader';
import EditableField from '../shared/EditableField';
import ContactDisplay from './ContactDisplay';
import AdverseReactionInput from './AdverseReactionInput';
import Overlay from '../shared/Overlay';
import Alert from '../shared/Alert';
import Toggle from '../shared/Toggle';
import type { Prescription } from '../../types/prescription';

interface PrescriptionDetailsTrayProps {
  prescription: Prescription;
  onClose: () => void;
}

export default function PrescriptionDetailsTray({ prescription: initialPrescription, onClose }: PrescriptionDetailsTrayProps) {
  const [error, setError] = useState<string | null>(null);
  const { updatePrescription, deletePrescription, prescriptions } = useSupabasePrescriptions();
  
  // Keep local state in sync with latest prescription data
  const [prescription, setPrescription] = useState(initialPrescription);
  
  useEffect(() => {
    const updatedPrescription = prescriptions.find(p => p.id === initialPrescription.id);
    if (updatedPrescription) {
      setPrescription(updatedPrescription);
    }
  }, [prescriptions, initialPrescription.id]);

  const handleDelete = async () => {
    try {
      await deletePrescription(prescription.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete prescription');
    }
  };

  const handleFieldUpdate = async (field: keyof Prescription, value: any) => {
    try {
      setError(null);
      await updatePrescription(prescription.id, { [field]: value });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update prescription');
      throw err;
    }
  };

  const handleAdverseReactionToggle = async () => {
    const newValue = prescription.adverseReaction === null ? '' : null;
    await handleFieldUpdate('adverseReaction', newValue);
  };

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
            
            <div className="relative px-6 pt-6 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                  <PillIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-center gap-2">
                  <DeleteButton 
                    onDelete={handleDelete}
                    confirmMessage={`Are you sure you want to delete ${prescription.name}?`}
                    compact
                  />
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {prescription.name}
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{prescription.dosage}</span>
                  <span>•</span>
                  <span>{prescription.frequency}</span>
                </div>
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
                <Toggle
                  checked={prescription.active}
                  onChange={() => handleFieldUpdate('active', !prescription.active)}
                  label="Active Prescription"
                />
                
                <Toggle
                  checked={prescription.takeWithFood}
                  onChange={() => handleFieldUpdate('takeWithFood', !prescription.takeWithFood)}
                  label="Take with food"
                />

                <Toggle
                  checked={prescription.adverseReaction !== null}
                  onChange={handleAdverseReactionToggle}
                  label="Adverse reaction"
                />

                {prescription.adverseReaction !== null && (
                  <AdverseReactionInput
                    value={prescription.adverseReaction}
                    onChange={(value) => handleFieldUpdate('adverseReaction', value)}
                  />
                )}
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Contacts</h3>
                
                <ContactDisplay
                  label="Patient"
                  contact={prescription.patient}
                  type="patient"
                  value={prescription.patientId}
                  onChange={(value) => handleFieldUpdate('patientId', value)}
                />

                <ContactDisplay
                  label="Doctor"
                  contact={prescription.doctor}
                  type="doctor"
                  value={prescription.doctorId || ''}
                  onChange={(value) => handleFieldUpdate('doctorId', value)}
                />

                <ContactDisplay
                  label="Pharmacy"
                  contact={prescription.pharmacy}
                  type="pharmacy"
                  value={prescription.pharmacyId || ''}
                  onChange={(value) => handleFieldUpdate('pharmacyId', value)}
                />
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-gray-900 dark:text-white">Schedule</h3>
                
                <EditableField
                  label="Start Date"
                  value={prescription.startDate}
                  onSave={(value) => handleFieldUpdate('startDate', value)}
                  type="date"
                />

                <EditableField
                  label="End Date"
                  value={prescription.endDate || ''}
                  onSave={(value) => handleFieldUpdate('endDate', value)}
                  type="date"
                />

                <EditableField
                  label="Notes"
                  value={prescription.notes || ''}
                  onSave={(value) => handleFieldUpdate('notes', value)}
                  multiline
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Overlay>
  );
}