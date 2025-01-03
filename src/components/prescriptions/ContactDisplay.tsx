import React from 'react';
import { ContactType } from '../../types/contact';
import ContactSelect from './ContactSelect';
import PhoneLink from '../shared/PhoneLink';

interface ContactDisplayProps {
  label: string;
  contact: any;
  type: ContactType;
  value: string;
  onChange: (value: string) => Promise<void>;
}

export default function ContactDisplay({
  label,
  contact,
  type,
  value,
  onChange
}: ContactDisplayProps) {
  const [isEditing, setIsEditing] = React.useState(false);

  if (isEditing) {
    return (
      <ContactSelect
        label={label}
        value={value}
        type={type}
        onChange={async (newValue) => {
          await onChange(newValue);
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  if (!contact) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className="group py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 rounded-lg transition-colors"
      >
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-blue-600 dark:text-blue-400">Select {type}</p>
      </div>
    );
  }

  const displayName = type === 'doctor' 
    ? `Dr. ${contact.firstName} ${contact.lastName}${contact.specialty ? ` - ${contact.specialty}` : ''}`
    : type === 'pharmacy'
    ? `${contact.firstName} ${contact.lastName}${contact.facility ? ` - ${contact.facility}` : ''}`
    : `${contact.firstName} ${contact.lastName}`;

  return (
    <div className="py-2">
      <div 
        onClick={() => setIsEditing(true)}
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 rounded-lg transition-colors"
      >
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-900 dark:text-white">{displayName}</p>
      </div>
      {contact.phone && (
        <div className="mt-1 ml-2">
          <PhoneLink phone={contact.phone} />
        </div>
      )}
    </div>
  );
}