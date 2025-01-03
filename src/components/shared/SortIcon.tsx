import React from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SortIconProps {
  active: boolean;
  direction: 'asc' | 'desc';
  className?: string;
}

export default function SortIcon({ active, direction, className }: SortIconProps) {
  if (!active) return null;
  
  const Icon = direction === 'asc' ? ChevronUp : ChevronDown;
  
  return (
    <Icon className={cn("w-4 h-4 text-gray-500", className)} />
  );
}