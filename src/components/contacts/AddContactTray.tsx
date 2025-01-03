import React, { useState } from 'react';
import { X } from 'lucide-react';
import Button from '../shared/Button';
import Overlay from '../shared/Overlay';
import Alert from '../shared/Alert';
import ContactForm from './ContactForm';
import { ContactType } from '../../types/contact';
import { contactTypes, getContactTypeStyles } from '../../utils/contactTypes';

interface AddContactTrayProps {
  onClose: () => void;
  defaultType: ContactType;
  onAdd: (contact: any) => Promise<void>;
}

export default function AddContactTray({ onClose, defaultType, onAdd }: AddContactTrayProps) {
  const [type, setType] = useState<ContactType>(defaultType);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: any) => {
    setError(null);
    setLoading(true);

    try {
      await onAdd({
        type,
        ...data
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add contact');
      setLoading(false);
    }
  };

  const { iconColor, bgColor } = getContactTypeStyles(type);
  const Icon = contactTypes.find(t => t.type === type)?.icon;

  return (
    <Overlay onClose={onClose}>
      <div className="fixed inset-y-0 right-0 w-full md:w-[32rem] bg-white dark:bg-gray-900 shadow-xl">
        <div className="h-full flex flex-col">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
            
            <div className="relative px-6 pt-6 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 ${bgColor} rounded-xl shadow-sm`}>
                  {Icon && <Icon className={`w-6 h-6 ${iconColor}`} />}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Add New {contactTypes.find(t => t.type === type)?.dropdownLabel}
              </h2>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {error && (
              <div className="p-6 pb-0">
                <Alert
                  type="error"
                  title="Error"
                  message={error}
                />
              </div>
            )}

            <ContactForm
              type={type}
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