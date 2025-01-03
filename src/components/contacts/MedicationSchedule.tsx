import React from 'react';
import { Sun, Cloud, Moon, Bed } from 'lucide-react';
import { Prescription } from '../../types/index';

interface MedicationScheduleProps {
  prescriptions: Prescription[];
}

export default function MedicationSchedule({ prescriptions }: MedicationScheduleProps) {
  const timeSlots = [
    { 
      id: 'morning',
      label: 'Morning (6 AM - 12 PM)',
      icon: Sun,
      bgColor: 'bg-orange-50 dark:bg-orange-900/20'
    },
    { 
      id: 'afternoon',
      label: 'Afternoon (12 PM - 5 PM)',
      icon: Cloud,
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    { 
      id: 'evening',
      label: 'Evening (5 PM - 9 PM)',
      icon: Moon,
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    },
    { 
      id: 'bedtime',
      label: 'Bedtime (9 PM - 11 PM)',
      icon: Bed,
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="space-y-4">
      {timeSlots.map(slot => {
        const slotMeds = prescriptions.filter(p => 
          p.frequency.toLowerCase().includes(slot.id)
        );

        return (
          <div
            key={slot.id}
            className={`p-4 rounded-lg ${slot.bgColor}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <slot.icon className="w-5 h-5" />
              <h4 className="font-medium">{slot.label}</h4>
            </div>
            {slotMeds.length > 0 ? (
              <ul className="space-y-2">
                {slotMeds.map(med => (
                  <li key={med.id} className="text-sm">
                    {med.name} - {med.dosage}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No medications scheduled</p>
            )}
          </div>
        );
      })}
    </div>
  );
}