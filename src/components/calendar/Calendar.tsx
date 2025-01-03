import React from 'react';
import { Calendar as CalendarIcon, Plus } from 'lucide-react';
import CalendarGrid from './CalendarGrid';
import UpcomingEvents from './UpcomingEvents';

export default function Calendar() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Calendar</h2>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <CalendarGrid />
        </div>
        <div className="lg:col-span-1">
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}