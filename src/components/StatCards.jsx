import React from 'react'

function StatCards() {
  const cards = [
    {
      icon: 'payments',
      iconBg: 'bg-primary-container/20',
      iconColor: 'text-primary',
      label: 'Total Penjualan',
      value: 'Rp 150M',
    },
    {
      icon: 'shopping_bag',
      iconBg: 'bg-surface-container-high',
      iconColor: 'text-on-surface-variant',
      label: 'Total Pembelian',
      value: 'Rp 90M',
    },
  ]

  return (
    <section className="grid grid-cols-2 gap-md">
      {cards.map((card, index) => (
        <div key={card.label} className={`bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-sm card-hover animate-slide-up ${index === 0 ? 'delay-100' : 'delay-200'}`} style={{ animationFillMode: 'backwards' }}>
          <div className="flex items-center justify-between">
            <span className={`material-symbols-outlined ${card.iconColor} ${card.iconBg} p-2 rounded-lg`}>{card.icon}</span>
          </div>
          <div>
            <span className="font-label-md text-label-md text-on-surface-variant">{card.label}</span>
            <p className="font-headline-md text-headline-md text-on-surface">{card.value}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default StatCards