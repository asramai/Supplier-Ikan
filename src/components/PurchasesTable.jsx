import React, { useState, useEffect } from 'react'
import { getTransactions } from '../services/supabaseService'

function PurchasesTable() {
  const [purchases, setPurchases] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterFish, setFilterFish] = useState('Semua')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTransactions('beli')
        const mapped = data.map((t) => ({
          fisherman: t.partner_name,
          time: new Date(t.date || t.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }),
          fish: t.notes || '-',
          weight: '-',
          total: `Rp ${(parseFloat(t.total_amount) || 0).toLocaleString('id-ID')}`,
          id: t.id,
        }))
        setPurchases(mapped.reverse())
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  const fishTypes = ['Semua', ...new Set(purchases.map((p) => p.fish))]

  const filtered = purchases.filter((row) => {
    const matchesSearch = row.fisherman.toLowerCase().includes(searchTerm.toLowerCase()) || row.fish.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFish = filterFish === 'Semua' || row.fish === filterFish
    return matchesSearch && matchesFish
  })

  return (
    <section className="flex flex-col gap-md animate-slide-up delay-300" style={{ animationFillMode: 'backwards' }}>
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md text-on-surface">Pembelian Terakhir</h2>
        <button className="text-primary font-label-md text-label-md hover:underline">Lihat Semua</button>
      </div>
      <div className="flex flex-col sm:flex-row gap-md">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
          <input
            className="w-full pl-10 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
            placeholder="Cari nelayan atau jenis ikan..."
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select
          className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
          value={filterFish}
          onChange={(e) => setFilterFish(e.target.value)}
        >
          {fishTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto scroll-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-primary border-b-2 border-primary-container">
              <tr>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Nelayan</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Jenis Ikan</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Berat</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-md py-8 text-center font-body-md text-body-md text-on-surface-variant">Memuat data...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-md py-8 text-center font-body-md text-body-md text-on-surface-variant">Tidak ada data ditemukan</td>
                </tr>
              ) : (
                filtered.map((row, index) => (
                  <tr key={row.id || index} className={index % 2 === 0 ? 'zebra-row' : ''}>
                    <td className="px-md py-4">
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md font-bold text-on-surface">{row.fisherman}</span>
                        <span className="font-label-md text-label-md text-on-surface-variant">{row.time}</span>
                      </div>
                    </td>
                    <td className="px-md py-4 font-body-md text-body-md">{row.fish}</td>
                    <td className="px-md py-4 font-body-md text-body-md">{row.weight}</td>
                    <td className="px-md py-4 font-body-md text-body-md font-bold text-primary">{row.total}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default PurchasesTable
