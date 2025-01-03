import React from 'react';
import { Bell, Clock } from 'lucide-react';

export default function ReminderPanel() {
  const reminders = [
    { time: '8:00 AM', medications: ['Lisinopril', 'Vitamin D'] },
    { time: '2:00 PM', medications: ['Metformin'] },
    { time: '8:00 PM', medications: ['Vitamin C'] },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Bell className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-semibold">Today's Schedule</h3>
      </div>

      <div className="space-y-4">
        {reminders.map((reminder, index) => (
          <div key={index} className="border-l-4 border-indigo-600 pl-4">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-medium">{reminder.time}</span>
            </div>
            <ul className="text-sm text-gray-600">
              {reminder.medications.map((med, idx) => (
                <li key={idx}>{med}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}