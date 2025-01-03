import { useState, useEffect } from 'react';
import { useSupabasePrescriptions } from './useSupabasePrescriptions';
import type { TimeOfDay, ScheduleItem } from '../types/schedule';
import { formatContactName } from '../utils/contacts';

export function useSchedule(patientId?: string) {
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { prescriptions } = useSupabasePrescriptions();

  useEffect(() => {
    const items: ScheduleItem[] = prescriptions
      .filter(p => p.active && (!patientId || p.patientId === patientId))
      .map(p => ({
        id: p.id,
        medicationName: p.name,
        dosage: p.dosage,
        frequency: p.frequency,
        timeOfDay: determineTimeOfDay(p.frequency),
        startDate: p.startDate,
        endDate: p.endDate,
        patientId: p.patientId,
        patientName: formatContactName(p.patient)
      }));

    setScheduleItems(items);
    setLoading(false);
  }, [prescriptions, patientId]);

  const determineTimeOfDay = (frequency: string): TimeOfDay => {
    const f = frequency.toLowerCase();
    if (f.includes('as needed')) return 'asNeeded';
    if (f.includes('morning') || f.includes('am')) return 'morning';
    if (f.includes('afternoon')) return 'afternoon';
    if (f.includes('evening') || f.includes('pm')) return 'evening';
    if (f.includes('bedtime')) return 'bedtime';
    return 'morning'; // Default to morning
  };

  const handleAdminister = async (scheduleId: string) => {
    // TODO: Implement medication administration logic
    console.log('Administering medication:', scheduleId);
  };

  const handleUndo = async (scheduleId: string) => {
    // TODO: Implement undo administration logic
    console.log('Undoing administration:', scheduleId);
  };

  return {
    scheduleItems,
    loading,
    handleAdminister,
    handleUndo
  };
}