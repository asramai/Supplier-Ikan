import React, { useState, useEffect } from 'react'
import { getTransactions } from '../services/supabaseService'

function StatCards() {
  const [cards, setCards] = useState([
    { icon: 'payments', iconBg: 'bg-primary-container/20', iconColor: 'text-primary', label: 'Total Penjualan', value: 'Rp 0' },
    { icon: 'shopping_bag', iconBg: 'bg-surface-container-high', iconColor: 'text-on-surface-variant', label: 'Total Pembelian', value: 'Rp 0' },
  ])
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
        setCards((prev) => [
          { ...prev[0], value: `Rp ${totalJual.toLocaleString('id-ID')}` },
          { ...prev[1], value: `Rp ${totalBeli.toLocaleString('id-ID')}` },
        ])
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="grid grid-cols-2 gap-md">
      {cards.map((card, index) => (
        <div key={card.label} className={`bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-sm card-hover animate-slide-up ${index === 0 ? 'delay-100' : 'delay-200'}`} style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between">
            <span className={`material-symbols-outlined ${card.iconColor} ${card.iconBg} p-2 rounded-lg`}>{card.icon}</span>
          </div>
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant">{card.label}</span>
            <p className="font-headline-md text-headline-md text-on-surface">{loading ? '...' : card.value}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default StatCards
