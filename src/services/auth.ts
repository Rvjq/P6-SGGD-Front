import { api, prepararCsrf } from './api';

export interface UsuarioAutenticado {
  id: number;
  email: string;
  nome: string;
  is_superuser: boolean;
  papeis: string[];
  permissoes: string[];
}

export async function iniciarSessao(
  email: string,
  password: string,
): Promise<UsuarioAutenticado> {
  await prepararCsrf();

  await api('/api/auth/login/', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });

  return obterSessao();
}

export function obterSessao(): Promise<UsuarioAutenticado> {
  return api<UsuarioAutenticado>('/api/auth/me/');
}

export function encerrarSessao(): Promise<{ detail: string }> {
  return api('/api/auth/logout/', {
    method: 'POST',
  });
}