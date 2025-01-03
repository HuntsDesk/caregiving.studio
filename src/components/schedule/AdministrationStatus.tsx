import React from 'react';
import { format } from 'date-fns';
import type { RxLog } from '../../types/rxLog';

interface AdministrationStatusProps {
  log: RxLog | null;
  isAdministered: boolean;
}

export default function AdministrationStatus({ log, isAdministered }: AdministrationStatusProps) {
  if (!log) return null;

  const formattedTime = format(new Date(log.administeredAt), 'M/d/yyyy, h:mm a');
  
  return (
    <div className="text-sm text-gray-600 dark:text-gray-400">
      {isAdministered ? 
        `Administered: ${formattedTime}` : 
        `Last administered: ${formattedTime}`}
    </div>
  );
}