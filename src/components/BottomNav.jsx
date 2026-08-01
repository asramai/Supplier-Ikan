import React from 'react'
import { NavLink } from 'react-router-dom'

function BottomNav() {
  const navItems = [
    { icon: 'dashboard', label: 'Home', path: '/', weight: 'fill' },
    { icon: 'database', label: 'Data', path: '/data', weight: undefined },
    { icon: 'shopping_cart', label: 'Beli', path: '/beli', weight: 'fill' },
    { icon: 'payments', label: 'Jual', path: '/jual', weight: undefined },
    { icon: 'assessment', label: 'Laporan', path: '/laporan', weight: undefined },
    { icon: 'groups', label: 'Mitra', path: '/mitra', weight: 'fill' },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface border-t border-outline-variant px-xs py-sm">
      {navItems.map((item) => (
        <NavLink
          key={item.label}
          to={item.path}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center px-3 py-1 transition-all ${isActive ? 'bg-secondary-container text-on-secondary-container scale-95 duration-200' : 'text-on-surface-variant hover:bg-surface-container-high'}`
          }
        >
          <span className="material-symbols-outlined" data-weight={item.weight}>{item.icon}</span>
          <span className="font-label-md text-label-md">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export default BottomNav