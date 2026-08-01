import React from 'react'

function StatusChips() {
  const statuses = [
    { label: 'Processing (12)', bgColor: 'bg-[#E8F5E9]', textColor: 'text-[#28A745]', dotColor: 'bg-[#28A745]' },
    { label: 'Ready (5)', bgColor: 'bg-[#F0F0F0]', textColor: 'text-[#6C757D]', dotColor: 'bg-[#6C757D]' },
    { label: 'Pending Payment (2)', bgColor: 'bg-[#FDEDEC]', textColor: 'text-[#DC3545]', dotColor: 'bg-[#DC3545]' },
  ]

  return (
    <section className="flex flex-col gap-sm">
      <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">Batch Status</h3>
      <div className="flex gap-sm overflow-x-auto scroll-hide pb-2">
        {statuses.map((status) => (
          <div key={status.label} className={`${status.bgColor} ${status.textColor} px-4 py-2 rounded-full whitespace-nowrap flex items-center gap-1`}>
            <span className={`w-2 h-2 rounded-full ${status.dotColor}`}></span>
            <span className="font-label-md text-label-md">{status.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default StatusChips