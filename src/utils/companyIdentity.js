const STORAGE_KEY = 'asy_syifa_identity'

const defaultIdentity = {
  companyName: 'PT Asy-Syifa Panua',
  address: 'Jl. Pelabuhan Panua, Sulawesi Tenggara',
  phone: '+62 812 3456 7890',
  email: 'info@asysyifapanua.com',
  npwp: '12.345.678.9-012.000',
  logo: '',
}

export function getIdentity() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...defaultIdentity, ...JSON.parse(raw) }
    return { ...defaultIdentity }
  } catch {
    return { ...defaultIdentity }
  }
}

export function saveIdentity(data) {
  const current = getIdentity()
  const merged = { ...current, ...data }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  return merged
}

export function resetIdentity() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultIdentity))
  return { ...defaultIdentity }
}
