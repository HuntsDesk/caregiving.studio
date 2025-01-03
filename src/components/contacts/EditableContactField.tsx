import React, { useState } from 'react';
import { Pencil, Check, X } from 'lucide-react';

interface EditableContactFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
}

export default function EditableContactField({ label, value, onSave }: EditableContactFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-2 text-green-600 hover:text-green-700 dark:text-green-500 dark:hover:text-green-400"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="group flex items-center justify-between py-2 hover:bg-gray-50 dark:hover:bg-gray-800 -mx-2 px-2 rounded-lg transition-colors">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        <p className="text-gray-900 dark:text-white">{value || '-'}</p>
      </div>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1.5 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
}