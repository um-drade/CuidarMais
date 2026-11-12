import type { User } from '@/types/app';

/**
 * ATENÇÃO: autenticação provisória, só para a interface.
 * Não existe servidor nem armazenamento: qualquer e-mail válido com senha de
 * pelo menos 6 caracteres entra. Troque `signIn` e `signUp` por uma
 * implementação real (backend ou armazenamento seguro no aparelho) antes de
 * usar com dados reais.
 */

export const MIN_PASSWORD_LENGTH = 6;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthErrors = {
  name?: string;
  email?: string;
  password?: string;
};

export function validateCredentials(
  input: { name?: string; email: string; password: string },
  requireName: boolean,
): AuthErrors {
  const errors: AuthErrors = {};

  if (requireName && !input.name?.trim()) {
    errors.name = 'Digite seu nome.';
  }
  if (!EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Digite um e-mail válido.';
  }
  if (input.password.length < MIN_PASSWORD_LENGTH) {
    errors.password = `A senha precisa ter pelo menos ${MIN_PASSWORD_LENGTH} caracteres.`;
  }

  return errors;
}

const nameFromEmail = (email: string) => {
  const local = email.split('@')[0].replace(/[._-]+/g, ' ').trim();
  return local.charAt(0).toUpperCase() + local.slice(1);
};

export async function signIn(email: string, _password: string): Promise<User> {
  const cleanEmail = email.trim().toLowerCase();
  return { name: nameFromEmail(cleanEmail), email: cleanEmail };
}

export async function signUp(name: string, email: string, _password: string): Promise<User> {
  return { name: name.trim(), email: email.trim().toLowerCase() };
}
