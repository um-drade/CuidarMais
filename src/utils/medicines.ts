import type { Medicine } from '@/types/app';

export type Period = 'Manhã' | 'Tarde' | 'Noite';

export const periods: Period[] = ['Manhã', 'Tarde', 'Noite'];

const toMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export function getPeriod(time: string): Period {
  const minutes = toMinutes(time);
  if (minutes < 12 * 60) return 'Manhã';
  if (minutes < 18 * 60) return 'Tarde';
  return 'Noite';
}

/** Primeiro remédio ainda não tomado, na ordem do horário. */
export function getNextMedicine(medicines: Medicine[]): Medicine | undefined {
  return [...medicines]
    .filter((medicine) => !medicine.taken)
    .sort((a, b) => toMinutes(a.time) - toMinutes(b.time))[0];
}

/** Ex.: "em 40 min", "em 2 h 10 min" ou "atrasado". */
export function formatCountdown(time: string, now: Date = new Date()): string {
  const diff = toMinutes(time) - (now.getHours() * 60 + now.getMinutes());

  if (diff < 0) return 'Atrasado';
  if (diff === 0) return 'Agora';
  if (diff < 60) return `em ${diff} min`;

  const hours = Math.floor(diff / 60);
  const minutes = diff % 60;
  return minutes === 0 ? `em ${hours} h` : `em ${hours} h ${minutes} min`;
}
