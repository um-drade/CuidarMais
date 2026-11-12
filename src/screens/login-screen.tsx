import { useState, type ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AppButton } from '@/components/ui/app-button';
import { Icon } from '@/components/ui/icon';
import { TextField } from '@/components/ui/text-field';
import { useAuth } from '@/contexts/auth-context';
import { useAppTheme } from '@/hooks/use-app-theme';
import { validateCredentials, type AuthErrors } from '@/services/auth';
import { typography } from '@/theme/typography';

export function LoginScreen() {
  const theme = useAppTheme();
  const insets = useSafeAreaInsets();
  const { signIn, signUp } = useAuth();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const found = validateCredentials({ name, email, password }, isSignUp);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsSignUp((current) => !current);
    setErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={[styles.screen, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={[
          styles.content,
          { paddingTop: insets.top + 28, paddingBottom: insets.bottom + 28 },
        ]}
      >
        <Text style={[styles.brand, { color: theme.primary }]}>
          cuidar<Text style={{ color: theme.gold }}>+</Text>
        </Text>

        <Text style={[typography.h1, { color: theme.ink }]}>
          {isSignUp ? 'Criar conta' : 'Entrar'}
        </Text>
        <Text style={[typography.muted, { color: theme.muted }]}>
          Acompanhe remédios, saúde e contatos num só lugar.
        </Text>

        {isSignUp && (
          <FieldWithError error={errors.name} color={theme.rose}>
            <TextField
              label="Nome"
              value={name}
              onChangeText={setName}
              placeholder="Seu nome"
              autoCapitalize="words"
              autoComplete="name"
              leading={<Icon name="user" color={theme.muted} />}
            />
          </FieldWithError>
        )}

        <FieldWithError error={errors.email} color={theme.rose}>
          <TextField
            label="E-mail"
            value={email}
            onChangeText={setEmail}
            placeholder="nome@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            leading={<Icon name="mail" color={theme.muted} />}
          />
        </FieldWithError>

        <FieldWithError error={errors.password} color={theme.rose}>
          <TextField
            label="Senha"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            autoComplete={isSignUp ? 'new-password' : 'current-password'}
            onSubmitEditing={submit}
            leading={<Icon name="lock" color={theme.muted} />}
            trailing={
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                onPress={() => setShowPassword((current) => !current)}
                hitSlop={10}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} color={theme.muted} />
              </Pressable>
            }
          />
        </FieldWithError>

        <AppButton label={isSignUp ? 'Criar conta' : 'Entrar'} onPress={submit} disabled={loading} />
        <AppButton
          variant="secondary"
          label={isSignUp ? 'Já tenho conta' : 'Criar conta'}
          onPress={switchMode}
        />

        <Text style={[styles.footer, { color: theme.muted }]}>
          Neste momento, sua conta fica só neste aparelho.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldWithError({
  error,
  color,
  children,
}: {
  error?: string;
  color: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.fieldGroup}>
      {children}
      {error ? (
        <Text accessibilityLiveRegion="polite" style={[styles.error, { color }]}>
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 18,
  },
  brand: {
    fontSize: 30,
    fontWeight: '700',
  },
  fieldGroup: {
    gap: 6,
  },
  error: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
});
