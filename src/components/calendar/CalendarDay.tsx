import React from 'react';
import { format } from 'date-fns';
import type { CalendarEvent } from '../../types';

interface CalendarDayProps {
  day: Date;
  events?: CalendarEvent[];
}

export default function CalendarDay({ day, events = [] }: CalendarDayProps) {
  const hasEvents = events.length > 0;
  
  return (
    <div className="min-h-24 p-2 border border-gray-200">
      <div className="text-sm text-gray-500">{format(day, 'd')}</div>
      {hasEvents && (
        <div className="mt-1">
          {events.map((event, idx) => (
            <div
              key={idx}
              className="text-xs p-1 mb-1 rounded bg-indigo-100 text-indigo-700"
            >
              {event.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}