import type { AccessibilityOption } from '@/types/app';

export const accessibilityOptions: AccessibilityOption[] = [
  { id: 'big-text', title: 'Texto maior', description: 'Aumenta a legibilidade dos textos.' },
  { id: 'contrast', title: 'Contraste alto', description: 'Melhora a distinção visual dos elementos.' },
  { id: 'simple', title: 'Linguagem simples', description: 'Simplifica instruções e avisos.' },
  { id: 'audio', title: 'Áudio de apoio', description: 'Lê lembretes e dicas em voz alta.' },
];
