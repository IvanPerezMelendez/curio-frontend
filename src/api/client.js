const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000';

function getToken() {
  return localStorage.getItem('curio_token');
}

export function setToken(token) {
  localStorage.setItem('curio_token', token);
}

export function clearToken() {
  localStorage.removeItem('curio_token');
}

async function request(method, path, body) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, {
    method,
    headers,
    body: body != null ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const detail = await res.json().catch(() => ({}));
    const err = new Error(detail?.detail ?? `HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const api = {
  get:  (path)        => request('GET',    path),
  post: (path, body)  => request('POST',   path, body),
};
