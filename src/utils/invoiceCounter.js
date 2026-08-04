import { getInvoiceCounter, upsertInvoiceCounter } from '../services/supabaseService'

const STORAGE_KEY = 'asy_syifa_invoice'

function getCurrentYear() {
  return new Date().getFullYear()
}

function getLocalCounter(type) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const data = JSON.parse(raw)
      if (data.year === getCurrentYear()) {
        return data[type] || 0
      }
    }
  } catch {}
  return null
}

function setLocalCounter(type, value) {
  const year = getCurrentYear()
  let data = { year, beli: 0, jual: 0 }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed.year === year) data = parsed
    }
  } catch {}
  data[type] = value
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function getNextNumber(type) {
  let number = getLocalCounter(type)
  if (number === null) {
    const year = getCurrentYear()
    number = 0
  }
  number = number + 1
  setLocalCounter(type, number)
  upsertInvoiceCounter(type, getCurrentYear(), number).catch(() => {})
  return number
}

function generateInvoiceNumber(type) {
  const prefix = type === 'beli' ? 'B' : 'J'
  const number = getNextNumber(type)
  const year = getCurrentYear()
  return `TRX/${year}/${prefix}.${String(number).padStart(4, '0')}`
}

function resetInvoiceCounters() {
  localStorage.removeItem(STORAGE_KEY)
  upsertInvoiceCounter('beli', getCurrentYear(), 0).catch(() => {})
  upsertInvoiceCounter('jual', getCurrentYear(), 0).catch(() => {})
}

export { generateInvoiceNumber, resetInvoiceCounters, getCurrentYear }
