import { Sun, Cloud, Moon, Bed, Clock } from 'lucide-react';
import type { TimeBlock } from './timeUtils';

export const scheduleIcons = {
  'Morning': Sun,
  'Afternoon': Cloud,
  'Evening': Moon,
  'Bedtime': Bed,
  'As Needed': Clock,
} as const;

export const scheduleColors = {
  orange: {
    text: 'text-orange-600 dark:text-orange-400',
    border: 'before:bg-orange-500 dark:before:bg-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-900/20'
  },
  blue: {
    text: 'text-blue-600 dark:text-blue-400',
    border: 'before:bg-blue-500 dark:before:bg-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-900/20'
  },
  indigo: {
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'before:bg-indigo-500 dark:before:bg-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-900/20'
  },
  purple: {
    text: 'text-purple-600 dark:text-purple-400',
    border: 'before:bg-purple-500 dark:before:bg-purple-400',
    bg: 'bg-purple-50 dark:bg-purple-900/20'
  },
  gray: {
    text: 'text-gray-600 dark:text-gray-400',
    border: 'before:bg-gray-500 dark:before:bg-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-800'
  }
} as const;

export type AccentColor = keyof typeof scheduleColors;