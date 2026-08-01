import React from 'react'

function PurchasesTable() {
  const purchases = [
    { fisherman: 'Budi Santoso', time: '24 Oct, 08:30', fish: 'Yellowfin Tuna', weight: '45.5 kg', total: 'Rp 4.5M' },
    { fisherman: 'Andi Wijaya', time: '24 Oct, 09:15', fish: 'Skipjack', weight: '120.0 kg', total: 'Rp 8.2M' },
    { fisherman: 'Surya Pratama', time: '23 Oct, 16:45', fish: 'Mackerel', weight: '28.2 kg', total: 'Rp 1.8M' },
    { fisherman: 'Herman Ali', time: '23 Oct, 14:20', fish: 'Grouper', weight: '15.5 kg', total: 'Rp 3.1M' },
  ]

  return (
    <section className="flex flex-col gap-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-md text-headline-md text-on-surface">Recent Purchases</h2>
        <button className="text-primary font-label-md text-label-md hover:underline">View All</button>
      </div>
      <div className="bg-white border border-outline-variant rounded-xl overflow-hidden">
        <div className="overflow-x-auto scroll-hide">
          <table className="w-full text-left border-collapse">
            <thead className="bg-primary border-b-2 border-primary-container">
              <tr>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Fisherman</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Fish Type</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Weight</th>
                <th className="px-md py-3 font-financial-table text-white whitespace-nowrap">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {purchases.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'zebra-row' : ''}>
                  <td className="px-md py-4">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md font-bold text-on-surface">{row.fisherman}</span>
                      <span className="font-label-md text-label-md text-on-surface-variant">{row.time}</span>
                    </div>
                  </td>
                  <td className="px-md py-4 font-body-md text-body-md">{row.fish}</td>
                  <td className="px-md py-4 font-body-md text-body-md">{row.weight}</td>
                  <td className="px-md py-4 font-body-md text-body-md font-bold text-primary">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default PurchasesTable