import { Pressable, StyleSheet, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';

type SwitchProps = {
  value: boolean;
  onValueChange: (value: boolean) => void;
  label: string;
};

/** Interruptor do design (48x28). */
export function Switch({ value, onValueChange, label }: SwitchProps) {
  const theme = useAppTheme();

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange(!value)}
      hitSlop={8}
      style={[styles.track, { backgroundColor: value ? theme.teal : theme.line }]}
    >
      <View style={[styles.knob, { backgroundColor: theme.card }, value ? styles.on : styles.off]} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 16,
  },
  knob: {
    position: 'absolute',
    top: 3,
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  on: { right: 3 },
  off: { left: 3 },
});
