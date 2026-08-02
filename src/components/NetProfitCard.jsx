import React from 'react'

function NetProfitCard() {
  return (
    <section className="bg-white border border-outline-variant rounded-xl p-md flex flex-col gap-xs card-hover animate-slide-up">
      <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Laba Bersih</span>
      <div className="flex items-end justify-between">
        <span className="font-display-financial text-display-financial text-primary">Rp 60.000.000</span>
        <div className="flex items-center text-primary bg-secondary-container px-2 py-1 rounded-full gap-1">
          <span className="material-symbols-outlined text-[16px]">trending_up</span>
          <span className="font-label-md text-label-md">12%</span>
        </div>
      </div>
    </section>
  )
}

export default NetProfitCard