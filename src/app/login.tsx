import { Redirect } from 'expo-router';

import { useAuth } from '@/contexts/auth-context';
import { LoginScreen } from '@/screens/login-screen';

export default function LoginRoute() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/" />;
  }

  return <LoginScreen />;
}
