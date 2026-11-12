import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';

type BadgeProps = {
  label: string;
  tone?: 'teal' | 'amber';
  icon?: ReactNode;
};

export function Badge({ label, tone = 'teal', icon }: BadgeProps) {
  const theme = useAppTheme();
  const backgroundColor = tone === 'teal' ? theme.tealTint : theme.amberTint;
  const color = tone === 'teal' ? theme.teal : theme.amberText;

  return (
    <View style={[styles.badge, { backgroundColor }]}>
      {icon}
      <Text style={[typography.badge, { color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
});
