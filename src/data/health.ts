import type { HealthMetric } from '@/types/app';

export const healthMetrics: HealthMetric[] = [
  { label: 'Pressão', value: '120/80', unit: 'mmHg', status: 'Normal' },
  { label: 'Pulso', value: '72', unit: 'bpm', status: 'Estável' },
  { label: 'Hidratação', value: '1,8 L', unit: 'hoje', status: 'Boa' },
  { label: 'Atividade', value: '4.500', unit: 'passos', status: 'Atenção' },
];

/** Valores em linguagem simples mostrados no início. */
export const dailySummary = {
  pressure: '12 por 8',
  hydration: '5 de 8 copos',
};
