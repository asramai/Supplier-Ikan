import React, { useState, useEffect } from 'react'
import { getTransactions } from '../services/supabaseService'

function LaporanLabaRugi() {
  const [filterYear, setFilterYear] = useState('2025')
  const [filterMonth, setFilterMonth] = useState('Semua')
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true)
      try {
        const data = await getTransactions()
        if (data && data.length > 0) {
          setTransactions(data.map((tx) => ({
            id: tx.id,
            name: tx.fisherman || tx.vendor || '-',
            date: tx.date || new Date(tx.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
            status: tx.status || 'LUNAS',
            type: tx.type,
            total: tx.total_price || 0,
          })))
        }
      } catch {}
      setLoading(false)
    }
    loadTransactions()
  }, [])

  const expenseItems = [
    { category: 'Bahan Bakar (BBM)', sub: 'Solar Industri', value: 'Rp 5.200k' },
    { category: 'Es & Logistik', sub: 'Pendingin Kapal', value: 'Rp 1.450k' },
    { category: 'Gaji & Upah', sub: 'ABK & Operasional', value: 'Rp 4.800k' },
    { category: 'Lain-lain', sub: 'Administrasi', value: 'Rp 1.350k' },
  ]

  const filteredTransactions = transactions.length > 0 ? transactions.filter((tx) => {
    if (filterMonth === 'Semua') return true
    return tx.date.includes(filterMonth) || tx.date.includes(filterYear)
  }) : [
    { name: 'Kapal Bahari 01', date: '12 Aug, 2023', status: 'LUNAS', icon: 'inventory_2', statusBg: 'bg-[#E8F5E9]', statusText: 'text-[#28A745]', iconBg: 'bg-primary-container', iconColor: 'text-on-primary-container' },
    { name: 'Logistik Es', date: '11 Aug, 2023', status: 'HUTANG', icon: 'shipping', statusBg: 'bg-[#FDEDEC]', statusText: 'text-[#DC3545]', iconBg: 'bg-surface-container-high', iconColor: 'text-on-surface-variant' },
  ]

  const barData = [
    { week: 'Minggu 1', sales: 85, cost: 35 },
    { week: 'Minggu 2', sales: 95, cost: 40 },
    { week: 'Minggu 3', sales: 70, cost: 30 },
    { week: 'Minggu 4', sales: 90, cost: 45 },
  ]

  const years = ['2025', '2024', '2023', '2022']
  const months = ['Semua', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

  const filteredExpenseItems = filterMonth === 'Semua' ? expenseItems : expenseItems.filter((item) => item.category.includes(filterMonth) || item.sub.includes(filterMonth))

  const totalPendapatan = 'Rp 45.2M'
  const totalPengeluaran = 'Rp 12.8M'
  const totalLaba = 'Rp 32.400.000'

  return (
    <div className="max-w-md mx-auto px-margin-mobile mt-lg animate-fade-in">
      <section className="mb-lg animate-slide-up delay-100" style={{ animationFillMode: 'backwards' }}>
        <div className="flex justify-between items-end mb-md">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Laporan Laba Rugi</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Periode Operasional Perikanan</p>
          </div>
          {loading && <span className="font-label-md text-label-md text-primary">Memuat...</span>}
        </div>
      </section>

      <section className="mb-lg animate-slide-up delay-100" style={{ animationFillMode: 'backwards' }}>
        <div className="flex flex-col sm:flex-row gap-md mb-lg">
          <select
            className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select
            className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md mb-sm">
          <p className="font-label-md text-label-md text-on-surface-variant">Filter Aktif</p>
          <p className="font-headline-md text-headline-md text-on-surface">{filterYear} — {filterMonth === 'Semua' ? 'Seluruh Tahun' : filterMonth}</p>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-md mb-xl animate-slide-up">
        <div className="col-span-1 bg-surface border border-outline-variant rounded-xl p-md card-hover">
          <div className="flex items-center gap-xs mb-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
            <span className="font-label-md text-label-md text-on-surface-variant">PENDAPATAN</span>
          </div>
          <div className="font-headline-md text-headline-md text-primary">{totalPendapatan}</div>
        </div>
        <div className="col-span-1 bg-surface border border-outline-variant rounded-xl p-md card-hover">
          <div className="flex items-center gap-xs mb-xs">
            <span className="material-symbols-outlined text-on-surface-variant text-[20px]">trending_down</span>
            <span className="font-label-md text-label-md text-on-surface-variant">PENGELUARAN</span>
          </div>
          <div className="font-headline-md text-headline-md text-on-surface-variant">{totalPengeluaran}</div>
        </div>
        <div className="col-span-2 bg-[#E8F5E9] border border-primary-container rounded-xl p-lg relative overflow-hidden">
          <div className="flex flex-col relative z-10">
            <span className="font-label-md text-label-md text-primary mb-xs">TOTAL LABA BERSIH (NET)</span>
            <div className="font-display-financial text-display-financial text-primary">{totalLaba}</div>
            <div className="flex items-center gap-xs mt-sm text-primary font-label-md">
              <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
              <span>Meningkat 12% dari bulan lalu</span>
            </div>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
            <span className="material-symbols-outlined text-[120px] text-primary">payments</span>
          </div>
        </div>
      </section>

      <section className="bg-surface border border-outline-variant rounded-xl p-md mb-xl animate-slide-up delay-200" style={{ animationFillMode: 'backwards' }}>
        <h3 className="font-label-md text-label-md text-on-surface-variant mb-lg uppercase tracking-wider">Perbandingan Penjualan vs Beban</h3>
        <div className="flex items-end justify-between h-48 gap-lg px-md">
          {barData.map((item) => (
            <div key={item.week} className="flex-1 flex flex-col items-center gap-sm h-full justify-end">
              <div className="w-full flex gap-1 items-end h-full">
                <div className="w-1/2 bg-primary-container rounded-t-sm bar-transition" style={{ height: `${item.sales}%` }}></div>
                <div className="w-1/2 bg-secondary rounded-t-sm bar-transition" style={{ height: `${item.cost}%` }}></div>
              </div>
              <span className="font-label-md text-label-md text-on-surface-variant">{item.week}</span>
            </div>
          ))}
        </div>
        <div className="mt-lg flex justify-center gap-xl border-t border-outline-variant pt-md">
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-primary-container rounded-full"></div>
            <span className="font-label-md text-label-md text-on-surface-variant">Penjualan</span>
          </div>
          <div className="flex items-center gap-xs">
            <div className="w-3 h-3 bg-secondary rounded-full"></div>
            <span className="font-label-md text-label-md text-on-surface-variant">Biaya Operasional</span>
          </div>
        </div>
      </section>

      <section className="mb-lg animate-slide-up delay-300" style={{ animationFillMode: 'backwards' }}>
        <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Rincian Pengeluaran (OpEx)</h3>
        <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
          <div className="grid grid-cols-12 bg-secondary p-md border-b-2 border-primary">
            <div className="col-span-6 font-financial-table text-financial-table text-white">Kategori</div>
            <div className="col-span-6 text-right font-financial-table text-financial-table text-white">Nilai</div>
          </div>
          <div className="divide-y divide-outline-variant">
            {filteredExpenseItems.map((item) => (
              <div key={item.category} className="grid grid-cols-12 p-md zebra-row items-center">
                <div className="col-span-6 flex flex-col">
                  <span className="font-body-lg text-body-lg text-on-surface">{item.category}</span>
                  <span className="font-label-md text-label-md text-on-surface-variant uppercase">{item.sub}</span>
                </div>
                <div className="col-span-6 text-right font-headline-md text-headline-md text-on-surface">{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-xl animate-slide-up delay-400" style={{ animationFillMode: 'backwards' }}>
        <div className="flex justify-between items-center mb-md">
          <h3 className="font-headline-md text-headline-md text-on-surface">Status Transaksi Terakhir</h3>
          <span className="text-primary font-label-md text-label-md cursor-pointer hover:underline">Lihat Semua</span>
        </div>
        <div className="space-y-sm">
          {filteredTransactions.map((tx) => (
            <div key={tx.id || tx.name} className="flex justify-between items-center p-md bg-surface border border-outline-variant rounded-lg">
              <div className="flex items-center gap-md">
                <div className={`${tx.iconBg || 'bg-surface-container-high'} ${tx.iconColor || 'text-on-surface-variant'} p-sm rounded-lg`}>
                  <span className="material-symbols-outlined">{tx.icon || 'receipt'}</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg">{tx.name}</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">{tx.date}</p>
                </div>
              </div>
              <div className={`px-sm py-xs ${tx.statusBg || 'bg-surface-container-low'} ${tx.statusText || 'text-on-surface-variant'} font-label-md text-label-md rounded-full uppercase`}>{tx.status}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LaporanLabaRugi
