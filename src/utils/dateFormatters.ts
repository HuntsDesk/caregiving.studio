import { format, parse } from 'date-fns';

export function formatDisplayDate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return format(date, 'MM-dd-yyyy');
  } catch (error) {
    return dateStr;
  }
}

export function formatISODate(dateStr: string): string {
  try {
    const date = new Date(dateStr);
    return format(date, 'yyyy-MM-dd');
  } catch (error) {
    return dateStr;
  }
}