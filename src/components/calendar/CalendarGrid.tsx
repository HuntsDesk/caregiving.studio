import React from 'react';
import { format } from 'date-fns';
import { useCalendar } from '../../hooks/useCalendar';
import CalendarDay from './CalendarDay';

export default function CalendarGrid() {
  const { days, currentMonth } = useCalendar();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">
        {format(currentMonth, 'MMMM yyyy')}
      </h3>
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => (
          <CalendarDay key={idx} day={day} />
        ))}
      </div>
    </div>
  );
}