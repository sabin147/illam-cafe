const BASE = '/api/orders'

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `HTTP ${res.status}`)
  }
  if (res.status === 204) return null
  return res.json()
}

export const ordersApi = {
  getAll:        ()           => request(BASE),
  getById:       (id)         => request(`${BASE}/${id}`),
  create:        (data)       => request(BASE, { method: 'POST', body: JSON.stringify(data) }),
  updateStatus:  (id, status) => request(`${BASE}/${id}/status`, { method: 'PUT', body: JSON.stringify(status) }),
}
