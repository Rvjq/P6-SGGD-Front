export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function getCookie(name: string): string {
  const cookie = document.cookie
    .split('; ')
    .find((item) => item.startsWith(`${name}=`));

  return cookie
    ? decodeURIComponent(cookie.substring(name.length + 1))
    : '';
}

export async function api<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const method = (options.method ?? 'GET').toUpperCase();
  const headers = new Headers(options.headers);

  if (options.body && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    headers.set('X-CSRFToken', getCookie('csrftoken'));
  }

  const response = await fetch(url, {
    ...options,
    method,
    headers,
    credentials: 'same-origin',
  });

  if (!response.ok) {
    let mensagem = `Erro HTTP ${response.status}`;

    try {
      const dados = await response.json();

      if (typeof dados.detail === 'string') {
        mensagem = dados.detail;
      }
    } catch {
      // Mantém a mensagem HTTP padrão.
    }

    throw new ApiError(response.status, mensagem);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export function prepararCsrf() {
  return api<{ detail: string }>('/api/auth/csrf/');
}