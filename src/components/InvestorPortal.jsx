import React from 'react'

function InvestorPortal() {
  const payouts = [
    {
      batch: 'Batch SP-2024-08',
      date: 'Oct 24, 2023',
      amount: '+Rp 1,250,000',
      status: 'PAID',
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
      status: 'PENDING',
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

  return (
    <div className="flex-grow px-margin-mobile pt-lg space-y-lg max-w-md mx-auto w-full">
      <section className="grid grid-cols-2 gap-md">
        <div className="col-span-2 p-md bg-primary-container text-on-primary-container rounded-xl flex flex-col justify-between shadow-sm border border-primary/10">
          <div className="flex justify-between items-start mb-base">
            <span className="font-label-md text-label-md opacity-90">Total Investment</span>
            <span className="material-symbols-outlined text-on-primary-container">account_balance_wallet</span>
          </div>
          <div className="font-display-financial text-display-financial">Rp 125,500,000</div>
          <div className="mt-md flex items-center gap-xs">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span className="font-label-md text-label-md">Active in 4 Fishing Batches</span>
          </div>
        </div>
        <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl">
          <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Current ROI %</span>
          <div className="flex items-end gap-xs">
            <span className="font-headline-lg text-headline-lg text-primary">12.4%</span>
            <span className="font-label-md text-label-md text-primary mb-1">↑</span>
          </div>
        </div>
        <div className="p-md bg-surface-container-lowest border border-outline-variant rounded-xl">
          <span className="font-label-md text-label-md text-on-surface-variant block mb-xs">Unpaid Sharing</span>
          <div className="font-headline-lg text-headline-lg text-on-surface">Rp 4.2M</div>
        </div>
      </section>

      <section className="space-y-md">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface">Recent Payouts</h2>
          <button className="text-primary font-label-md text-label-md hover:underline transition-all">View All</button>
        </div>
        <div className="space-y-sm">
          {payouts.map((payout) => (
            <div key={payout.batch} className="flex items-center justify-between p-md bg-surface-container-lowest border border-outline-variant rounded-lg active:scale-[0.98] transition-transform">
              <div className="flex items-center gap-md">
                <div className={`w-10 h-10 rounded-lg ${payout.iconBg} flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${payout.iconColor}`}>{payout.icon}</span>
                </div>
                <div>
                  <p className="font-body-lg text-body-lg font-semibold text-on-surface">{payout.batch}</p>
                  <p className="font-label-md text-label-md text-on-surface-variant">{payout.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-body-lg text-body-lg font-bold ${payout.statusText}`}>{payout.amount}</p>
                <span className={`inline-block px-sm py-[2px] ${payout.statusBg} ${payout.statusText} rounded-full text-[10px] font-bold uppercase`}>{payout.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-md">
        <h2 className="font-headline-md text-headline-md text-on-surface">Investment History</h2>
        <div className="overflow-hidden border border-outline-variant rounded-xl bg-surface-container-lowest">
          <table className="w-full text-left border-collapse">
            <thead className="bg-surface-container-low border-b-2 border-primary">
              <tr>
                <th className="px-md py-sm font-financial-table text-financial-table text-primary">Date</th>
                <th className="px-md py-sm font-financial-table text-financial-table text-primary text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {history.map((row, index) => (
                <tr key={row.date} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'}>
                  <td className="px-md py-md font-body-md text-body-md text-on-surface">{row.date}</td>
                  <td className="px-md py-md font-body-md text-body-md text-on-surface text-right font-bold">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="p-lg bg-surface-container-high rounded-2xl border-2 border-dashed border-outline-variant text-center space-y-md mb-xl">
        <span className="material-symbols-outlined text-primary text-4xl">add_chart</span>
        <div>
          <h3 className="font-headline-md text-headline-md text-on-surface">Expand Your Portfolio</h3>
          <p className="font-body-md text-body-md text-on-surface-variant">Three new sustainable fishery batches are currently open for investment.</p>
        </div>
        <button className="w-full py-md bg-primary text-white font-bold rounded-lg active:scale-95 transition-transform">
          Explore Batches
        </button>
      </section>
    </div>
  )
}

export default InvestorPortal