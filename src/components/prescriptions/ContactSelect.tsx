import React from 'react';
import { Check, X } from 'lucide-react';
import { useSupabaseContacts } from '../../hooks/useSupabaseContacts';
import { Contact, ContactType } from '../../types/contact';

interface ContactSelectProps {
  label: string;
  value: string;
  type: ContactType;
  onChange: (value: string) => Promise<void>;
  onCancel?: () => void;
}

export default function ContactSelect({ 
  label, 
  value: initialValue, 
  type,
  onChange,
  onCancel
}: ContactSelectProps) {
  const [selectedValue, setSelectedValue] = React.useState(initialValue);
  const { contacts } = useSupabaseContacts();
  
  const filteredContacts = React.useMemo(() => {
    return contacts?.filter(contact => contact.type === type) ?? [];
  }, [contacts, type]);
  
  const formatName = (contact: Contact) => {
    if (type === 'doctor') {
      return `Dr. ${contact.firstName} ${contact.lastName}${contact.specialty ? ` (${contact.specialty})` : ''}`;
    }
    if (type === 'pharmacy') {
      return `${contact.firstName} ${contact.lastName}${contact.facility ? ` - ${contact.facility}` : ''}`;
    }
    return `${contact.firstName} ${contact.lastName}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(e.target.value);
  };

  const handleSave = () => {
    onChange(selectedValue);
  };

  const handleCancel = () => {
    setSelectedValue(initialValue);
    onCancel?.();
  };

  return (
    <div className="group py-2">
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2 max-w-full">
        <select
          value={selectedValue}
          onChange={handleChange}
          className="min-w-0 flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-ellipsis"
        >
          <option value="" className="text-gray-900 dark:text-white">Select {type}</option>
          {filteredContacts.map(contact => (
            <option key={contact.id} value={contact.id} className="text-gray-900 dark:text-white">
              {formatName(contact)}
            </option>
          ))}
        </select>
        <div className="flex-shrink-0 flex items-center gap-1">
          <button
            onClick={handleSave}
            className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-500"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}