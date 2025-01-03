import { useState, useCallback } from 'react';
import { format } from 'date-fns';

export function useDateRange(initialStartDate?: string, initialEndDate?: string) {
  const [startDate, setStartDate] = useState(initialStartDate || format(new Date(), 'yyyy-MM-dd'));
  const [endDate, setEndDate] = useState(initialEndDate || format(new Date(), 'yyyy-MM-dd'));

  const setDateRange = useCallback((start: string, end: string) => {
    setStartDate(start);
    setEndDate(end);
  }, []);

  return {
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    setDateRange
  };
}