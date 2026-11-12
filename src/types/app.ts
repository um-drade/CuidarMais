import type { IconName } from '@/components/ui/icon';

export type ScreenId = 'home' | 'medicines' | 'health' | 'contacts' | 'profile';

export type AppScreen = {
  id: ScreenId;
  label: string;
  icon: IconName;
};

export type Medicine = {
  id: string;
  name: string;
  dose: string;
  time: string; // "HH:mm"
  taken: boolean;
};

export type HealthMetric = {
  label: string;
  value: string;
  unit: string;
  status: string;
};

export type EmergencyContact = {
  id: string;
  name: string;
  phone: string;
};

export type AccessibilityOption = {
  id: string;
  title: string;
  description: string;
};

export type User = {
  name: string;
  email: string;
};
