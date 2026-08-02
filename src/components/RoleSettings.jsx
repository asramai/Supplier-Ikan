import React, { useState, useEffect } from 'react'
import { getMockUsersDB } from '../utils/auth'
import { ROLES, getPermissions, hasRolePermission } from '../utils/roles'

const ROLE_DESCRIPTIONS = {
  Admin: 'Akses penuh ke semua menu dan fitur manajemen.',
  Owner: 'Akses penuh ke semua menu dan fitur manajemen.',
  Operator: 'Akses operasional: beli, jual, data, inventaris, mitra, laporan, dan pengguna (hanya lihat).',
  Investor: 'Akses terbatas: dashboard, data, inventaris, laporan, dan investasi.',
}

const PERMISSION_LABELS = {
  dashboard: 'Dashboard',
  beli: 'Beli',
  jual: 'Jual',
  data: 'Data',
  inventory: 'Inventaris',
  mitra: 'Mitra',
  users: 'Pengguna',
  laporan: 'Laporan',
  invest: 'Investasi',
  identitas: 'Identitas',
  profile: 'Profil',
  manageUsers: 'Kelola Pengguna',
  manageMitra: 'Kelola Mitra',
  manageIdentity: 'Kelola Identitas',
}

function RoleSettings() {
  const [selectedRole, setSelectedRole] = useState('Admin')
  const [editingUser, setEditingUser] = useState(null)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [newRole, setNewRole] = useState('Operator')

  const permissions = getPermissions(selectedRole)
  const db = getMockUsersDB()
  const users = Object.entries(db).map(([username, u]) => ({
    username,
    name: u.name,
    role: u.role,
    isActive: u.isActive,
    email: u.email,
  }))

  const handleRoleChange = (username, newRole) => {
    const user = db[username]
    if (!user) return
    user.role = newRole
    window.dispatchEvent(new CustomEvent('usersUpdated'))
  }

  const openRoleModal = (user) => {
    setEditingUser(user)
    setNewRole(user.role)
    setShowRoleModal(true)
  }

  const saveRoleChange = () => {
    if (editingUser) {
      handleRoleChange(editingUser.username, newRole)
      setShowRoleModal(false)
      setEditingUser(null)
    }
  }

  return (
    <div className="px-margin-mobile py-lg max-w-5xl mx-auto animate-fade-in space-y-lg">
      <h1 className="font-headline-lg text-headline-lg text-on-surface">Pengaturan Role Pengguna</h1>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Role & Hak Akses</h2>
        <div className="flex gap-sm overflow-x-auto no-scrollbar pb-2 mb-4">
          {Object.values(ROLES).map((role) => (
            <button
              key={role}
              className={`px-4 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${selectedRole === role ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container'}`}
              onClick={() => setSelectedRole(role)}
            >
              {role}
            </button>
          ))}
        </div>

        <p className="font-body-md text-body-md text-on-surface-variant mb-4">{ROLE_DESCRIPTIONS[selectedRole]}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Object.entries(PERMISSION_LABELS).map(([key, label]) => (
            <div key={key} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface">
              <span className={`material-symbols-outlined text-[18px] ${permissions[key] ? 'text-primary' : 'text-outline'}`}>
                {permissions[key] ? 'check_circle' : 'circle'}
              </span>
              <span className={`font-label-md text-label-md ${permissions[key] ? 'text-on-surface' : 'text-on-surface-variant'}`}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Kelola Role Pengguna</h2>
        <div className="space-y-2">
          {users.map((user, index) => (
            <div
              key={user.username}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface border border-outline-variant hover:border-primary/50 transition-all card-hover animate-slide-up"
              style={{ animationFillMode: 'backwards', animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-sm">
                  {user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-headline-sm text-headline-sm text-on-surface">{user.name}</p>
                  <p className="font-body-sm text-body-sm text-outline">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-lg font-label-md text-label-md ${user.role === 'Admin' ? 'bg-secondary-container text-on-secondary-container' : user.role === 'Owner' ? 'bg-surface-dim text-on-surface' : user.role === 'Investor' ? 'bg-primary-container/20 text-primary' : 'bg-outline-variant/30 text-on-surface-variant'}`}>
                  {user.role}
                </span>
                <span className={`w-2 h-2 rounded-full ${user.isActive ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {hasRolePermission(selectedRole, 'manageUsers') && (
                  <button
                    className="px-3 py-1.5 bg-primary-container text-on-primary-container rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity"
                    onClick={() => openRoleModal(user)}
                  >
                    Ubah Role
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {showRoleModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowRoleModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Ubah Role Pengguna</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowRoleModal(false)}>close</button>
            </div>
            {editingUser && (
              <>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                  Ubah role untuk <strong>{editingUser.name}</strong>
                </p>
                <div className="flex flex-col gap-xs mb-lg">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase">Peran</label>
                  <select
                    className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                  >
                    {Object.values(ROLES).map((role) => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-sm">
                  <button
                    className="flex-1 py-md rounded-xl font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                    onClick={() => setShowRoleModal(false)}
                  >
                    Batal
                  </button>
                  <button
                    className="flex-1 py-md rounded-xl font-label-md bg-primary text-on-primary hover:opacity-90 transition-opacity"
                    onClick={saveRoleChange}
                  >
                    Simpan
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default RoleSettings