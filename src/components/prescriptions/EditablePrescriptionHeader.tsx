import React, { useState } from 'react';
import { PillIcon, X, Check } from 'lucide-react';
import { PRESCRIPTION_SCHEDULES, PrescriptionSchedule } from '../../types/prescription';

interface EditablePrescriptionHeaderProps {
  name: string;
  dosage: string;
  frequency: PrescriptionSchedule;
  onSave: (field: string, value: string) => Promise<void>;
  onClose: () => void;
}

export default function EditablePrescriptionHeader({
  name,
  dosage,
  frequency,
  onSave,
  onClose
}: EditablePrescriptionHeaderProps) {
  const [editing, setEditing] = useState<'name' | 'dosage' | 'frequency' | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleSave = async () => {
    if (editing && editValue.trim()) {
      await onSave(editing, editValue.trim());
      setEditing(null);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  const startEditing = (field: 'name' | 'dosage' | 'frequency', value: string) => {
    setEditing(field);
    setEditValue(value);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/50 dark:to-blue-800/30" />
      
      <div className="relative px-6 pt-6 pb-8">
        <div className="flex justify-between items-start mb-4">
          <div className="p-2.5 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <PillIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-white/50 dark:hover:bg-gray-800/50 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-2">
          {editing === 'name' ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="flex-1 px-3 py-1.5 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg text-xl font-semibold"
                autoFocus
              />
              <button onClick={handleSave} className="p-1.5 text-green-600 hover:text-green-700">
                <Check className="w-5 h-5" />
              </button>
              <button onClick={handleCancel} className="p-1.5 text-red-600 hover:text-red-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
              onClick={() => startEditing('name', name)}
            >
              {name}
            </h2>
          )}

          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            {editing === 'dosage' ? (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg"
                  autoFocus
                />
                <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-red-600 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => startEditing('dosage', dosage)}
              >
                {dosage}
              </span>
            )}
            <span>•</span>
            {editing === 'frequency' ? (
              <div className="flex items-center gap-2">
                <select
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="px-2 py-1 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-700 rounded-lg"
                  autoFocus
                >
                  {PRESCRIPTION_SCHEDULES.map(schedule => (
                    <option key={schedule} value={schedule}>
                      {schedule}
                    </option>
                  ))}
                </select>
                <button onClick={handleSave} className="text-green-600 hover:text-green-700">
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={handleCancel} className="text-red-600 hover:text-red-700">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <span
                className="cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                onClick={() => startEditing('frequency', frequency)}
              >
                {frequency}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}