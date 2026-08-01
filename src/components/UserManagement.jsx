import React, { useState } from 'react'

function UserManagement() {
  const [activeFilter, setActiveFilter] = useState('Semua')

  const users = [
    {
      name: 'Ahmad Al-Fatih',
      email: 'ahmad.fatih@panua.com',
      role: 'Admin',
      roleBg: 'bg-secondary-container',
      roleText: 'text-on-secondary-container',
      status: 'Aktif',
      statusBg: 'bg-green-100',
      statusText: 'text-green-700',
      initials: 'AA',
      avatarBg: 'bg-primary-container',
      avatarText: 'text-on-primary-container',
    },
    {
      name: 'Siti Yusufina',
      email: 'siti.y@investor.com',
      role: 'Investor',
      roleBg: 'bg-primary-container/20',
      roleText: 'text-primary',
      status: 'Aktif',
      statusBg: 'bg-green-100',
      statusText: 'text-green-700',
      initials: 'SY',
      avatarBg: 'bg-tertiary-container',
      avatarText: 'text-on-tertiary-container',
    },
    {
      name: 'Rahmat Panua',
      email: 'rahmat.p@ops.id',
      role: 'Operator',
      roleBg: 'bg-outline-variant/30',
      roleText: 'text-on-surface-variant',
      status: 'Non-aktif',
      statusBg: 'bg-error-container',
      statusText: 'text-error',
      initials: 'RP',
      avatarBg: 'bg-surface-container-highest',
      avatarText: 'text-on-surface-variant',
    },
    {
      name: 'Haji Dahlan',
      email: 'haji.dahlan@owner.com',
      role: 'Owner',
      roleBg: 'bg-surface-dim',
      roleText: 'text-on-surface',
      status: 'Aktif',
      statusBg: 'bg-green-100',
      statusText: 'text-green-700',
      initials: 'HD',
      avatarBg: 'bg-secondary',
      avatarText: 'text-white',
    },
  ]

  const filters = ['Semua', 'Admin', 'Owner', 'Operator', 'Investor']

  const filteredUsers = activeFilter === 'Semua'
    ? users
    : users.filter((u) => u.role === activeFilter)

  return (
    <div className="px-margin-mobile py-lg max-w-4xl mx-auto">
      <section className="space-y-lg mb-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline">search</span>
          </div>
          <input
            className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-lg text-body-lg outline-none"
            placeholder="Cari nama atau email..."
            type="text"
          />
        </div>
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container'}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-md">
        {filteredUsers.map((user) => (
          <div key={user.name} className="bg-surface border border-outline-variant rounded-xl p-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-md group hover:border-primary transition-colors">
            <div className="flex items-center gap-md">
              <div className={`w-12 h-12 rounded-full ${user.avatarBg} ${user.avatarText} flex items-center justify-center font-bold text-headline-md`}>
                {user.initials}
              </div>
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface">{user.name}</h3>
                <p className="font-body-md text-body-md text-outline">{user.email}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className={`px-3 py-0.5 rounded-full ${user.roleBg} ${user.roleText} font-label-md text-label-md`}>{user.role}</span>
                  <span className={`px-3 py-0.5 rounded-full ${user.statusBg} ${user.statusText} font-label-md text-label-md flex items-center gap-1`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {user.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-sm self-end sm:self-center">
              <button className="p-2 text-outline hover:text-primary hover:bg-primary-container/10 rounded-lg transition-all" title="Edit">
                <span className="material-symbols-outlined">edit</span>
              </button>
              <button className="p-2 text-outline hover:text-error hover:bg-error-container/10 rounded-lg transition-all" title="Hapus">
                <span className="material-symbols-outlined">delete</span>
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default UserManagement