import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import ContactTable from './contacts/ContactTable';
import AddContactTray from './contacts/AddContactTray';
import ContactDetailsTray from './contacts/ContactDetailsTray';
import ContactTypeFilter from './contacts/ContactTypeFilter';
import Button from './shared/Button';
import LoadingSpinner from './shared/LoadingSpinner';
import Alert from './shared/Alert';
import { ContactType, Contact } from '../types/contact';
import { useSupabaseContacts } from '../hooks/useSupabaseContacts';

export default function ContactList() {
  const [selectedType, setSelectedType] = useState<ContactType>('patient');
  const [showAddTray, setShowAddTray] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const { contacts, loading, error, addContact, updateContact, refresh } = useSupabaseContacts();

  const filteredContacts = contacts.filter(contact => 
    selectedType === contact.type
  );

  const handleContactClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const handleTrayClose = async () => {
    setSelectedContact(null);
    setShowAddTray(false);
    await refresh();
  };

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <Alert 
          type="error" 
          title="Error loading contacts" 
          message={error} 
        />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h2>
        <Button 
          variant="primary"
          icon={Plus}
          onClick={() => setShowAddTray(true)}
        >
          Add Contact
        </Button>
      </div>

      <div className="mb-6 -mx-4 md:mx-0">
        <ContactTypeFilter 
          selectedType={selectedType} 
          onTypeChange={setSelectedType} 
        />
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden -mx-4 md:mx-0">
        <ContactTable 
          contacts={filteredContacts}
          onContactClick={handleContactClick}
        />
      </div>

      {showAddTray && (
        <AddContactTray
          onClose={handleTrayClose}
          defaultType={selectedType}
          onAdd={addContact}
        />
      )}

      {selectedContact && (
        <ContactDetailsTray
          contact={selectedContact}
          onClose={handleTrayClose}
          onUpdate={updateContact}
        />
      )}
    </div>
  );
}