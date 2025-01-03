import React, { useCallback, useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import TextArea from '../shared/TextArea';

interface AdverseReactionInputProps {
  value: string | null;
  onChange: (value: string) => Promise<void>;
  disabled?: boolean;
}

export default function AdverseReactionInput({
  value,
  onChange,
  disabled = false
}: AdverseReactionInputProps) {
  const [localValue, setLocalValue] = useState(value || '');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isEditing) {
      setLocalValue(value || '');
    }
  }, [value, isEditing]);

  const handleChange = useCallback((newValue: string) => {
    setLocalValue(newValue);
    setIsEditing(true);
  }, []);

  const handleSave = async () => {
    if (localValue === value) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await onChange(localValue);
      setIsEditing(false);
    } catch (error) {
      setLocalValue(value || '');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setLocalValue(value || '');
    setIsEditing(false);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-2">
        <TextArea
          value={localValue}
          onChange={handleChange}
          placeholder="Describe any adverse reactions..."
          disabled={disabled || loading}
          rows={3}
          autoResize
        />
        {isEditing && (
          <div className="flex flex-col gap-1 pt-2">
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
        )}
      </div>
    </div>
  );
}