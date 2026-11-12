import type { Medicine } from '@/types/app';

export const initialMedicines: Medicine[] = [
  { id: 'losartana', name: 'Losartana', dose: '50 mg', time: '08:00', taken: true },
  { id: 'vitamina', name: 'Vitamina D', dose: '1 cápsula', time: '12:30', taken: false },
  { id: 'colina', name: 'Colina', dose: '2 comprimidos', time: '20:00', taken: false },
];
