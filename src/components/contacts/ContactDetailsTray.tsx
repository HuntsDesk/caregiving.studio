import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useSupabaseContacts } from '../../hooks/useSupabaseContacts';
import DeleteButton from '../shared/DeleteButton';
import EditableContactHeader from './EditableContactHeader';
import EditableField from '../shared/EditableField';
import Overlay from '../shared/Overlay';
import Alert from '../shared/Alert';
import type { Contact } from '../../types/contact';

interface ContactDetailsTrayProps {
  contact: Contact;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<Contact>) => Promise<void>;
}

export default function ContactDetailsTray({ contact, onClose, onUpdate }: ContactDetailsTrayProps) {
  const [error, setError] = useState<string | null>(null);
  const { deleteContact } = useSupabaseContacts();

  const handleDelete = async () => {
    try {
      await deleteContact(contact.id);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete contact');
    }
  };

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-y-0 right-0 w-full md:w-96 bg-white dark:bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
            
            <div className="relative px-6 pt-6 pb-8">
              <EditableContactHeader
                contact={contact}
                onUpdate={onUpdate}
                onClose={onClose}
                onDelete={handleDelete}
              />
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
                <EditableField
                  label="Phone"
                  value={contact.phone}
                  onSave={(value) => onUpdate(contact.id, { phone: value })}
                />
                <EditableField
                  label="Email"
                  value={contact.email}
                  onSave={(value) => onUpdate(contact.id, { email: value })}
                />
                <EditableField
                  label="Address"
                  value={contact.address || ''}
                  onSave={(value) => onUpdate(contact.id, { address: value })}
                />
                <EditableField
                  label="Notes"
                  value={contact.notes || ''}
                  onSave={(value) => onUpdate(contact.id, { notes: value })}
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