import { getCompanyIdentity, upsertCompanyIdentity } from '../services/supabaseService'

const STORAGE_KEY = 'asy_syifa_identity'

const defaultIdentity = {
  companyName: 'PT Asy-Syifa Panua',
  address: 'Jl. Pelabuhan Panua, Sulawesi Tenggara',
  phone: '+62 812 3456 7890',
  email: 'info@asysyifapanua.com',
  npwp: '12.345.678.9-012.000',
  logo: '',
}

let cachedIdentity = null

function loadCached() {
  if (cachedIdentity) return cachedIdentity
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      cachedIdentity = { ...defaultIdentity, ...JSON.parse(raw) }
      return cachedIdentity
    }
  } catch {}
  cachedIdentity = { ...defaultIdentity }
  return cachedIdentity
}

export function getIdentity() {
  return loadCached()
}

export function saveIdentity(data) {
  const current = loadCached()
  const merged = { ...current, ...data }
  cachedIdentity = merged
  localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
  upsertCompanyIdentity({ id: 'default', ...merged }).catch(() => {})
  return merged
}

export function resetIdentity() {
  cachedIdentity = { ...defaultIdentity }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultIdentity))
  upsertCompanyIdentity({ id: 'default', ...defaultIdentity }).catch(() => {})
  return { ...defaultIdentity }
}
