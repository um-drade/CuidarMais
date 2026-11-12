import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenScroll } from '@/components/layout/screen-scroll';
import { AppButton } from '@/components/ui/app-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconBox } from '@/components/ui/icon-box';
import { Switch } from '@/components/ui/switch';
import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';
import type { Medicine } from '@/types/app';
import { getPeriod, periods } from '@/utils/medicines';

type MedicinesScreenProps = {
  medicines: Medicine[];
  onToggle: (id: string) => void;
};

export function MedicinesScreen({ medicines, onToggle }: MedicinesScreenProps) {
  const theme = useAppTheme();
  const [remindersOn, setRemindersOn] = useState(true);

  return (
    <ScreenScroll>
      <Text style={[typography.h1, { color: theme.ink }]}>Remédios</Text>

      <Card>
        <View style={styles.row}>
          <IconBox name="bell" />
          <View style={styles.grow}>
            <Text style={[typography.title, { color: theme.ink }]}>Lembretes ativados</Text>
            <Text style={[typography.muted, { color: theme.muted }]}>
              Aviso no horário de cada remédio
            </Text>
          </View>
          <Switch label="Lembretes" value={remindersOn} onValueChange={setRemindersOn} />
        </View>
      </Card>

      {periods.map((period) => {
        const items = medicines
          .filter((medicine) => getPeriod(medicine.time) === period)
          .sort((a, b) => a.time.localeCompare(b.time));

        if (items.length === 0) return null;

        return (
          <View key={period} style={styles.section}>
            <Text style={[typography.section, { color: theme.muted }]}>{period}</Text>

            {items.map((medicine) => (
              <Card key={medicine.id}>
                <View style={styles.row}>
                  <IconBox name="pill" />
                  <View style={styles.grow}>
                    <Text style={[typography.title, { color: theme.ink }]}>{medicine.name}</Text>
                    <Text style={[typography.muted, { color: theme.muted }]}>
                      {medicine.dose} · {medicine.time}
                    </Text>
                  </View>

                  {medicine.taken ? (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`${medicine.name} tomado. Toque para desfazer`}
                      onPress={() => onToggle(medicine.id)}
                    >
                      <Badge
                        label="Tomado"
                        tone="teal"
                        icon={<Icon name="check" color={theme.teal} size={14} />}
                      />
                    </Pressable>
                  ) : (
                    <Badge label="Pendente" tone="amber" />
                  )}
                </View>

                {!medicine.taken && (
                  <AppButton label="Marcar como tomado" onPress={() => onToggle(medicine.id)} />
                )}
              </Card>
            ))}
          </View>
        );
      })}
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
  section: {
    gap: 14,
    marginTop: 4,
  },
});
