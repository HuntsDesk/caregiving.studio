import type { Prescription } from '../types/prescription';
import { TIME_BLOCKS, TimeBlock } from './timeUtils';

interface ScheduleGroups {
  morning: Prescription[];
  afternoon: Prescription[];
  evening: Prescription[];
  bedtime: Prescription[];
  asNeeded: Prescription[];
}

interface PatientGroup {
  name: string;
  prescriptions: Prescription[];
}

/**
 * Group prescriptions by their time blocks based on frequency
 */
export function groupPrescriptionsByTimeBlock(prescriptions: Prescription[]): ScheduleGroups {
  const groups: ScheduleGroups = {
    morning: [],
    afternoon: [],
    evening: [],
    bedtime: [],
    asNeeded: []
  };

  prescriptions.forEach(prescription => {
    if (!prescription.active) return;

    const frequency = prescription.frequency.toLowerCase();
    
    // Handle "as needed" medications
    if (frequency.includes('as needed')) {
      groups.asNeeded.push(prescription);
      return;
    }

    // Handle specific time blocks
    if (frequency.includes('morning') || frequency.includes('am')) {
      groups.morning.push(prescription);
    }
    
    if (frequency.includes('afternoon') || frequency.includes('pm')) {
      groups.afternoon.push(prescription);
    }
    
    if (frequency.includes('evening')) {
      groups.evening.push(prescription);
    }
    
    if (frequency.includes('bedtime')) {
      groups.bedtime.push(prescription);
    }

    // Handle multiple times per day
    if (frequency.includes('twice') || frequency.includes('two times')) {
      if (!frequency.includes('evening') && !frequency.includes('afternoon')) {
        groups.morning.push(prescription);
        groups.evening.push(prescription);
      }
    }

    if (frequency.includes('three times')) {
      if (!groups.morning.includes(prescription)) groups.morning.push(prescription);
      if (!groups.afternoon.includes(prescription)) groups.afternoon.push(prescription);
      if (!groups.evening.includes(prescription)) groups.evening.push(prescription);
    }

    if (frequency.includes('four times')) {
      if (!groups.morning.includes(prescription)) groups.morning.push(prescription);
      if (!groups.afternoon.includes(prescription)) groups.afternoon.push(prescription);
      if (!groups.evening.includes(prescription)) groups.evening.push(prescription);
      if (!groups.bedtime.includes(prescription)) groups.bedtime.push(prescription);
    }

    // Default to morning if no specific time is mentioned
    if (!Object.values(groups).some(group => group.includes(prescription))) {
      groups.morning.push(prescription);
    }
  });

  return groups;
}

/**
 * Group prescriptions by patient and sort patients alphabetically
 */
export function groupAndSortByPatient(prescriptions: Prescription[]): PatientGroup[] {
  // First group by patient
  const patientGroups = prescriptions.reduce((groups, prescription) => {
    const patientId = prescription.patientId;
    const patient = prescription.patient;
    
    if (!groups[patientId]) {
      groups[patientId] = {
        name: `${patient.firstName} ${patient.lastName}`,
        prescriptions: []
      };
    }
    groups[patientId].prescriptions.push(prescription);
    return groups;
  }, {} as Record<string, PatientGroup>);

  // Convert to array and sort by patient name
  return Object.values(patientGroups).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
}

/**
 * Get the appropriate time block for a given hour
 */
export function getTimeBlockForHour(hour: number): TimeBlock {
  if (hour >= TIME_BLOCKS.MORNING.start && hour <= TIME_BLOCKS.MORNING.end) {
    return TIME_BLOCKS.MORNING.id;
  }
  if (hour >= TIME_BLOCKS.AFTERNOON.start && hour <= TIME_BLOCKS.AFTERNOON.end) {
    return TIME_BLOCKS.AFTERNOON.id;
  }
  if (hour >= TIME_BLOCKS.EVENING.start && hour <= TIME_BLOCKS.EVENING.end) {
    return TIME_BLOCKS.EVENING.id;
  }
  return TIME_BLOCKS.BEDTIME.id;
}