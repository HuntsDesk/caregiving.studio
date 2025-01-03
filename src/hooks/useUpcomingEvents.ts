import { useState, useEffect } from 'react';
import type { CalendarEvent } from '../types';

export function useUpcomingEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    {
      id: '1',
      title: 'Dr. Smith Appointment',
      date: new Date('2024-03-15T10:00:00'),
      type: 'medical'
    },
    {
      id: '2',
      title: 'Medication Refill',
      date: new Date('2024-03-20T14:00:00'),
      type: 'medication'
    }
  ]);

  return { events };
}