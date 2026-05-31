import { api, setToken } from './client';

export async function register(email, password) {
  return api.post('/auth/register', { email, password });
}

export async function login(email, password) {
  const body = new URLSearchParams({ username: email, password });
  const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';
  const res = await fetch(`${BASE}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const err = new Error(detail?.detail ?? 'Credenciales incorrectas');
    err.status = res.status;
    throw err;
  }
  const data = await res.json();
  setToken(data.access_token);
  return data;
}

export async function getMe() {
  return api.get('/users/me');
}
