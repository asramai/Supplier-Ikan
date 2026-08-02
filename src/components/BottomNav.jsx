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
    return (
      <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center bg-surface border-t border-outline-variant px-xs py-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 py-3 transition-all duration-200 ${isActive ? 'bg-secondary-container text-on-secondary-container scale-95 duration-200 rounded-xl' : 'text-on-surface-variant hover:bg-surface-container-high rounded-xl'}`
            }
          >
            <span className="material-symbols-outlined" data-weight={item.weight}>{item.icon}</span>
            <span className="font-label-md text-label-md">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    )
  }

  const sidebarWidth = collapsed ? 'w-16' : 'w-48'

  return (
    <nav className={`fixed left-0 top-0 h-full ${sidebarWidth} z-50 flex flex-col bg-surface border-r border-outline-variant transition-all duration-300 ease-in-out`}>
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
              `flex items-center gap-2 px-3 py-3 transition-all ${isActive ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high'} ${collapsed ? 'justify-center px-2' : 'px-3'}`
            }
          >
            <span className="material-symbols-outlined text-[24px]" data-weight={item.weight}>{item.icon}</span>
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