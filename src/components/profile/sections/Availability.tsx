import React from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import type { CaregiverProfile } from '../../../types/caregiver';

interface AvailabilityProps {
  profile: CaregiverProfile;
  onUpdate: (updates: Partial<CaregiverProfile>) => Promise<void>;
}

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function Availability({ profile, onUpdate }: AvailabilityProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // This would need a more complex UI for managing availability slots
    await onUpdate({
      availability: profile.availability
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6 p-6">
        <div className="space-y-4">
          {DAYS.map((day, index) => (
            <div key={day} className="flex items-center justify-between py-2 border-b last:border-0">
              <span className="font-medium">{day}</span>
              <div className="flex items-center gap-2">
                {profile.availability
                  .filter(a => a.dayOfWeek === index)
                  .map((slot, slotIndex) => (
                    <div key={slotIndex} className="text-sm">
                      {slot.shifts.map((shift, shiftIndex) => (
                        <span key={shiftIndex} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded">
                          {shift.start} - {shift.end}
                        </span>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
}