import { StyleSheet, Text, View } from 'react-native';

import { ScreenScroll } from '@/components/layout/screen-scroll';
import { Card } from '@/components/ui/card';
import { healthMetrics } from '@/data/health';
import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';

export function HealthScreen() {
  const theme = useAppTheme();

  return (
    <ScreenScroll>
      <View>
        <Text style={[typography.h1, { color: theme.ink }]}>Saúde</Text>
        <Text style={[typography.muted, { color: theme.muted }]}>Resumo do dia</Text>
      </View>

      <View style={styles.grid}>
        {healthMetrics.map((metric) => (
          <Card key={metric.label} style={styles.metric}>
            <Text style={[typography.muted, { color: theme.muted }]}>{metric.label}</Text>
            <Text style={[styles.value, { color: theme.ink }]}>{metric.value}</Text>
            <Text style={[typography.muted, { color: theme.muted }]}>{metric.unit}</Text>
            <Text style={[typography.label, { color: theme.teal }]}>{metric.status}</Text>
          </Card>
        ))}
      </View>

      <View style={[styles.tip, { backgroundColor: theme.amberTint }]}>
        <Text style={[typography.section, { color: theme.amberText }]}>Dica de hoje</Text>
        <Text style={[typography.title, { color: theme.amberText }]}>
          Beba água e faça uma caminhada leve.
        </Text>
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metric: {
    width: '47.5%',
    gap: 4,
  },
  value: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  tip: {
    borderRadius: 20,
    padding: 16,
    gap: 6,
  },
});
