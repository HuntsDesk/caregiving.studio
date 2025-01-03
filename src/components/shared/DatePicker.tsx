import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, Check, X } from 'lucide-react';
import { formatDisplayDate, formatISODate } from '../../utils/dateFormatters';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function DatePicker({ value, onChange, onSave, onCancel }: DatePickerProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative" ref={calendarRef}>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white">
            {formatDisplayDate(value)}
          </div>
          <input
            type="date"
            value={value}
            onChange={handleDateChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <button
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <CalendarIcon className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={onSave}
          className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-500"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={onCancel}
          className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-500"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {isCalendarOpen && (
        <div className="absolute z-10 mt-1 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <input
            type="date"
            value={value}
            onChange={handleDateChange}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      )}
    </div>
  );
}