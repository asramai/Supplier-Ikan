import React, { useState } from 'react'

function InvestorPortal() {
  const [activeTab, setActiveTab] = useState('tambah')
  const [monthFilter, setMonthFilter] = useState('Semua')
  const [investor, setInvestor] = useState('')
  const [amount, setAmount] = useState('')
  const [transferDate, setTransferDate] = useState('')
  const [proofFile, setProofFile] = useState(null)
  const [proofPreview, setProofPreview] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  const investorList = [
    { name: 'Siti Yusufina', email: 'siti.y@investor.com' },
    { name: 'Ahmad Fauzi', email: 'ahmad.f@investor.com' },
    { name: 'Budi Santoso', email: 'budi.s@investor.com' },
    { name: 'Rahmat Panua', email: 'rahmat.p@investor.com' },
  ]

  const investmentHistory = [
    { investor: 'Siti Yusufina', amount: 'Rp 25,000,000', date: '12 Okt 2023', batch: 'Batch SP-2024-08' },
    { investor: 'Ahmad Fauzi', amount: 'Rp 50,000,000', date: '05 Sep 2023', batch: 'Batch SP-2024-07' },
    { investor: 'Budi Santoso', amount: 'Rp 15,000,000', date: '20 Agt 2023', batch: 'Batch SP-2024-06' },
    { investor: 'Rahmat Panua', amount: 'Rp 35,500,000', date: '14 Jul 2023', batch: 'Batch SP-2024-05' },
  ]

  const totalDana = investmentHistory.reduce((sum, row) => {
    const num = parseInt(row.amount.replace(/[^\d]/g, ''), 10)
    return sum + num
  }, 0)

  const months = ['Semua', 'Oktober 2023', 'September 2023', 'Agustus 2023', 'Juli 2023']
  const filteredHistory = monthFilter === 'Semua' ? investmentHistory : investmentHistory.filter((row) => row.date.includes(monthFilter.split(' ').slice(1).join(' ')))

  const handleProofChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setProofFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProofPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!investor || !amount || !transferDate) return
    setShowSuccess(true)
    setInvestor('')
    setAmount('')
    setTransferDate('')
    setProofFile(null)
    setProofPreview('')
    setTimeout(() => setShowSuccess(false), 3000)
  }

  return (
    <div className="flex-grow px-margin-mobile pt-lg space-y-lg max-w-md mx-auto w-full animate-fade-in">
      <section className="grid grid-cols-2 gap-md">
        <div className="col-span-2 p-md bg-primary-container text-on-primary-container rounded-xl flex flex-col justify-between shadow-sm border border-primary/10 card-hover">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-md text-label-md opacity-90">Total Dana Investasi</span>
            <span className="material-symbols-outlined text-on-primary-container">account_balance_wallet</span>
          </div>
          <div className="font-display-financial text-display-financial">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalDana)}</div>
          <div className="mt-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-md text-label-md">{investmentHistory.length} Transaksi</span>
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
          Tambah Investasi
        </button>
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'riwayat' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('riwayat')}
        >
          Riwayat Investasi
        </button>
      </div>

      {activeTab === 'tambah' ? (
        <section className="space-y-md animate-fade-in">
          <form className="space-y-md" onSubmit={handleSubmit}>
            <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md card-hover">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-md">Suntikan Dana Investor</h3>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Investor</label>
                <div className="relative">
                  <select
                    className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                    value={investor}
                    onChange={(e) => setInvestor(e.target.value)}
                  >
                    <option value="">Pilih Investor...</option>
                    {investorList.map((inv) => (
                      <option key={inv.name} value={inv.name}>{inv.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
                </div>
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nominal Transfer (Rp)</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Tanggal Transfer</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  type="date"
                  value={transferDate}
                  onChange={(e) => setTransferDate(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Bukti Transfer</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                    {proofPreview ? (
                      <img src={proofPreview} alt="Bukti Transfer" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[28px]">attach_file</span>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <input
                      accept="image/*,.pdf"
                      className="hidden"
                      type="file"
                      onChange={handleProofChange}
                    />
                    <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Pilih File
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
              >
                Konfirmasi Suntikan Dana
              </button>
            </div>
          </form>

          {showSuccess && (
            <div className="bg-[#E8F5E9] text-[#28A745] px-4 py-2 rounded-lg font-body-md text-body-md text-center animate-fade-in">
              Suntikan dana berhasil dicatat
            </div>
          )}
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
                    <th className="px-md py-sm font-financial-table text-financial-table text-primary">Investor</th>
                    <th className="px-md py-sm font-financial-table text-financial-table text-primary text-right">Jumlah</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant">
                  {filteredHistory.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-md py-8 text-center font-body-md text-body-md text-on-surface-variant">Tidak ada riwayat ditemukan</td>
                    </tr>
                  ) : (
                    filteredHistory.map((row, index) => (
                      <tr key={row.date + index} className="bg-white active:bg-surface-container-high transition-colors">
                        <td className="px-md py-md font-body-md text-body-md text-on-surface">{row.date}</td>
                        <td className="px-md py-md font-body-md text-body-md text-on-surface">{row.investor}</td>
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