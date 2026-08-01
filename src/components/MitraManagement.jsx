import React, { useState } from 'react'

function MitraManagement() {
  const [activeTab, setActiveTab] = useState('nelayan')

  const nelayanData = [
    {
      name: 'Haji Sulaiman',
      phone: '+62 812 3456 7890',
      icon: 'anchor',
      status: 'Active',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
    {
      name: 'UD Maritim Jaya',
      phone: '+62 811 9988 7766',
      icon: 'directions_boat',
      status: 'Inactive',
      statusBg: 'bg-[#F0F0F0]',
      statusText: 'text-[#6C757D]',
      statusBorder: 'border-[#6C757D]/20',
    },
    {
      name: 'Koperasi Nelayan Panua',
      phone: '+62 813 1122 3344',
      icon: 'account_balance_wallet',
      status: 'Active',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
  ]

  const vendorData = [
    {
      name: 'FreshFish Jakarta',
      phone: '+62 21 788 9900',
      icon: 'storefront',
      status: 'Active',
      statusBg: 'bg-[#E8F5E9]',
      statusText: 'text-[#28A745]',
      statusBorder: 'border-[#28A745]/20',
    },
  ]

  const currentData = activeTab === 'nelayan' ? nelayanData : vendorData

  return (
    <div className="px-margin-mobile pt-md">
      <div className="mb-lg">
        <div className="flex flex-col gap-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface">Mitra Management</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Manage your network of fishermen and vendors.</p>
        </div>
      </div>

      <div className="sticky top-[72px] bg-background pt-xs pb-md z-30 space-y-md">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">search</span>
          <input
            className="w-full pl-[48px] pr-md py-md bg-surface-container-lowest border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary font-body-md transition-all outline-none"
            placeholder="Search by name or contact..."
            type="text"
          />
        </div>
        <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant">
          <button
            className={`flex-1 py-sm px-md rounded-lg font-label-md transition-all ${activeTab === 'nelayan' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            onClick={() => setActiveTab('nelayan')}
          >
            Nelayan (Suppliers)
          </button>
          <button
            className={`flex-1 py-sm px-md rounded-lg font-label-md transition-all ${activeTab === 'vendor' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
            onClick={() => setActiveTab('vendor')}
          >
            Vendor (Buyers)
          </button>
        </div>
      </div>

      <div className="space-y-md">
        {currentData.map((mitra) => (
          <div key={mitra.name} className="bg-surface-container-lowest border border-outline-variant rounded-xl p-md flex flex-col gap-md">
            <div className="flex justify-between items-start">
              <div className="flex gap-md items-center">
                <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[28px]">{mitra.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{mitra.name}</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant flex items-center gap-xs">
                    <span className="material-symbols-outlined text-[16px]">call</span>
                    {mitra.phone}
                  </p>
                </div>
              </div>
              <span className={`px-sm py-xs ${mitra.statusBg} ${mitra.statusText} rounded-lg font-label-md border ${mitra.statusBorder}`}>
                {mitra.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-sm border-t border-outline-variant pt-md">
              <button className="flex items-center justify-center gap-xs py-sm border border-primary text-primary rounded-lg font-label-md hover:bg-primary-container/10 transition-colors active:scale-95">
                <span className="material-symbols-outlined text-[18px]">edit</span>
                Edit
              </button>
              <button className="flex items-center justify-center gap-xs py-sm bg-primary text-on-primary rounded-lg font-label-md hover:opacity-90 transition-opacity active:scale-95 shadow-sm">
                <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                Transactions
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MitraManagement