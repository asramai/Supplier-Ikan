import React from 'react'

function BottomNav() {
  const navItems = [
    { icon: 'dashboard', label: 'Home', weight: 'fill', active: true },
    { icon: 'database', label: 'Data', weight: undefined, active: false },
    { icon: 'shopping_cart', label: 'Beli', weight: undefined, active: false },
    { icon: 'payments', label: 'Jual', weight: undefined, active: false },
    { icon: 'assessment', label: 'Laporan', weight: undefined, active: false },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface border-t border-outline-variant px-xs py-sm">
      {navItems.map((item) => (
        <a
          key={item.label}
          href="#"
          className={`flex flex-col items-center justify-center px-3 py-1 transition-all ${item.active ? 'bg-secondary-container text-on-secondary-container scale-95 duration-200' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
        >
          <span className="material-symbols-outlined" data-weight={item.weight}>{item.icon}</span>
          <span className="font-label-md text-label-md">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default BottomNav