import { StyleSheet, Text, View } from 'react-native';

import { ScreenScroll } from '@/components/layout/screen-scroll';
import { AppButton } from '@/components/ui/app-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconBox } from '@/components/ui/icon-box';
import { dailySummary } from '@/data/health';
import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';
import type { Medicine, User } from '@/types/app';
import { formatLongDate, getGreeting } from '@/utils/greeting';
import { formatCountdown, getNextMedicine } from '@/utils/medicines';

type HomeScreenProps = {
  user: User;
  medicines: Medicine[];
  onTakeMedicine: (id: string) => void;
};

export function HomeScreen({ user, medicines, onTakeMedicine }: HomeScreenProps) {
  const theme = useAppTheme();

  const next = getNextMedicine(medicines);
  const takenCount = medicines.filter((medicine) => medicine.taken).length;
  const progress = medicines.length > 0 ? takenCount / medicines.length : 0;
  const firstName = user.name.split(' ')[0];

  return (
    <ScreenScroll>
      <View>
        <Text style={[typography.muted, { color: theme.muted }]}>{formatLongDate()}</Text>
        <Text style={[typography.h1, { color: theme.ink }]}>
          {getGreeting()}, {firstName}
        </Text>
      </View>

      <Card>
        <Text style={[typography.section, { color: theme.muted }]}>Próximo remédio</Text>

        {next ? (
          <>
            <View style={styles.row}>
              <IconBox name="pill" />
              <View style={styles.grow}>
                <Text style={[typography.title, { color: theme.ink }]}>{next.name}</Text>
                <Text style={[typography.muted, { color: theme.muted }]}>
                  {next.dose} · {next.time}
                </Text>
              </View>
              <Badge label={formatCountdown(next.time)} tone="teal" />
            </View>
            <AppButton label="Marcar como tomado" onPress={() => onTakeMedicine(next.id)} />
          </>
        ) : (
          <Text style={[typography.title, { color: theme.ink }]}>
            Tudo certo por hoje. Nenhum remédio pendente.
          </Text>
        )}
      </Card>

      <Card>
        <View style={styles.row}>
          <Text style={[typography.title, styles.grow, { color: theme.ink }]}>Hoje</Text>
          <Text style={[typography.muted, { color: theme.muted }]}>
            {takenCount} de {medicines.length} doses
          </Text>
        </View>
        <View style={[styles.bar, { backgroundColor: theme.line }]}>
          <View
            style={[styles.barFill, { backgroundColor: theme.teal, width: `${progress * 100}%` }]}
          />
        </View>
      </Card>

      <View style={styles.row}>
        <Card style={styles.grow}>
          <Icon name="pulse" color={theme.rose} />
          <Text style={[typography.muted, { color: theme.muted }]}>Pressão</Text>
          <Text style={[typography.title, { color: theme.ink }]}>{dailySummary.pressure}</Text>
        </Card>
        <Card style={styles.grow}>
          <Icon name="drop" color={theme.primary} />
          <Text style={[typography.muted, { color: theme.muted }]}>Hidratação</Text>
          <Text style={[typography.title, { color: theme.ink }]}>{dailySummary.hydration}</Text>
        </Card>
      </View>
    </ScreenScroll>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  grow: {
    flex: 1,
  },
  bar: {
    height: 10,
    borderRadius: 6,
  },
  barFill: {
    height: 10,
    borderRadius: 6,
  },
});
