import type { AppScreen } from '@/types/app';

export const screens: AppScreen[] = [
  { id: 'home', label: 'Início', icon: 'home' },
  { id: 'medicines', label: 'Remédios', icon: 'pill' },
  { id: 'health', label: 'Saúde', icon: 'heart' },
  { id: 'contacts', label: 'Contatos', icon: 'phone' },
  { id: 'profile', label: 'Perfil', icon: 'user' },
];
