import type { TextStyle } from 'react-native';

/** Estilos de texto do design (equivalentes às classes h1, .m, .t, .sec, .lb). */
export const typography = {
  h1: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  muted: { fontSize: 15, lineHeight: 21 },
  title: { fontSize: 17, fontWeight: '600' },
  section: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.78,
    textTransform: 'uppercase',
  },
  label: { fontSize: 15, fontWeight: '600' },
  badge: { fontSize: 13, fontWeight: '600' },
  button: { fontSize: 17, fontWeight: '600' },
} satisfies Record<string, TextStyle>;
