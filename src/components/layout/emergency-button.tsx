import { Linking, StyleSheet, View } from 'react-native';

import { AppButton } from '@/components/ui/app-button';
import { Icon } from '@/components/ui/icon';
import { useAppTheme } from '@/hooks/use-app-theme';

const EMERGENCY_NUMBER = '192';

export function EmergencyButton() {
  const theme = useAppTheme();

  return (
    <View style={styles.wrapper}>
      <AppButton
        variant="sos"
        label={`Emergência — ligar ${EMERGENCY_NUMBER}`}
        icon={<Icon name="phone" color={theme.onSos} />}
        onPress={() => Linking.openURL(`tel:${EMERGENCY_NUMBER}`)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
});
