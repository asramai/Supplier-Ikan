import { supabase } from '../utils/supabase'

const LS_FALLBACK_KEY = 'asy_syifa_supabase_fallback'

function getLSFallback() {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function setLSFallback(data) {
  localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(data))
}

export async function signInWithPassword(credentials) {
  const { data, error } = await supabase.auth.signInWithPassword(credentials)
  if (error) throw error
  return data
}

export async function signUp(credentials) {
  const { data, error } = await supabase.auth.signUp(credentials)
  if (error) throw error
  return data
}

export async function signOutSupabase() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function getSupabaseSession() {
  const { data, error } = await supabase.auth.getSession()
  if (error) return null
  return data.session
}

export async function getProfiles() {
  const { data, error } = await supabase.from('profiles').select('*')
  if (error) {
    const fb = getLSFallback()
    return fb?.profiles || []
  }
  return data || []
}

export async function getProfile(username) {
  const { data, error } = await supabase.from('profiles').select('*').eq('username', username).maybeSingle()
  if (error || !data) {
    const fb = getLSFallback()
    const found = fb?.profiles?.find((p) => p.username === username)
    return found || null
  }
  return data
}

export async function upsertProfile(profile) {
  const { data, error } = await supabase.from('profiles').upsert(profile, { onConflict: 'username' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.profiles = fb.profiles || []
    const idx = fb.profiles.findIndex((p) => p.username === profile.username)
    if (idx >= 0) fb.profiles[idx] = profile
    else fb.profiles.push(profile)
    setLSFallback(fb)
    return profile
  }
  return data
}

export async function getTransactions(type) {
  let query = supabase.from('transactions').select('*').order('created_at', { ascending: false })
  if (type) {
    query = query.eq('type', type)
  }
  const { data, error } = await query
  if (error) {
    const fb = getLSFallback()
    let txs = fb?.transactions || []
    if (type) txs = txs.filter((t) => t.type === type)
    return txs
  }
  return data || []
}

export async function insertTransaction(transaction) {
  const payload = {
    type: transaction.type,
    invoice_number: transaction.invoice_number || transaction.id,
    date: transaction.date || new Date().toISOString().split('T')[0],
    partner_name: transaction.partner_name || transaction.fisherman || transaction.vendor || '',
    partner_type: transaction.partner_type || '',
    total_amount: transaction.total_amount || transaction.total_price || 0,
    status: transaction.status || 'Selesai',
    notes: transaction.notes || '',
    created_at: new Date().toISOString(),
  }
  const { data, error } = await supabase.from('transactions').insert(payload).select().single()
  if (error) {
    const fb = getLSFallback() || { transactions: [], transaction_items: [], counters: {} }
    const newTx = { ...payload, id: data?.id || `local-${Date.now()}` }
    fb.transactions.unshift(newTx)
    setLSFallback(fb)
    return newTx
  }
  return data
}

export async function insertTransactionItems(items) {
  const payload = items.map((item) => ({
    transaction_id: item.transaction_id,
    fish_type: item.fish_type || item.fishType,
    quantity_kg: parseFloat(item.quantity_kg || item.weight) || 0,
    price_per_kg: parseFloat(item.price_per_kg || item.price) || 0,
    subtotal: parseFloat(item.subtotal || ((parseFloat(item.quantity_kg || item.weight) || 0) * (parseFloat(item.price_per_kg || item.price) || 0))),
  }))
  const { data, error } = await supabase.from('transaction_items').insert(payload).select()
  if (error) {
    const fb = getLSFallback() || { transactions: [], transaction_items: [], counters: {} }
    fb.transaction_items.push(...payload)
    setLSFallback(fb)
    return payload
  }
  return data || payload
}

export async function getTransactionItems(transactionId) {
  const { data, error } = await supabase.from('transaction_items').select('*').eq('transaction_id', transactionId)
  if (error) {
    const fb = getLSFallback()
    return (fb?.transaction_items || []).filter((i) => i.transaction_id === transactionId)
  }
  return data || []
}

export async function getMitra(type) {
  let query = supabase.from('mitra').select('*').order('name')
  if (type) {
    query = query.eq('type', type)
  }
  const { data, error } = await query
  if (error) {
    const fb = getLSFallback()
    let list = fb?.mitra || []
    if (type) list = list.filter((m) => m.type === type)
    return list
  }
  return data || []
}

export async function upsertMitra(mitra) {
  const { data, error } = await supabase.from('mitra').upsert(mitra, { onConflict: 'type,name' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.mitra = fb.mitra || []
    const idx = fb.mitra.findIndex((m) => m.name === mitra.name && m.type === mitra.type)
    if (idx >= 0) fb.mitra[idx] = mitra
    else fb.mitra.push(mitra)
    setLSFallback(fb)
    return mitra
  }
  return data
}

export async function deleteMitra(id) {
  const { error } = await supabase.from('mitra').delete().eq('id', id)
  if (error) {
    const fb = getLSFallback() || { mitra: [] }
    fb.mitra = fb.mitra.filter((m) => m.id !== id)
    setLSFallback(fb)
    return true
  }
  return true
}

export async function getFishTypes() {
  const { data, error } = await supabase.from('fish_types').select('*').order('name')
  if (error) {
    const fb = getLSFallback()
    return fb?.fish_types || []
  }
  return data || []
}

export async function upsertFishType(name) {
  const { data, error } = await supabase.from('fish_types').upsert({ name }, { onConflict: 'name' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.fish_types = fb.fish_types || []
    if (!fb.fish_types.find((f) => f.name === name)) {
      fb.fish_types.push({ name })
      setLSFallback(fb)
    }
    return { name }
  }
  return data
}

export async function deleteFishType(name) {
  const { error } = await supabase.from('fish_types').delete().eq('name', name)
  if (error) {
    const fb = getLSFallback() || { fish_types: [] }
    fb.fish_types = fb.fish_types.filter((f) => f.name !== name)
    setLSFallback(fb)
    return true
  }
  return true
}

export async function getInventory() {
  const { data, error } = await supabase.from('inventory').select('*').order('created_at')
  if (error) {
    const fb = getLSFallback()
    return fb?.inventory || []
  }
  return data || []
}

export async function upsertInventory(item) {
  const { data, error } = await supabase.from('inventory').upsert(item, { onConflict: 'id' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.inventory = fb.inventory || []
    const idx = fb.inventory.findIndex((i) => i.id === item.id)
    if (idx >= 0) fb.inventory[idx] = item
    else fb.inventory.push(item)
    setLSFallback(fb)
    return item
  }
  return data
}

export async function deleteInventory(id) {
  const { error } = await supabase.from('inventory').delete().eq('id', id)
  if (error) {
    const fb = getLSFallback() || { inventory: [] }
    fb.inventory = fb.inventory.filter((i) => i.id !== id)
    setLSFallback(fb)
    return true
  }
  return true
}

export async function getInvestors() {
  const { data, error } = await supabase.from('investors').select('*').order('name')
  if (error) {
    const fb = getLSFallback()
    return fb?.investors || []
  }
  return data || []
}

export async function upsertInvestor(investor) {
  const { data, error } = await supabase.from('investors').upsert(investor, { onConflict: 'id' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.investors = fb.investors || []
    const idx = fb.investors.findIndex((i) => i.id === investor.id)
    if (idx >= 0) fb.investors[idx] = investor
    else fb.investors.push(investor)
    setLSFallback(fb)
    return investor
  }
  return data
}

export async function deleteInvestor(id) {
  const { error } = await supabase.from('investors').delete().eq('id', id)
  if (error) {
    const fb = getLSFallback() || { investors: [] }
    fb.investors = fb.investors.filter((i) => i.id !== id)
    setLSFallback(fb)
    return true
  }
  return true
}

export async function getInvestorTransactions(investorId) {
  let query = supabase.from('investor_transactions').select('*').order('date', { ascending: false })
  if (investorId) {
    query = query.eq('investor_id', investorId)
  }
  const { data, error } = await query
  if (error) {
    const fb = getLSFallback()
    let txs = fb?.investor_transactions || []
    if (investorId) txs = txs.filter((t) => t.investor_id === investorId)
    return txs
  }
  return data || []
}

export async function insertInvestorTransaction(tx) {
  const payload = {
    investor_id: tx.investor_id,
    type: tx.type || 'masuk',
    amount: parseFloat(tx.amount) || 0,
    date: tx.date || tx.transfer_date || new Date().toISOString().split('T')[0],
    notes: tx.notes || tx.batch || '',
    created_at: new Date().toISOString(),
  }
  const { data, error } = await supabase.from('investor_transactions').insert(payload).select().single()
  if (error) {
    const fb = getLSFallback() || { investor_transactions: [] }
    const newTx = { ...payload, id: data?.id || `local-${Date.now()}` }
    fb.investor_transactions.unshift(newTx)
    setLSFallback(fb)
    return newTx
  }
  return data
}

export async function getCompanyIdentity() {
  const { data, error } = await supabase.from('company_identity').select('*').maybeSingle()
  if (error || !data) {
    const fb = getLSFallback()
    return fb?.company_identity || {
      id: 'default',
      companyName: 'PT Asy-Syifa Panua',
      address: 'Jl. Pelabuhan Panua, Sulawesi Tenggara',
      phone: '+62 812 3456 7890',
      email: 'info@asysyifapanua.com',
      npwp: '12.345.678.9-012.000',
      logo: '',
    }
  }
  return data
}

export async function upsertCompanyIdentity(data) {
  const payload = {
    id: data.id || 'default',
    company_name: data.companyName || data.company_name || 'PT Asy-Syifa Panua',
    address: data.address || '',
    phone: data.phone || '',
    email: data.email || '',
    npwp: data.npwp || '',
    logo: data.logo || '',
    updated_at: new Date().toISOString(),
  }
  const { result, error } = await supabase.from('company_identity').upsert(payload, { onConflict: 'id' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.company_identity = { ...fb.company_identity, ...payload }
    setLSFallback(fb)
    return payload
  }
  return result || payload
}

export async function getInvoiceCounter(type) {
  const year = new Date().getFullYear()
  const { data, error } = await supabase.from('invoice_counters').select('*').eq('type', type).eq('year', year).maybeSingle()
  if (error || !data) {
    const fb = getLSFallback()
    const counters = fb?.invoice_counters || {}
    const key = `${type}-${year}`
    return counters[key] || { type, year, last_number: 0 }
  }
  return data
}

export async function upsertInvoiceCounter(type, year, lastNumber) {
  const payload = { type, year, last_number: lastNumber, updated_at: new Date().toISOString() }
  const { data, error } = await supabase.from('invoice_counters').upsert(payload, { onConflict: 'year,type' }).select().maybeSingle()
  if (error) {
    const fb = getLSFallback() || {}
    fb.invoice_counters = fb.invoice_counters || {}
    const key = `${type}-${year}`
    fb.invoice_counters[key] = { type, year, last_number: lastNumber }
    setLSFallback(fb)
    return payload
  }
  return data
}

export async function getUsersDB() {
  try {
    const profiles = await getProfiles()
    const db = {}
    for (const p of profiles) {
      db[p.username] = {
        username: p.username,
        passwordHash: p.password_hash || '',
        role: p.role || 'Operator',
        name: p.name || '',
        email: p.email || '',
        phone: p.phone || '',
        address: p.address || '',
        isActive: p.is_active !== false,
        avatar: p.avatar || '',
      }
    }
    return db
  } catch {
    const raw = localStorage.getItem('asy_syifa_users')
    if (raw) return JSON.parse(raw)
    return defaultUsersDB()
  }
}

function defaultUsersDB() {
  return {
    admin: { username: 'admin', passwordHash: 'a80cb5d9efbeedafc85c83b2d231d865f71404058ee2a0b4f7cd6fa5cb27abb7', role: 'Admin', name: 'Ahmad Al-Fatih', email: 'ahmad.fatih@panua.com', phone: '+62 812 3456 7890', address: 'Jl. Panua No. 1, Jakarta', isActive: true, avatar: '' },
    operator: { username: 'operator', passwordHash: '3b5be3236702d3fa03b4732e862a0d8977c90fa3b0f5bb5d751b8d7a116d69cc', role: 'Operator', name: 'Rahmat Panua', email: 'rahmat.p@ops.id', phone: '+62 813 1122 3344', address: 'Jl. Nelayan No. 5, Surabaya', isActive: true, avatar: '' },
    investor: { username: 'investor', passwordHash: 'f21462db307cec97575df82bdfb9ccc37d9965649f837bcdc986202bb212c00e', role: 'Investor', name: 'Siti Yusufina', email: 'siti.y@investor.com', phone: '+62 811 9988 7766', address: 'Jl. Investor No. 10, Bandung', isActive: true, avatar: '' },
    owner: { username: 'owner', passwordHash: '5f214d6c12ff64a7a835fc8112b84d0da1379da0e39f9121d9f65af46ff78e3b', role: 'Owner', name: 'Haji Dahlan', email: 'haji.dahlan@owner.com', phone: '+62 812 3456 7890', address: 'Jl. Owner No. 1, Jakarta', isActive: true, avatar: '' },
  }
}
