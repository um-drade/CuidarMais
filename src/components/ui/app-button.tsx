import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'sos';
  icon?: ReactNode;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  icon,
  disabled,
  style,
}: AppButtonProps) {
  const theme = useAppTheme();

  const variantStyle =
    variant === 'secondary'
      ? { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: theme.line }
      : { backgroundColor: variant === 'sos' ? theme.sos : theme.button };

  const textColor =
    variant === 'secondary' ? theme.ink : variant === 'sos' ? theme.onSos : theme.onButton;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variantStyle,
        (pressed || disabled) && styles.dimmed,
        style,
      ]}
    >
      {icon}
      <Text style={[typography.button, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  dimmed: {
    opacity: 0.7,
  },
});
