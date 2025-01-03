import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import PatientFilter from './schedule/PatientFilter';
import ScheduleTimeBlock from './schedule/ScheduleTimeBlock';
import ContactDetailsTray from './contacts/ContactDetailsTray';
import PrescriptionDetailsTray from './prescriptions/PrescriptionDetailsTray';
import { useSupabasePrescriptions } from '../hooks/useSupabasePrescriptions';
import { useSupabaseContacts } from '../hooks/useSupabaseContacts';
import { groupPrescriptionsByTimeBlock } from '../utils/scheduleHelpers';
import type { Contact } from '../types/contact';
import type { Prescription } from '../types/prescription';

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

  const handleContactClick = (patientId: string) => {
    const contact = contacts.find(c => c.id === patientId);
    if (contact) {
      setSelectedContact(contact);
    }
  };

  const handlePrescriptionClick = (prescription: Prescription) => {
    setSelectedPrescription(prescription);
  };

  const handleTrayClose = async () => {
    setSelectedContact(null);
    setSelectedPrescription(null);
    await Promise.all([refreshPrescriptions(), refreshContacts()]);
  };

  const handleAdministered = async () => {
    await refreshPrescriptions();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Schedule</h2>
        <PatientFilter
          selectedPatient={selectedPatient}
          onPatientChange={setSelectedPatient}
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">Today's Schedule</h3>
          <button className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
            <Calendar className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <ScheduleTimeBlock
            title="Morning"
            subtitle="(6 AM - 12 PM)"
            accentColor="orange"
            prescriptions={scheduleGroups.morning}
            onContactClick={handleContactClick}
            onPrescriptionClick={handlePrescriptionClick}
            onAdministered={handleAdministered}
          />
          
          <ScheduleTimeBlock
            title="Afternoon"
            subtitle="(12 PM - 5 PM)"
            accentColor="blue"
            prescriptions={scheduleGroups.afternoon}
            onContactClick={handleContactClick}
            onPrescriptionClick={handlePrescriptionClick}
            onAdministered={handleAdministered}
          />
          
          <ScheduleTimeBlock
            title="Evening"
            subtitle="(5 PM - 9 PM)"
            accentColor="indigo"
            prescriptions={scheduleGroups.evening}
            onContactClick={handleContactClick}
            onPrescriptionClick={handlePrescriptionClick}
            onAdministered={handleAdministered}
          />
          
          <ScheduleTimeBlock
            title="Bedtime"
            subtitle="(9 PM - 11 PM)"
            accentColor="purple"
            prescriptions={scheduleGroups.bedtime}
            onContactClick={handleContactClick}
            onPrescriptionClick={handlePrescriptionClick}
            onAdministered={handleAdministered}
          />

          <ScheduleTimeBlock
            title="As Needed"
            accentColor="gray"
            prescriptions={scheduleGroups.asNeeded}
            onContactClick={handleContactClick}
            onPrescriptionClick={handlePrescriptionClick}
            onAdministered={handleAdministered}
          />
        </div>
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