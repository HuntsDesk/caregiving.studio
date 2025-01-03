import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ContactType } from '../../types/contact';
import { contactTypes } from '../../utils/contactTypes';

interface ContactTypeFilterProps {
  selectedType: ContactType;
  onTypeChange: (type: ContactType) => void;
}

export default function ContactTypeFilter({ selectedType, onTypeChange }: ContactTypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedTypeConfig = contactTypes.find(t => t.type === selectedType);

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
        >
          <div className="flex items-center gap-2">
            {selectedTypeConfig && (
              <>
                <selectedTypeConfig.icon className="w-4 h-4" />
                <span className="font-medium">{selectedTypeConfig.label}</span>
              </>
            )}
          </div>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {contactTypes.map(({ type, label, icon: Icon }) => (
              <button
                key={type}
                onClick={() => {
                  onTypeChange(type);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 text-sm ${
                  selectedType === type
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Button Group */}
      <div className="hidden md:flex border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
        {contactTypes.map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center gap-2 ${
              selectedType === type
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
            } transition-colors`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>
    </>
  );
}