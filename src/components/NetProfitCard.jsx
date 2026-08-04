import React, { useState, useEffect } from 'react'
import { getTransactions } from '../services/supabaseService'

function NetProfitCard() {
  const [netProfit, setNetProfit] = useState('Rp 0')
  const [trend, setTrend] = useState('0%')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [beli, jual] = await Promise.all([
          getTransactions('beli'),
          getTransactions('jual'),
        ])
        const totalBeli = beli.reduce((sum, t) => sum + (parseFloat(t.total_amount) || 0), 0)
        const totalJual = jual.reduce((sum, t) => sum + (parseFloat(t.total_amount) || 0), 0)
        const profit = totalJual - totalBeli
        setNetProfit(`Rp ${profit.toLocaleString('id-ID')}`)
        const pct = totalBeli > 0 ? Math.round((profit / totalBeli) * 100) : 0
        setTrend(`${pct >= 0 ? '+' : ''}${pct}%`)
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  if (loading) {
    return (
      <section className="bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-xs card-hover animate-slide-up">
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Laba Bersih</span>
        <div className="flex items-end justify-between">
          <span className="font-display-financial text-display-financial text-primary">-</span>
          <div className="flex items-center text-primary bg-secondary-container px-2 py-1 rounded-full gap-1">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-md text-label-md">-</span>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-xs card-hover animate-slide-up">
      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Laba Bersih</span>
      <div className="flex items-end justify-between">
        <span className="font-display-financial text-display-financial text-primary">{netProfit}</span>
        <div className="flex items-center text-primary bg-secondary-container px-2 py-1 rounded-full gap-1">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          <span className="font-label-md text-label-md">{trend}</span>
        </div>
      </div>
    </section>
  )
}

export default NetProfitCard
