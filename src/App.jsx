import React, { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  MdDashboard,
  MdShoppingCart,
  MdSell,
  MdBarChart,
  MdGridMore,
  MdClose,
  MdSetMeal,
  MdPeople,
  MdSupervisedUserAccess,
  MdInventory,
  MdTrendingUp,
  MdBusiness
} from 'react-icons/md'

export default function BottomNav() {
  const [showMoreMenu, setShowMoreMenu] = useState(false)
  const location = useLocation()

  // Menu Utama yang tampil langsung di Bottom Bar (Max 4-5)
  const mainNavItems = [
    { label: 'Home', path: '/', icon: MdDashboard },
    { label: 'Beli', path: '/beli', icon: MdShoppingCart },
    { label: 'Jual', path: '/jual', icon: MdSell },
    { label: 'Laporan', path: '/laporan', icon: MdBarChart },
  ]

  // Menu Tambahan yang dimasukkan ke dalam Pop-up "Lainnya"
  const extraNavItems = [
    { label: 'Data Ikan', path: '/data', icon: MdSetMeal },
    { label: 'Mitra Nelayan', path: '/mitra', icon: MdPeople },
    { label: 'Master User', path: '/users', icon: MdSupervisedUserAccess },
    { label: 'Inventaris', path: '/inventory', icon: MdInventory },
    { label: 'Investasi', path: '/invest', icon: MdTrendingUp },
    { label: 'Identitas PT', path: '/identitas', icon: MdBusiness },
  ]

  // Cek apakah menu yang aktif ada di dalam menu "Lainnya"
  const isExtraActive = extraNavItems.some((item) => item.path === location.pathname)

  return (
    <>
      {/* --- POP-UP MENU "LAINNYA" --- */}
      {showMoreMenu && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm animate-fade-in lg:hidden">
          {/* Overlay Click-to-Close */}
          <div className="flex-1" onClick={() => setShowMoreMenu(false)} />

          {/* Panel Menu Grid */}
          <div className="bg-surface rounded-t-2xl p-5 border-t border-outline-variant shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-outline-variant pb-3">
              <h3 className="font-semibold text-base text-on-surface">Menu Lainnya</h3>
              <button
                onClick={() => setShowMoreMenu(false)}
                className="p-1 rounded-full text-on-surface-variant hover:bg-surface-variant"
              >
                <MdClose size={24} />
              </button>
            </div>

            {/* Grid 3 Kolom */}
            <div className="grid grid-cols-3 gap-3">
              {extraNavItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setShowMoreMenu(false)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-variant'
                    }`}
                  >
                    <Icon size={26} className="mb-1" />
                    <span className="text-xs text-center leading-tight">{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- BOTTOM NAVIGATION BAR --- */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant px-2 py-2 lg:hidden shadow-lg">
        <div className="flex justify-around items-center">
          {/* Loop Menu Utama */}
          {mainNavItems.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center w-full py-1 rounded-lg transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`
                }
              >
                <Icon size={24} />
                <span className="text-[11px] mt-0.5">{item.label}</span>
              </NavLink>
            )
          })}

          {/* Tombol Menu "Lainnya" */}
          <button
            onClick={() => setShowMoreMenu(!showMoreMenu)}
            className={`flex flex-col items-center justify-center w-full py-1 rounded-lg transition-colors ${
              showMoreMenu || isExtraActive
                ? 'text-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <MdGridMore size={24} />
            <span className="text-[11px] mt-0.5">Lainnya</span>
          </button>
        </div>
      </nav>
    </>
  )
}