import { StyleSheet, View } from 'react-native';

import { Icon, type IconName } from '@/components/ui/icon';
import { useAppTheme } from '@/hooks/use-app-theme';

type IconBoxProps = {
  name: IconName;
  tone?: 'teal' | 'rose';
};

/** Quadrado 44x44 com ícone, usado nos cartões de remédio e contato. */
export function IconBox({ name, tone = 'teal' }: IconBoxProps) {
  const theme = useAppTheme();
  const color = tone === 'teal' ? theme.teal : theme.rose;
  const backgroundColor = tone === 'teal' ? theme.tealTint : theme.card;

  return (
    <View style={[styles.box, { backgroundColor }]}>
      <Icon name={name} color={color} />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
