import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarContext } from '../context/SidebarContext'
import { getMenuItems } from '../utils/roles'
import { getCurrentUser } from '../utils/auth'

function BottomNav() {
  const { collapsed, toggleSidebar } = useContext(SidebarContext)
  const location = useLocation()
  const user = getCurrentUser()
  const role = user?.role || 'Investor'
  const navItems = getMenuItems(role)

  const [showMoreMenu, setShowMoreMenu] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        toggleSidebar()
      }
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [toggleSidebar])

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  if (isMobile) {
    // 1. Ambil 4 menu pertama untuk tampilan utama di bawah
    const mainNavItems = navItems.slice(0, 4)
    // 2. Sisa menu dimasukkan ke dalam pop-up "Lainnya"
    const extraNavItems = navItems.slice(4)

    // Cek apakah menu yang sedang dibuka ada di dalam grup "Lainnya"
    const isExtraActive = extraNavItems.some((item) => item.path === location.pathname)

    return (
      <>
        {/* --- POP-UP MENU "LAINNYA" --- */}
        {showMoreMenu && (
          <div className="fixed inset-0 z-[60] flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-opacity">
            {/* Tutup jika area gelap diklik */}
            <div className="flex-1" onClick={() => setShowMoreMenu(false)} />

            {/* Panel Menu Modal */}
            <div className="bg-surface rounded-t-2xl p-4 border-t border-outline-variant shadow-2xl space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="flex justify-between items-center border-b border-outline-variant pb-2">
                <span className="font-title-md text-on-surface font-semibold">Menu Lainnya</span>
                <button
                  onClick={() => setShowMoreMenu(false)}
                  className="p-1 text-on-surface-variant hover:text-on-surface"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Grid 3 Kolom */}
              <div className="grid grid-cols-3 gap-2">
                {extraNavItems.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setShowMoreMenu(false)}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl transition-all ${
                        isActive
                          ? 'bg-secondary-container text-on-secondary-container font-medium'
                          : 'text-on-surface-variant hover:bg-surface-container-high'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[28px]" data-weight={item.weight}>
                        {item.icon}
                      </span>
                      <span className="font-label-md text-[11px] text-center mt-1 leading-tight truncate w-full">
                        {item.label}
                      </span>
                    </NavLink>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* --- BOTTOM BAR (4 MENU + LAINNYA) --- */}
        <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface border-t border-outline-variant px-xs py-sm">
          {/* Render 4 Menu Utama */}
          {mainNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center w-16 py-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-secondary-container text-on-secondary-container rounded-xl font-semibold'
                    : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl'
                }`
              }
            >
              <span className="material-symbols-outlined" data-weight={item.weight}>
                {item.icon}
              </span>
              <span className="font-label-md text-[11px] mt-0.5 truncate max-w-full">{item.label}</span>
            </NavLink>
          ))}

          {/* Tombol pemicu "Lainnya" (Hanya muncul jika ada sisa menu) */}
          {extraNavItems.length > 0 && (
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className={`flex flex-col items-center justify-center w-16 py-1.5 transition-all duration-200 ${
                showMoreMenu || isExtraActive
                  ? 'bg-secondary-container text-on-secondary-container rounded-xl font-semibold'
                  : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl'
              }`}
            >
              <span className="material-symbols-outlined">more_horiz</span>
              <span className="font-label-md text-[11px] mt-0.5">Lainnya</span>
            </button>
          )}
        </nav>
      </>
    )
  }

  // --- TAMPILAN DESKTOP (SIDEBAR) ---
  const sidebarWidth = collapsed ? 'w-16' : 'w-48'

  return (
    <nav
      className={`fixed left-0 top-0 h-full ${sidebarWidth} z-50 flex flex-col bg-surface border-r border-outline-variant transition-all duration-300 ease-in-out`}
    >
      <div className="flex items-center justify-between px-2 py-sm border-b border-outline-variant">
        <span className="material-symbols-outlined text-primary text-xl">dashboard</span>
        <button
          className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors"
          onClick={toggleSidebar}
        >
          {collapsed ? 'chevron_right' : 'chevron_left'}
        </button>
      </div>
      <div className="flex flex-col flex-1 py-sm overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-3 transition-all ${
                isActive ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high'
              } ${collapsed ? 'justify-center px-2' : 'px-3'}`
            }
          >
            <span className="material-symbols-outlined text-[24px]" data-weight={item.weight}>
              {item.icon}
            </span>
            {!collapsed && <span className="font-label-md text-label-md whitespace-nowrap">{item.label}</span>}
          </NavLink>
        ))}
      </div>
      {!collapsed && (
        <div className="px-3 py-2 border-t border-outline-variant">
          <p className="font-label-md text-label-md text-on-surface-variant truncate">Asy-Syifa Panua</p>
        </div>
      )}
    </nav>
  )
}

export default BottomNav