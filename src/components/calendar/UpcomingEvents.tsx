import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useUpcomingEvents } from '../../hooks/useUpcomingEvents';

export default function UpcomingEvents() {
  const { events } = useUpcomingEvents();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Upcoming Events</h3>
      </div>

      <div className="space-y-4">
        {events.map((event, idx) => (
          <div key={idx} className="border-l-4 border-indigo-600 pl-4">
            <p className="font-medium">{event.title}</p>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{format(event.date, 'MMM d, yyyy h:mm a')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}