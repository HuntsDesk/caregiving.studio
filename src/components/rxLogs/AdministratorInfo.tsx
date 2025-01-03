import React from 'react';
import { User } from 'lucide-react';
import { cn } from '../../lib/utils';

interface AdministratorInfoProps {
  email?: string;
  displayName?: string;
  className?: string;
}

export default function AdministratorInfo({ email, displayName, className }: AdministratorInfoProps) {
  if (!email) {
    return <span className={cn("text-gray-400", className)}>-</span>;
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <User className="w-4 h-4 text-gray-400" />
      <span className="text-sm text-gray-600 dark:text-gray-400">
        {displayName || email}
      </span>
    </div>
  );
}