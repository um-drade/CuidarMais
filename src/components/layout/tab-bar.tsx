import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon } from '@/components/ui/icon';
import { useAppTheme } from '@/hooks/use-app-theme';
import type { AppScreen } from '@/types/app';

type TabBarProps = {
  items: AppScreen[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function TabBar({ items, activeIndex, onSelect }: TabBarProps) {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: theme.card,
          borderTopColor: theme.line,
          paddingBottom: Math.max(insets.bottom, 18),
        },
      ]}
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        const color = isActive ? theme.primary : theme.muted;

        return (
          <Pressable
            key={item.id}
            accessibilityRole="tab"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
            onPress={() => onSelect(index)}
            style={styles.tab}
          >
            <Icon name={item.icon} color={color} />
            <Text style={[styles.label, { color }, isActive && styles.labelActive]}>
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 6,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    alignItems: 'center',
    gap: 3,
  },
  label: {
    fontSize: 12.5,
    fontWeight: '500',
  },
  labelActive: {
    fontWeight: '700',
  },
});
