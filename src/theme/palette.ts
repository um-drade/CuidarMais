/** Cores extraídas da prévia do novo design (tema claro e escuro). */
export type AppPalette = {
  background: string;
  card: string;
  ink: string;
  muted: string;
  line: string;
  button: string;
  onButton: string;
  sos: string;
  onSos: string;
  primary: string; // azul: marca e aba ativa
  teal: string;
  tealTint: string;
  gold: string; // o "+" da marca
  amberText: string;
  amberTint: string;
  rose: string;
};

export const lightPalette: AppPalette = {
  background: '#FAF6EF',
  card: '#FFFFFF',
  ink: '#1F2F46',
  muted: '#5B6678',
  line: '#E6DFD2',
  button: '#2F7A71',
  onButton: '#FFFFFF',
  sos: '#B0577A',
  onSos: '#FFFFFF',
  primary: '#3F6FB0',
  teal: '#2F7A71',
  tealTint: '#E5F2F0',
  gold: '#B97A1E',
  amberText: '#8A5A10',
  amberTint: '#FBF0DC',
  rose: '#B0577A',
};

export const darkPalette: AppPalette = {
  background: '#121A26',
  card: '#1B2535',
  ink: '#EAF0F8',
  muted: '#A8B4C6',
  line: '#2B3A50',
  button: '#7FCBC0',
  onButton: '#0E1B2B',
  sos: '#E59BB8',
  onSos: '#2A0F1B',
  primary: '#8DB4EB',
  teal: '#7FCBC0',
  tealTint: '#1E3A3A',
  gold: '#E0B060',
  amberText: '#E0B060',
  amberTint: '#3A2F18',
  rose: '#E59BB8',
};
