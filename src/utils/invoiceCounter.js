const STORAGE_KEY = 'asy_syifa_invoice'

function getCurrentYear() {
  return new Date().getFullYear()
}

function getStoredCounters() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (data.year !== getCurrentYear()) return null
    return data
  } catch {
    return null
  }
}

function getNextNumber(type) {
  const counters = getStoredCounters() || { year: getCurrentYear(), beli: 0, jual: 0 }
  counters.year = getCurrentYear()
  counters[type] = (counters[type] || 0) + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(counters))
  return counters[type]
}

function generateInvoiceNumber(type) {
  const prefix = type === 'beli' ? 'B' : 'J'
  const number = getNextNumber(type)
  const year = getCurrentYear()
  return `TRX/${year}/${prefix}.${String(number).padStart(4, '0')}`
}

function resetInvoiceCounters() {
  localStorage.removeItem(STORAGE_KEY)
}

export { generateInvoiceNumber, resetInvoiceCounters, getCurrentYear }