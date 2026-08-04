import { getMitra, upsertMitra } from '../services/supabaseService'

const LS_KEY = 'asy_syifa_mitra_fallback'

const defaultData = {
  nelayan: [
    { name: 'Haji Sulaiman', phone: '+62 812 3456 7890', icon: 'anchor', status: 'Aktif', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', statusBorder: 'border-[#28A745]/20' },
    { name: 'UD Maritim Jaya', phone: '+62 811 9988 7766', icon: 'directions_boat', status: 'Tidak Aktif', statusBg: 'bg-[#F0F0F0]', statusText: 'text-[#6C757D]', statusBorder: 'border-[#6C757D]/20' },
    { name: 'Koperasi Nelayan Panua', phone: '+62 813 1122 3344', icon: 'account_balance_wallet', status: 'Aktif', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', statusBorder: 'border-[#28A745]/20' },
  ],
  vendor: [
    { name: 'FreshFish Jakarta', phone: '+62 21 788 9900', icon: 'storefront', status: 'Aktif', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', statusBorder: 'border-[#28A745]/20' },
    { name: 'Kota Ikan Makassar', phone: '+62 411 123 4567', icon: 'storefront', status: 'Aktif', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', statusBorder: 'border-[#28A745]/20' },
    { name: 'Surabaya Seafood', phone: '+62 31 987 6543', icon: 'storefront', status: 'Aktif', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', statusBorder: 'border-[#28A745]/20' },
    { name: 'Pasar Ikan Bandung', phone: '+62 22 456 7890', icon: 'storefront', status: 'Tidak Aktif', statusBg: 'bg-[#F0F0F0]', statusText: 'text-[#6C757D]', statusBorder: 'border-[#6C757D]/20' },
  ],
}

let cachedMitraData = null

function loadMitraData() {
  if (cachedMitraData) return cachedMitraData
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      cachedMitraData = JSON.parse(raw)
      return cachedMitraData
    }
  } catch {}
  cachedMitraData = { ...defaultData }
  return cachedMitraData
}

function saveMitraData(data) {
  cachedMitraData = data
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  } catch {}
}

export const mitraData = loadMitraData()

export function getNelayanList() {
  const data = loadMitraData()
  return data.nelayan.filter((n) => n.status === 'Aktif')
}

export function getVendorList() {
  const data = loadMitraData()
  return data.vendor.filter((v) => v.status === 'Aktif')
}

export function getNelayanByName(name) {
  const data = loadMitraData()
  return data.nelayan.find((n) => n.name === name) || null
}

export function getVendorByName(name) {
  const data = loadMitraData()
  return data.vendor.find((v) => v.name === name) || null
}

export async function syncMitraToSupabase() {
  try {
    const data = loadMitraData()
    const allMitra = [
      ...data.nelayan.map((m, i) => ({ ...m, type: 'nelayan', id: m.id || `nelayan-${i}` })),
      ...data.vendor.map((m, i) => ({ ...m, type: 'vendor', id: m.id || `vendor-${i}` }))
    ]
    for (const m of allMitra) {
      const { icon, statusBg, statusText, statusBorder, ...clean } = m
      await upsertMitra(clean)
    }
  } catch (err) {
    console.error('Failed to sync mitra to Supabase:', err)
  }
}

export async function addMitraEntry(entry) {
  const data = loadMitraData()
  const type = entry.type || 'nelayan'
  if (type === 'nelayan') {
    data.nelayan.push({
      name: entry.name,
      phone: entry.phone || '',
      icon: 'anchor',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    })
  } else {
    data.vendor.push({
      name: entry.name,
      phone: entry.phone || '',
      icon: 'storefront',
      status: 'Aktif',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    })
  }
  saveMitraData(data)
  try {
    const last = type === 'nelayan' ? data.nelayan[data.nelayan.length - 1] : data.vendor[data.vendor.length - 1]
    const payload = { ...last, type }
    delete payload.icon
    delete payload.statusBg
    delete payload.statusText
    delete payload.statusBorder
    payload.id = last.id || `mitra-${Date.now()}`
    await upsertMitra(payload)
  } catch (err) {
    console.error('Failed to save mitra to Supabase:', err)
  }
}

export async function updateMitraStatusLocal(name, status) {
  const data = loadMitraData()
  const nelayanIdx = data.nelayan.findIndex((n) => n.name === name)
  if (nelayanIdx >= 0) {
    data.nelayan[nelayanIdx].status = status
    data.nelayan[nelayanIdx].statusBg = status === 'Aktif' ? 'bg-[#E8F5E9]' : 'bg-[#F0F0F0]'
    data.nelayan[nelayanIdx].statusText = status === 'Aktif' ? 'text-[#28A745]' : 'text-[#6C757D]'
    data.nelayan[nelayanIdx].statusBorder = status === 'Aktif' ? 'border-[#28A745]/20' : 'border-[#6C757D]/20'
    saveMitraData(data)
    try {
      const payload = { ...data.nelayan[nelayanIdx], type: 'nelayan' }
      delete payload.icon
      delete payload.statusBg
      delete payload.statusText
      delete payload.statusBorder
      payload.id = data.nelayan[nelayanIdx].id || `nelayan-${nelayanIdx}`
      await upsertMitra(payload)
    } catch (err) {
      console.error('Failed to update nelayan status in Supabase:', err)
    }
    return
  }
  const vendorIdx = data.vendor.findIndex((v) => v.name === name)
  if (vendorIdx >= 0) {
    data.vendor[vendorIdx].status = status
    data.vendor[vendorIdx].statusBg = status === 'Aktif' ? 'bg-[#E8F5E9]' : 'bg-[#F0F0F0]'
    data.vendor[vendorIdx].statusText = status === 'Aktif' ? 'text-[#28A745]' : 'text-[#6C757D]'
    data.vendor[vendorIdx].statusBorder = status === 'Aktif' ? 'border-[#28A745]/20' : 'border-[#6C757D]/20'
    saveMitraData(data)
    try {
      const payload = { ...data.vendor[vendorIdx], type: 'vendor' }
      delete payload.icon
      delete payload.statusBg
      delete payload.statusText
      delete payload.statusBorder
      payload.id = data.vendor[vendorIdx].id || `vendor-${vendorIdx}`
      await upsertMitra(payload)
    } catch (err) {
      console.error('Failed to update vendor status in Supabase:', err)
    }
  }
}
