import type { ReactNode } from 'react';
import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { useAppTheme } from '@/hooks/use-app-theme';
import { typography } from '@/theme/typography';

type TextFieldProps = TextInputProps & {
  label: string;
  leading?: ReactNode;
  trailing?: ReactNode;
};

export function TextField({ label, leading, trailing, style, ...inputProps }: TextFieldProps) {
  const theme = useAppTheme();

  return (
    <View>
      <Text style={[typography.label, styles.label, { color: theme.ink }]}>{label}</Text>
      <View style={[styles.field, { backgroundColor: theme.card, borderColor: theme.line }]}>
        {leading}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={theme.muted}
          style={[styles.input, { color: theme.ink }, style]}
          {...inputProps}
        />
        {trailing}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
  },
  field: {
    minHeight: 54,
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 54,
  },
});
