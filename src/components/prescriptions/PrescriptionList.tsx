import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PrescriptionTable from './PrescriptionTable';
import AddPrescriptionTray from './AddPrescriptionTray';
import PrescriptionDetailsTray from './PrescriptionDetailsTray';
import PrescriptionStatusFilter from './PrescriptionStatusFilter';
import PatientFilter from '../schedule/PatientFilter';
import Button from '../shared/Button';
import LoadingSpinner from '../shared/LoadingSpinner';
import Alert from '../shared/Alert';
import { useSupabasePrescriptions } from '../../hooks/useSupabasePrescriptions';
import type { Prescription } from '../../types/prescription';

export default function PrescriptionList() {
  const [showAddTray, setShowAddTray] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active');
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const { prescriptions, loading, error, addPrescription, refresh } = useSupabasePrescriptions();

  const filteredPrescriptions = prescriptions.filter(prescription => 
    prescription.active === (activeTab === 'active') &&
    (selectedPatient === 'all' || prescription.patientId === selectedPatient)
  );

  const handleTrayClose = async () => {
    setSelectedPrescription(null);
    await refresh();
  };

  if (loading) {
    return (
      <div className="p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Alert 
          type="error" 
          title="Error loading prescriptions" 
          message={error} 
        />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Prescriptions</h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <PatientFilter
            selectedPatient={selectedPatient}
            onPatientChange={setSelectedPatient}
          />
          <Button 
            variant="primary"
            icon={Plus}
            onClick={() => setShowAddTray(true)}
            className="w-full sm:w-auto"
          >
            Add Prescription
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <PrescriptionStatusFilter
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="border rounded-xl border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <PrescriptionTable 
          prescriptions={filteredPrescriptions} 
          onPrescriptionClick={setSelectedPrescription}
        />
      </div>

      {showAddTray && (
        <AddPrescriptionTray
          onClose={() => setShowAddTray(false)}
          onAdd={addPrescription}
        />
      )}

      {selectedPrescription && (
        <PrescriptionDetailsTray
          prescription={selectedPrescription}
          onClose={handleTrayClose}
        />
      )}
    </div>
  );
}