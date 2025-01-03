import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import DatePicker from './DatePicker';
import TextArea from './TextArea';
import { formatDisplayDate } from '../../utils/dateFormatters';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => Promise<void>;
  multiline?: boolean;
  type?: 'text' | 'date';
}

export default function EditableField({ 
  label, 
  value, 
  onSave, 
  multiline = false,
  type = 'text'
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setEditValue(value);
    }
  }, [value, isEditing]);

  const handleSave = async () => {
    if (editValue.trim() === value) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await onSave(editValue.trim());
      setIsEditing(false);
    } catch (error) {
      setEditValue(value);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div 
        onClick={() => setIsEditing(true)}
        className="group py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 rounded-lg transition-colors"
      >
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-gray-900 dark:text-white">
            {type === 'date' ? formatDisplayDate(value) : value || '-'}
          </p>
        </div>
      </div>
    );
  }

  if (type === 'date') {
    return (
      <div className="py-2">
        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
          {label}
        </label>
        <DatePicker
          value={editValue}
          onChange={setEditValue}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="py-2">
      <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
        {label}
      </label>
      <div className="flex items-center gap-2">
        {multiline ? (
          <TextArea
            value={editValue}
            onChange={setEditValue}
            disabled={loading}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white"
            disabled={loading}
            autoFocus
          />
        )}
        <button
          onClick={handleSave}
          disabled={loading}
          className="p-1.5 text-green-600 hover:text-green-700 dark:text-green-500 disabled:opacity-50"
        >
          <Check className="w-4 h-4" />
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="p-1.5 text-red-600 hover:text-red-700 dark:text-red-500 disabled:opacity-50"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}