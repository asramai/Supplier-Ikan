import React, { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase'

export default function PurchasesTable() {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchPurchases = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching purchases:', error.message)
    } else {
      setPurchases(data || [])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchPurchases()
  }, [])

  if (loading) {
    return <p className="text-center py-6 text-slate-500">Memuat data dari Supabase...</p>
  }

  if (purchases.length === 0) {
    return (
      <div className="text-center py-12 text-slate-400 bg-white rounded-2xl border border-slate-200">
        <p className="text-base font-medium text-slate-600">Belum ada riwayat transaksi</p>
        <p className="text-sm mt-1">Silakan input transaksi pertama Anda di tab 'Tambah Transaksi Pembelian'.</p>
      </div>
    )
  }

  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-slate-700 border-b">
          <tr>
            <th className="p-3">ID</th>
            <th className="p-3">Nelayan</th>
            <th className="p-3">Ikan</th>
            <th className="p-3">Berat</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((item) => (
            <tr key={item.id} className="border-b hover:bg-slate-50">
              <td className="p-3 text-xs text-slate-400">#{item.id}</td>
              <td className="p-3 font-medium text-slate-800">{item.supplier_name}</td>
              <td className="p-3">{item.fish_name}</td>
              <td className="p-3">{item.weight_kg} kg</td>
              <td className="p-3 font-semibold text-emerald-600">
                Rp {Number(item.total_price).toLocaleString('id-ID')}
              </td>
              <td className="p-3">
                <span className="bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-md text-xs font-medium">
                  {item.status || 'Lunas'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}