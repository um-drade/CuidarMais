import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenScroll } from '@/components/layout/screen-scroll';
import { Card } from '@/components/ui/card';
import { Icon } from '@/components/ui/icon';
import { IconBox } from '@/components/ui/icon-box';
import { emergencyContacts } from '@/data/contacts';
import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';

export function ContactsScreen() {
  const theme = useAppTheme();

  return (
    <ScreenScroll>
      <View>
        <Text style={[typography.h1, { color: theme.ink }]}>Contatos</Text>
        <Text style={[typography.muted, { color: theme.muted }]}>Toque para ligar</Text>
      </View>

      {emergencyContacts.map((contact) => (
        <Pressable
          key={contact.id}
          accessibilityRole="button"
          accessibilityLabel={`Ligar para ${contact.name}, ${contact.phone}`}
          onPress={() => Linking.openURL(`tel:${contact.phone.replace(/\D/g, '')}`)}
        >
          <Card>
            <View style={styles.row}>
              <IconBox name="user" />
              <View style={styles.grow}>
                <Text style={[typography.title, { color: theme.ink }]}>{contact.name}</Text>
                <Text style={[typography.muted, { color: theme.muted }]}>{contact.phone}</Text>
              </View>
              <Icon name="phone" color={theme.rose} />
            </View>
          </Card>
        </Pressable>
      ))}
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
});
