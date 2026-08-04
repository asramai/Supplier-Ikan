import React, { useState, useEffect } from 'react'
import { getTransactions } from '../services/supabaseService'

function StatusChips() {
  const [statuses, setStatuses] = useState([
    { label: 'Proses (0)', bgColor: 'bg-[#E8F5E9]', textColor: 'text-[#28A745]', dotColor: 'bg-[#28A745]' },
    { label: 'Siap (0)', bgColor: 'bg-[#F0F0F0]', textColor: 'text-[#6C757D]', dotColor: 'bg-[#6C757D]' },
    { label: 'Menunggu Pembayaran (0)', bgColor: 'bg-[#FDEDEC]', textColor: 'text-[#DC3545]', dotColor: 'bg-[#DC3545]' },
  ])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getTransactions()
        const counts = { proses: 0, siap: 0, menunggu: 0 }
        data.forEach((t) => {
          const s = (t.status || '').toLowerCase()
          if (s === 'selesai') counts.proses++
          else if (s === 'pending') counts.menunggu++
          else counts.siap++
        })
        setStatuses([
          { label: `Proses (${counts.proses})`, bgColor: 'bg-[#E8F5E9]', textColor: 'text-[#28A745]', dotColor: 'bg-[#28A745]' },
          { label: `Siap (${counts.siap})`, bgColor: 'bg-[#F0F0F0]', textColor: 'text-[#6C757D]', dotColor: 'bg-[#6C757D]' },
          { label: `Menunggu Pembayaran (${counts.menunggu})`, bgColor: 'bg-[#FDEDEC]', textColor: 'text-[#DC3545]', dotColor: 'bg-[#DC3545]' },
        ])
      } catch {}
      setLoading(false)
    }
    load()
  }, [])

  return (
    <section className="flex flex-col gap-sm animate-slide-up delay-400" style={{ animationFillMode: 'backwards' }}>
      <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Status Batch</h3>
      <div className="flex gap-sm overflow-x-auto scroll-hide pb-2">
        {statuses.map((status) => (
          <div key={status.label} className={`${status.bgColor} ${status.textColor} px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1`}>
            <span className={`w-2 h-2 rounded-full ${status.dotColor}`}></span>
            <span className="font-label-md text-label-md">{loading ? '...' : status.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatusChips
