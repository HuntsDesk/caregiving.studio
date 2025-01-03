import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300',
    error: 'bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-300',
    info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300'
  };

  const Icon = icons[type];

  return (
    <div className={cn(
      'fixed bottom-4 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg',
      styles[type]
    )}>
      <Icon className="w-5 h-5" />
      <p className="text-sm font-medium">{message}</p>
      <button 
        onClick={onClose}
        className="p-1 hover:opacity-75"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}