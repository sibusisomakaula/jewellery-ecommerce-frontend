import { useAuthStore } from '../stores/auth'
const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api';

async function req(path, opts = {}) {
  const auth = useAuthStore()
  const headers = { 'Content-Type': 'application/json', ...(opts.headers||{}) }
  if (auth?.token) headers['Authorization'] = `Bearer ${auth.token}`
  const res = await fetch(`${BASE}${path}`, { ...opts, headers })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`HTTP ${res.status} ${res.statusText}: ${text}`)
  }
  if (res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const Auth = {
  login: (dto) => req('/auth/login', { method:'POST', body: JSON.stringify(dto) }),
  register: (dto) => req('/auth/register', { method:'POST', body: JSON.stringify(dto) }),
  me: () => req('/auth/me')
}

export const Categories = {
  list: () => req('/categories'),
  create: (dto) => req('/categories', { method: 'POST', body: JSON.stringify(dto) }),
  update: (id, dto) => req(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(dto) }),
  remove: (id) => req(`/categories/${id}`, { method: 'DELETE' }),
};

export const Items = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return req(`/jewellery-items${qs ? `?${qs}` : ''}`);
  },
  get: (id) => req(`/jewellery-items/${id}`),
  create: (dto) => req('/jewellery-items', { method: 'POST', body: JSON.stringify(dto) }),
  update: (id, dto) => req(`/jewellery-items/${id}`, { method: 'PUT', body: JSON.stringify(dto) }),
  remove: (id) => req(`/jewellery-items/${id}`, { method: 'DELETE' }),
};

export const Orders = {
  list: (params={}) => {
    const qs = new URLSearchParams(params).toString()
    return req(`/orders${qs?`?${qs}`:''}`)
  },
  get: (id) => req(`/orders/${id}`),
  create: (dto) => req('/orders', { method: 'POST', body: JSON.stringify(dto) }),
  updateStatus: (id, status) => req(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

export const Payments = {
  create: (dto) => req('/payments', { method: 'POST', body: JSON.stringify(dto) }),
  listByOrder: (orderId) => req(`/orders/${orderId}/payments`),
};

export const Customers = {
  create: (dto) => req('/customers', { method: 'POST', body: JSON.stringify(dto) }),
  get: (id) => req(`/customers/${id}`)
};

