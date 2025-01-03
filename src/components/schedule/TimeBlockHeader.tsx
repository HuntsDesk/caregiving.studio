import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface TimeBlockHeaderProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  colors: {
    text: string;
    border: string;
    bg: string;
  };
}

export default function TimeBlockHeader({ 
  title, 
  subtitle, 
  icon: Icon, 
  colors 
}: TimeBlockHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2">
        <Icon className={cn("w-4 h-4", colors.text)} />
        <span className={cn("text-sm font-semibold tracking-wide uppercase", colors.text)}>
          {title}
        </span>
        {subtitle && (
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
}