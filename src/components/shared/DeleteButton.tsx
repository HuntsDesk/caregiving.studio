import React, { useState } from 'react';
import { Trash2 } from 'lucide-react';
import Button from './Button';

interface DeleteButtonProps {
  onDelete: () => Promise<void>;
  confirmMessage?: string;
  compact?: boolean;
}

export default function DeleteButton({ 
  onDelete, 
  confirmMessage = 'Are you sure you want to delete this item?',
  compact = false
}: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await onDelete();
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        {!compact && (
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {confirmMessage}
          </span>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowConfirm(false)}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Confirm'}
        </Button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className="p-2 text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
      title="Delete"
    >
      <Trash2 className="w-5 h-5" />
    </button>
  );
}