import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface PrescriptionStatusFilterProps {
  activeTab: 'active' | 'inactive';
  onChange: (tab: 'active' | 'inactive') => void;
}

export default function PrescriptionStatusFilter({ activeTab, onChange }: PrescriptionStatusFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ] as const;

  return (
    <>
      {/* Mobile Dropdown */}
      <div className="md:hidden relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white"
        >
          <span className="font-medium">
            {activeTab === 'active' ? 'Active Prescriptions' : 'Inactive Prescriptions'}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">
            {options.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => {
                  onChange(value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm ${
                  activeTab === value
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {label} Prescriptions
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Button Group */}
      <div className="hidden md:flex border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
        {options.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex-1 px-6 py-3 text-sm font-medium ${
              activeTab === value
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </>
  );
}