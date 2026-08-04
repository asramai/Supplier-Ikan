const LS_KEYS = [
  'asy_syifa_auth',
  'asy_syifa_supabase_fallback',
  'asy_syifa_mitra_fallback',
  'asy_syifa_identity',
  'asy_syifa_invoice',
  'asy_syifa_users',
]

export function clearAppLocalStorage() {
  LS_KEYS.forEach((key) => {
    try { localStorage.removeItem(key) } catch {}
  })
}
