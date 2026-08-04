import React, { useState } from 'react'
import { supabase } from '../utils/supabase'

export default function PurchaseForm({ onSuccess }) {
  const [supplierName, setSupplierName] = useState('')
  const [fishName, setFishName] = useState('')
  const [weightKg, setWeightKg] = useState('')
  const [totalPrice, setTotalPrice] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!supplierName || !fishName || !weightKg || !totalPrice) {
      alert('Mohon isi semua bidang!')
      return
    }

    setIsSubmitting(true)
    const { error } = await supabase.from('purchases').insert([
      {
        supplier_name: supplierName,
        fish_name: fishName,
        weight_kg: parseFloat(weightKg),
        total_price: parseFloat(totalPrice),
        status: 'Lunas'
      }
    ])

    if (error) {
      alert('Gagal menyimpan: ' + error.message)
    } else {
      alert('Transaksi berhasil disimpan!')
      setSupplierName('')
      setFishName('')
      setWeightKg('')
      setTotalPrice('')
      if (onSuccess) onSuccess()
    }
    setIsSubmitting(false)
  }

  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm max-w-2xl mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">Form Input Pembelian</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Nama Nelayan / Pemasok</label>
          <input
            type="text"
            placeholder="Contoh: Pak Herman"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Jenis Ikan</label>
          <input
            type="text"
            placeholder="Contoh: Tuna Yellowfin"
            value={fishName}
            onChange={(e) => setFishName(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Berat (Kg)</label>
          <input
            type="number"
            placeholder="0"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Total Harga (Rp)</label>
          <input
            type="number"
            placeholder="0"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        <div className="md:col-span-2 mt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-xl transition-all"
          >
            {isSubmitting ? 'Menyimpan...' : '+ Simpan Transaksi Pembelian'}
          </button>
        </div>
      </form>
    </div>
  )
}