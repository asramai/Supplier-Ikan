import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarContext } from '../context/SidebarContext'
import { hasRolePermission } from '../utils/roles'
import { getCurrentUser } from '../utils/auth'

function FAB() {
  const { collapsed } = useContext(SidebarContext)
  const location = useLocation()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024
  const user = getCurrentUser()
  const role = user?.role || 'Investor'

  const leftPosition = isMobile ? 'left-margin-mobile' : collapsed ? 'left-16' : 'left-48'

  const PAGES_WITHOUT_FAB = ['/laporan', '/beli', '/jual', '/users', '/login', '/profile']

  if (PAGES_WITHOUT_FAB.includes(location.pathname)) {
    return null
  }

  const getFabConfig = () => {
    const path = location.pathname
    if (path === '/') {
      if (hasRolePermission(role, 'beli')) return { to: '/beli', icon: 'add_shopping_cart', label: 'Beli Ikan', color: 'bg-primary', action: null }
      return { to: '/jual', icon: 'add', label: 'Tambah Penjualan', color: 'bg-secondary', action: null }
    }
    if (path === '/beli') return { to: '/beli', icon: 'add', label: 'Tambah Pembelian', color: 'bg-primary', action: null }
    if (path === '/jual') return { to: '/jual', icon: 'add', label: 'Tambah Penjualan', color: 'bg-secondary', action: null }
    if (path === '/mitra') {
      if (hasRolePermission(role, 'manageMitra')) return { to: '/mitra', icon: 'person_add', label: 'Tambah Mitra', color: 'bg-primary', action: 'openAddMitra' }
      return null
    }
    if (path === '/users') {
      if (hasRolePermission(role, 'manageUsers')) return { to: '/users', icon: 'person_add', label: 'Tambah Pengguna', color: 'bg-primary', action: 'openAddUser' }
      return null
    }
    if (path === '/inventory') return { to: '/inventory', icon: 'add', label: 'Tambah Ikan', color: 'bg-primary', action: null }
    if (path === '/invest') {
      if (hasRolePermission(role, 'invest')) return { to: '/invest', icon: 'trending_up', label: 'Tambah Investasi', color: 'bg-primary', action: null }
      return null
    }
    if (path === '/profile') return { to: '/profile', icon: 'edit', label: 'Edit Profil', color: 'bg-primary', action: null }
    return null
  }

  const config = getFabConfig()

  if (!config) return null

  const handleClick = (e) => {
    if (config.action === 'openAddMitra') {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('openAddMitra'))
    }
    if (config.action === 'openAddUser') {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('openAddUser'))
    }
  }

  return (
    <Link
      to={config.to}
      className={`fixed bottom-24 ${leftPosition} w-14 h-14 ${config.color} text-white rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-all z-40 hover:shadow-lg hover:scale-105`}
      title={config.label}
      onClick={handleClick}
    >
      <span className="material-symbols-outlined text-[28px]">{config.icon}</span>
    </Link>
  )
}

export default FAB