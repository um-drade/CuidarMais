import { useColorScheme } from '@/hooks/use-color-scheme';
import { darkPalette, lightPalette, type AppPalette } from '@/theme/palette';

export function useAppTheme(): AppPalette {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkPalette : lightPalette;
}
