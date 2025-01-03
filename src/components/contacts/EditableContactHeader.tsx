import React, { useState } from 'react';
import { X } from 'lucide-react';
import DeleteButton from '../shared/DeleteButton';
import { Contact } from '../../types/contact';
import { getContactTypeIcon, getContactTypeStyles } from '../../utils/contactTypes';

interface EditableContactHeaderProps {
  contact: Contact;
  onUpdate: (id: string, updates: Partial<Contact>) => Promise<void>;
  onClose: () => void;
  onDelete: () => Promise<void>;
}

export default function EditableContactHeader({ 
  contact,
  onUpdate,
  onClose,
  onDelete
}: EditableContactHeaderProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(contact.firstName);
  const [editLastName, setEditLastName] = useState(contact.lastName);
  const [loading, setLoading] = useState(false);

  const Icon = getContactTypeIcon(contact.type);
  const { iconColor, bgColor } = getContactTypeStyles(contact.type);

  const handleSaveName = async () => {
    if (editFirstName.trim() === contact.firstName && editLastName.trim() === contact.lastName) {
      setIsEditingName(false);
      return;
    }

    setLoading(true);
    try {
      await onUpdate(contact.id, {
        firstName: editFirstName.trim(),
        lastName: editLastName.trim()
      });
      setIsEditingName(false);
    } catch (error) {
      setEditFirstName(contact.firstName);
      setEditLastName(contact.lastName);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditFirstName(contact.firstName);
    setEditLastName(contact.lastName);
    setIsEditingName(false);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 flex items-center justify-center ${bgColor} rounded-xl shadow-sm`}>
          {Icon && <Icon className={`w-5 h-5 ${iconColor}`} />}
        </div>
        <div className="flex items-center gap-2">
          <DeleteButton 
            onDelete={onDelete}
            confirmMessage={`Are you sure you want to delete ${contact.firstName} ${contact.lastName}?`}
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

      {isEditingName ? (
        <div className="space-y-2">
          <input
            type="text"
            value={editFirstName}
            onChange={(e) => setEditFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-lg font-semibold"
            autoFocus
          />
          <input
            type="text"
            value={editLastName}
            onChange={(e) => setEditLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-lg font-semibold"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSaveName}
              disabled={loading}
              className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              disabled={loading}
              className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div 
          onClick={() => setIsEditingName(true)}
          className="cursor-pointer group"
        >
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
            {contact.firstName} {contact.lastName}
          </h2>
          {contact.type === 'doctor' && contact.specialty && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {contact.specialty}
            </p>
          )}
          {(contact.type === 'doctor' || contact.type === 'pharmacy') && contact.facility && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {contact.facility}
            </p>
          )}
        </div>
      )}
    </div>
  );
}