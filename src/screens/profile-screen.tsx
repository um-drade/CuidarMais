import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ScreenScroll } from '@/components/layout/screen-scroll';
import { AppButton } from '@/components/ui/app-button';
import { Card } from '@/components/ui/card';
import { IconBox } from '@/components/ui/icon-box';
import { Switch } from '@/components/ui/switch';
import { accessibilityOptions } from '@/data/accessibility';
import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';
import type { User } from '@/types/app';

type ProfileScreenProps = {
  user: User;
  onSignOut: () => void;
};

export function ProfileScreen({ user, onSignOut }: ProfileScreenProps) {
  const theme = useAppTheme();
  // Preferências ainda só visuais: não alteram o app.
  const [enabled, setEnabled] = useState<Record<string, boolean>>(
    Object.fromEntries(accessibilityOptions.map((option) => [option.id, true])),
  );

  return (
    <ScreenScroll>
      <Text style={[typography.h1, { color: theme.ink }]}>Perfil</Text>

      <Card>
        <View style={styles.row}>
          <IconBox name="user" />
          <View style={styles.grow}>
            <Text style={[typography.title, { color: theme.ink }]}>{user.name}</Text>
            <Text style={[typography.muted, { color: theme.muted }]}>{user.email}</Text>
          </View>
        </View>
      </Card>

      <Text style={[typography.section, styles.section, { color: theme.muted }]}>
        Acessibilidade
      </Text>

      {accessibilityOptions.map((option) => (
        <Card key={option.id}>
          <View style={styles.row}>
            <View style={styles.grow}>
              <Text style={[typography.title, { color: theme.ink }]}>{option.title}</Text>
              <Text style={[typography.muted, { color: theme.muted }]}>{option.description}</Text>
            </View>
            <Switch
              label={option.title}
              value={enabled[option.id]}
              onValueChange={(value) => setEnabled((current) => ({ ...current, [option.id]: value }))}
            />
          </View>
        </Card>
      ))}

      <AppButton variant="secondary" label="Sair" onPress={onSignOut} />
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
    marginTop: 4,
  },
});
