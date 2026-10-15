const BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080/api'

async function req(path, opts={}) {
  const headers = { 'Content-Type':'application/json', ...(opts.headers||{}) }
  const res = await fetch(`${BASE}${path}`, { ...opts, headers })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`)
  if (res.status === 204) return null
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

export const Categories = {
  list: () => req('/categories'),
  create: (dto) => req('/categories', { method:'POST', body:JSON.stringify(dto) }),
  update: (id,dto) => req(`/categories/${id}`, { method:'PUT', body:JSON.stringify(dto) }),
  remove: (id) => req(`/categories/${id}`, { method:'DELETE' }),
}

export const Items = {
  list: (params={}) => {
    const qs = new URLSearchParams(params).toString()
    return req(`/jewellery-items${qs?`?${qs}`:''}`)
  },
  get: (id) => req(`/jewellery-items/${id}`),
  create: (formData) => fetch(`${BASE}/jewellery-items`, { method:'POST', body:formData }).then(r=>r.json()),
  update: (id, formData) => fetch(`${BASE}/jewellery-items/${id}`, { method:'PUT', body:formData }).then(r=>r.json()),
  remove: (id) => req(`/jewellery-items/${id}`, { method:'DELETE' }),
}

export const Orders = {
  list: (params={}) => {
    const qs = new URLSearchParams(params).toString()
    return req(`/orders${qs?`?${qs}`:''}`)
  },
  get: (id) => req(`/orders/${id}`),
  create: (dto) => req('/orders', { method:'POST', body:JSON.stringify(dto) }),
  updateStatus: (id,status) => req(`/orders/${id}/status`, { method:'PUT', body:JSON.stringify({status}) }),
}

export const Customers = {
  create: (dto) => req('/customers', { method:'POST', body:JSON.stringify(dto) }),
  get: (id) => req(`/customers/${id}`)
}
