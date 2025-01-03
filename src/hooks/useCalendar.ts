import { useState, useMemo } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export function useCalendar() {
  const [currentMonth] = useState(new Date());

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  return { days, currentMonth };
}