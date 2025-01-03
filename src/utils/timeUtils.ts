export type TimeBlock = 'morning' | 'afternoon' | 'evening' | 'bedtime' | 'as_needed';

export const TIME_BLOCKS = {
  MORNING: { start: 6, end: 11, id: 'morning' as TimeBlock },
  AFTERNOON: { start: 12, end: 16, id: 'afternoon' as TimeBlock },
  EVENING: { start: 17, end: 20, id: 'evening' as TimeBlock },
  BEDTIME: { start: 21, end: 23, id: 'bedtime' as TimeBlock }
} as const;

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

export function getTimeBlockForFrequency(frequency: string): TimeBlock {
  const f = frequency.toLowerCase();
  if (f.includes('as needed')) return 'as_needed';
  if (f.includes('morning')) return 'morning';
  if (f.includes('afternoon')) return 'afternoon';
  if (f.includes('evening')) return 'evening';
  if (f.includes('bedtime')) return 'bedtime';
  return getTimeBlockForHour(new Date().getHours());
}