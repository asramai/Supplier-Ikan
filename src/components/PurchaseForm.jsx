import React, { useState } from 'react'

function PurchaseForm() {
  const [fishType, setFishType] = useState('')
  const [weight, setWeight] = useState('')
  const [price, setPrice] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('paid')
  const [formData, setFormData] = useState({
    fisherman: '',
    date: '',
    boat: '',
  })

  const fishOptions = ['Cakalang', 'Tongkol', 'Tuna Yellowfin', 'Layang', 'Kerapu']

  const totalWeight = parseFloat(weight) || 0
  const totalPrice = totalWeight * (parseFloat(price) || 0)

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Purchase submitted:', { fishType, weight, price, totalPrice, paymentStatus, ...formData })
  }

  return (
    <div className="pt-24 px-margin-mobile max-w-2xl mx-auto">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-background">Input Pembelian Ikan</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Catat transaksi masuk hasil tangkapan nelayan hari ini.</p>
      </div>

      <form className="space-y-lg" onSubmit={handleSubmit}>
        <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Nelayan</label>
            <div className="relative">
              <select
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary appearance-none"
                value={formData.fisherman}
                onChange={(e) => setFormData({ ...formData, fisherman: e.target.value })}
              >
                <option value="">Pilih Nelayan...</option>
                <option value="Abdullah Hasan">Abdullah Hasan</option>
                <option value="Syamsul Bahri">Syamsul Bahri</option>
                <option value="Udin Sedunia">Udin Sedunia</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant">expand_more</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Tanggal</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Kapal / Boat</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Nama Kapal"
                type="text"
                value={formData.boat}
                onChange={(e) => setFormData({ ...formData, boat: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-md space-y-md">
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant uppercase">Jenis Ikan</label>
            <div className="relative">
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary"
                list="fish-list"
                placeholder="Cari Jenis Ikan..."
                type="text"
                value={fishType}
                onChange={(e) => setFishType(e.target.value)}
              />
              <datalist id="fish-list">
                {fishOptions.map((opt) => (
                  <option key={opt} value={opt} />
                ))}
              </datalist>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Berat (kg)</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary"
                id="input-weight"
                placeholder="0.0"
                type="number"
                step="0.1"
                min="0"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase">Harga per kg (Rp)</label>
              <input
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary"
                id="input-price"
                placeholder="0"
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="bg-primary-container/10 border border-primary-container rounded-xl p-lg">
          <div className="flex justify-between items-center mb-sm">
            <span className="font-label-md text-label-md text-on-primary-container uppercase">Estimasi Total</span>
            <span className="bg-primary-container text-on-primary-container px-2 py-0.5 rounded text-[10px] font-bold uppercase">Live</span>
          </div>
          <div className="flex flex-col gap-xs">
            <div className="flex justify-between">
              <span className="font-body-md text-body-md text-on-surface-variant">Total Berat</span>
              <span className="font-body-lg text-body-lg font-bold text-on-surface">{totalWeight.toLocaleString('id-ID')} kg</span>
            </div>
            <div className="h-[1px] bg-outline-variant/30 my-xs"></div>
            <div className="flex justify-between items-end">
              <span className="font-body-md text-body-md text-on-surface-variant pb-1">Total Pembayaran</span>
              <span className={`font-display-financial text-display-financial ${paymentStatus === 'debt' ? 'text-error' : 'text-primary'}`}>
                {formatRupiah(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-outline-variant rounded-xl p-md">
          <label className="font-label-md text-label-md text-on-surface-variant uppercase block mb-md">Status Pembayaran</label>
          <div className="grid grid-cols-2 gap-sm p-1 bg-surface-container rounded-lg">
            <button
              type="button"
              className={`flex items-center justify-center gap-xs py-md rounded-lg font-bold transition-all duration-200 ${paymentStatus === 'paid' ? 'bg-white shadow-sm text-primary' : 'text-on-surface-variant'}`}
              onClick={() => setPaymentStatus('paid')}
            >
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              Lunas
            </button>
            <button
              type="button"
              className={`flex items-center justify-center gap-xs py-md rounded-lg font-bold transition-all duration-200 ${paymentStatus === 'debt' ? 'bg-white shadow-sm text-error' : 'text-on-surface-variant'}`}
              onClick={() => setPaymentStatus('debt')}
            >
              <span className="material-symbols-outlined text-[20px]">schedule</span>
              Tempo / Utang
            </button>
          </div>
        </div>

        <button type="submit" className="w-full bg-primary-container text-white py-lg rounded-xl font-headline-md text-headline-md font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-sm active:scale-[0.98] transition-transform">
          <span className="material-symbols-outlined">print</span>
          Simpan &amp; Cetak Struk
        </button>
      </form>
    </div>
  )
}

export default PurchaseForm