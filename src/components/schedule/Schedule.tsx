import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import PatientFilter from './PatientFilter';
import ScheduleLayout from './ScheduleLayout';
import ContactDetailsTray from '../contacts/ContactDetailsTray';
import PrescriptionDetailsTray from '../prescriptions/PrescriptionDetailsTray';
import { useSupabasePrescriptions } from '../../hooks/useSupabasePrescriptions';
import { useSupabaseContacts } from '../../hooks/useSupabaseContacts';
import { groupPrescriptionsByTimeBlock } from '../../utils/scheduleHelpers';
import type { Contact } from '../../types/contact';
import type { Prescription } from '../../types/prescription';

export default function Schedule() {
  const [selectedPatient, setSelectedPatient] = useState<string>('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  
  const { prescriptions, refresh: refreshPrescriptions } = useSupabasePrescriptions();
  const { contacts, refresh: refreshContacts } = useSupabaseContacts();
  
  const scheduleGroups = groupPrescriptionsByTimeBlock(
    selectedPatient === 'all' 
      ? prescriptions 
      : prescriptions.filter(p => p.patientId === selectedPatient)
  );

  const handleTrayClose = async () => {
    setSelectedContact(null);
    setSelectedPrescription(null);
    await Promise.all([refreshPrescriptions(), refreshContacts()]);
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Schedule
          </h1>
          <PatientFilter
            selectedPatient={selectedPatient}
            onPatientChange={setSelectedPatient}
          />
        </div>

        <ScheduleLayout
          scheduleGroups={scheduleGroups}
          onContactClick={(patientId) => {
            const contact = contacts.find(c => c.id === patientId);
            if (contact) setSelectedContact(contact);
          }}
          onPrescriptionClick={setSelectedPrescription}
          onAdministered={refreshPrescriptions}
        />
      </div>

      {selectedContact && (
        <ContactDetailsTray
          contact={selectedContact}
          onClose={handleTrayClose}
          onUpdate={async () => {
            await refreshContacts();
          }}
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