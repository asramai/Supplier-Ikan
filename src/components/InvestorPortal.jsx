import React, { useState } from 'react'

function InvestorPortal() {
  const [activeTab, setActiveTab] = useState('tambah')
  const [monthFilter, setMonthFilter] = useState('Semua')

  const payouts = [
    {
      batch: 'Batch SP-2024-08',
      date: 'Oct 24, 2023',
      amount: '+Rp 1,250,000',
      status: 'DIBAYAR',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      iconBg: 'bg-[#E8F5E9]',
      iconColor: 'text-[#28A745]',
      icon: 'payments',
    },
    {
      batch: 'Batch SP-2024-09',
      date: 'Expected Nov 12',
      amount: 'Rp 840,000',
      status: 'MENUNGGU',
      statusBg: 'bg-[#F0F0F0]',
      statusText: 'text-[#6C757D]',
      iconBg: 'bg-[#F0F0F0]',
      iconColor: 'text-[#6C757D]',
      icon: 'pending_actions',
    },
  ]

  const history = [
    { date: 'Oct 12, 2023', amount: 'Rp 25,000,000' },
    { date: 'Sep 05, 2023', amount: 'Rp 50,000,000' },
    { date: 'Aug 20, 2023', amount: 'Rp 15,000,000' },
    { date: 'Jul 14, 2023', amount: 'Rp 35,500,000' },
  ]

  const months = ['Semua', 'Oktober 2023', 'September 2023', 'Agustus 2023', 'Juli 2023']
  const filteredHistory = monthFilter === 'Semua' ? history : history.filter((row) => row.date.includes(monthFilter.split(' ').slice(1).join(' ')))

  return (
    <div className="flex-grow px-margin-mobile pt-lg space-y-lg max-w-md mx-auto w-full animate-fade-in">
      <section className="grid grid-cols-2 gap-md">
        <div className="col-span-2 p-md bg-primary-container text-on-primary-container rounded-xl flex flex-col justify-between shadow-sm border border-primary/10 card-hover">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-md text-label-md opacity-90">Total Investasi</span>
            <span className="material-symbols-outlined text-on-primary-container">account_balance_wallet</span>
          </div>
          <div className="font-display-financial text-display-financial">Rp 125,500,000</div>
          <div className="mt-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-md text-label-md">Aktif di 4 Batch Penangkapan</span>
          </div>
        </div>
        <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl card-hover">
          <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">ROI Saat Ini %</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-lg text-headline-lg text-primary">12.4%</span>
            <span className="font-label-md text-label-md text-primary mb-1">↑</span>
          </div>
        </div>
        <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl card-hover">
          <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Bagian Belum Dibayar</span>
          <div className="font-headline-lg text-headline-lg text-on-surface">Rp 4.2M</div>
        </div>
      </section>

      <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant">
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'tambah' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('tambah')}
        >
          Tambah Transaksi Investasi
        </button>
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'riwayat' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('riwayat')}
        >
          Riwayat Transaksi
        </button>
      </div>

      {activeTab === 'tambah' ? (
        <section className="space-y-md animate-fade-in">
          <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Investasi Baru</h3>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Pilih Batch</label>
                <select className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                  <option value="">Pilih Batch Penangkapan...</option>
                  <option value="batch-1">Batch SP-2024-10 (Oktober)</option>
                  <option value="batch-2">Batch SP-2024-11 (November)</option>
                  <option value="batch-3">Batch SP-2024-12 (Desember)</option>
                </select>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Jumlah Investasi (Rp)</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0"
                  type="number"
                  min="0"
                />
              </div>
              <button className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform">
                Konfirmasi Investasi
              </button>
            </div>
          </div>
        </section>
      ) : (
        <section className="space-y-md animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-md">
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input
                className="w-full pl-10 pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none font-body-md transition-all"
                placeholder="Cari berdasarkan tanggal..."
                type="text"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              />
            </div>
            <select
              className="bg-surface-container-lowest border border-outline-variant rounded-lg px-md py-md font-body-md text-on-surface focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
            >
              {months.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-low border-b-2 border-primary">
                  <tr>
                    <th className="px-md py-sm font-financial-table text-financial-table text-primary">Tanggal</th>
                    <th className="px-md py-sm font-financial-table text-financial-table text-primary text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="px-md py-8 text-center font-body-md text-body-md text-on-surface-variant">Tidak ada riwayat ditemukan</td>
                    </tr>
                  ) : (
                    filteredHistory.map((row) => (
                      <tr key={row.date} className="active:bg-surface-container-high transition-colors">
                        <td className="px-md py-md font-body-md text-body-md text-on-surface">{row.date}</td>
                        <td className="px-md py-md font-body-md text-body-md text-on-surface text-right font-bold">{row.amount}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default InvestorPortal