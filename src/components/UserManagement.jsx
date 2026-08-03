import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getMockUsersDB, getCurrentUser } from '../utils/auth'
import { hasRolePermission } from '../utils/roles'

function UserManagement() {
  const user = getCurrentUser()
  const role = user?.role || 'Investor'

  const [activeTab, setActiveTab] = useState('pengguna')
  const [showAddFishModal, setShowAddFishModal] = useState(false)
  const [showEditFishModal, setShowEditFishModal] = useState(false)
  const [showDeleteFishModal, setShowDeleteFishModal] = useState(false)
  const [editingFish, setEditingFish] = useState('')
  const [selectedFish, setSelectedFish] = useState('')
  const [showAddInvestorModal, setShowAddInvestorModal] = useState(false)
  const [showEditInvestorModal, setShowEditInvestorModal] = useState(false)
  const [showDeleteInvestorModal, setShowDeleteInvestorModal] = useState(false)
  const [editingInvestor, setEditingInvestor] = useState({ name: '', email: '' })
  const [selectedInvestor, setSelectedInvestor] = useState(null)
  const [newInvestor, setNewInvestor] = useState({ name: '', email: '', avatar: '' })
  const [newInvestorPreview, setNewInvestorPreview] = useState('')
  const [newFish, setNewFish] = useState('')
  const [activeFilter, setActiveFilter] = useState('Semua')
  const [statusFilter, setStatusFilter] = useState('Semua')
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Operator', phone: '', avatar: '' })
  const [editUser, setEditUser] = useState({ name: '', email: '', role: 'Operator', phone: '', avatar: '' })
  const [selectedUser, setSelectedUser] = useState(null)
  const [previewAvatar, setPreviewAvatar] = useState('')
  const [editPreviewAvatar, setEditPreviewAvatar] = useState('')

  const [fishTypes, setFishTypes] = useState(['Cakalang', 'Tongkol', 'Tuna Yellowfin', 'Layang', 'Kerapu'])
  const [investors, setInvestors] = useState([
    { name: 'Siti Yusufina', email: 'siti.y@investor.com' },
    { name: 'Ahmad Fauzi', email: 'ahmad.f@investor.com' },
    { name: 'Budi Santoso', email: 'budi.s@investor.com' },
    { name: 'Rahmat Panua', email: 'rahmat.p@investor.com' },
  ])

  useEffect(() => {
    const handleOpenAdd = () => setShowAddModal(true)
    window.addEventListener('openAddUser', handleOpenAdd)
    return () => window.removeEventListener('openAddUser', handleOpenAdd)
  }, [])

  useEffect(() => {
    const refresh = () => {
      const db = getMockUsersDB()
      const refreshed = Object.values(db).map((u) => ({
        name: u.name,
        email: u.email,
        role: u.role,
        phone: u.phone || '',
        roleBg: u.role === 'Admin' ? 'bg-secondary-container' : u.role === 'Owner' ? 'bg-surface-dim' : u.role === 'Investor' ? 'bg-primary-container/20' : 'bg-outline-variant/30',
        roleText: u.role === 'Admin' ? 'text-on-secondary-container' : u.role === 'Owner' ? 'text-on-surface' : u.role === 'Investor' ? 'text-primary' : 'text-on-surface-variant',
        status: u.isActive ? 'Aktif' : 'Non-aktif',
        statusBg: u.isActive ? 'bg-green-100' : 'bg-error-container',
        statusText: u.isActive ? 'text-green-700' : 'text-error',
        initials: u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
        avatarBg: 'bg-primary-container',
        avatarText: 'text-on-primary-container',
        avatar: u.avatar || '',
      }))
      setUsers(refreshed)
    }
    window.addEventListener('usersUpdated', refresh)
    return () => window.removeEventListener('usersUpdated', refresh)
  }, [])

  const getInitialUsers = () => {
    const db = getMockUsersDB()
    return Object.entries(db).map(([username, u]) => ({
      username,
      name: u.name,
      email: u.email,
      role: u.role,
      phone: u.phone || '',
      roleBg: u.role === 'Admin' ? 'bg-secondary-container' : u.role === 'Owner' ? 'bg-surface-dim' : u.role === 'Investor' ? 'bg-primary-container/20' : 'bg-outline-variant/30',
      roleText: u.role === 'Admin' ? 'text-on-secondary-container' : u.role === 'Owner' ? 'text-on-surface' : u.role === 'Investor' ? 'text-primary' : 'text-on-surface-variant',
      status: u.isActive ? 'Aktif' : 'Non-aktif',
      statusBg: u.isActive ? 'bg-green-100' : 'bg-error-container',
      statusText: u.isActive ? 'text-green-700' : 'text-error',
      initials: u.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      avatarBg: 'bg-primary-container',
      avatarText: 'text-on-primary-container',
      avatar: u.avatar || '',
    }))
  }

  const [users, setUsers] = useState(getInitialUsers)

  const roleFilters = ['Semua', 'Admin', 'Owner', 'Operator', 'Investor']
  const statusFilters = ['Semua', 'Aktif', 'Non-aktif']

  const filteredUsers = users.filter((u) => {
    const matchesRole = activeFilter === 'Semua' || u.role === activeFilter
    const matchesStatus = statusFilter === 'Semua' || u.status === statusFilter
    return matchesRole && matchesStatus
  })

  const handleAddUser = () => {
    if (!newUser.name.trim() || !newUser.email.trim()) return
    const newEntry = {
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      phone: newUser.phone,
      roleBg: newUser.role === 'Admin' ? 'bg-secondary-container' : newUser.role === 'Owner' ? 'bg-surface-dim' : newUser.role === 'Investor' ? 'bg-primary-container/20' : 'bg-outline-variant/30',
      roleText: newUser.role === 'Admin' ? 'text-on-secondary-container' : newUser.role === 'Owner' ? 'text-on-surface' : newUser.role === 'Investor' ? 'text-primary' : 'text-on-surface-variant',
      status: 'Aktif',
      statusBg: 'bg-green-100',
      statusText: 'text-green-700',
      initials: newUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
      avatarBg: 'bg-primary-container',
      avatarText: 'text-on-primary-container',
      avatar: previewAvatar || newUser.avatar || '',
    }
    setUsers((prev) => [...prev, newEntry])
    setShowAddModal(false)
    setNewUser({ name: '', email: '', role: 'Operator', phone: '', avatar: '' })
    setPreviewAvatar('')
  }

  const openEditModal = (user) => {
    setSelectedUser(user)
    setEditUser({ name: user.name, email: user.email, role: user.role, phone: user.phone, avatar: user.avatar || '' })
    setEditPreviewAvatar(user.avatar || '')
    setShowEditModal(true)
  }

  const handleEditUser = () => {
    if (!editUser.name.trim() || !editUser.email.trim()) return
    if (selectedUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.name === selectedUser.name
            ? {
                ...u,
                name: editUser.name,
                email: editUser.email,
                role: editUser.role,
                phone: editUser.phone,
                roleBg: editUser.role === 'Admin' ? 'bg-secondary-container' : editUser.role === 'Owner' ? 'bg-surface-dim' : editUser.role === 'Investor' ? 'bg-primary-container/20' : 'bg-outline-variant/30',
                roleText: editUser.role === 'Admin' ? 'text-on-secondary-container' : editUser.role === 'Owner' ? 'text-on-surface' : editUser.role === 'Investor' ? 'text-primary' : 'text-on-surface-variant',
                initials: editUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase(),
                avatar: editPreviewAvatar || editUser.avatar || '',
              }
            : u
        )
      )
      if (selectedUser.username) {
        const db = getMockUsersDB()
        const dbUser = db[selectedUser.username]
        if (dbUser) {
          dbUser.name = editUser.name
          dbUser.email = editUser.email
          dbUser.role = editUser.role
          dbUser.phone = editUser.phone
          dbUser.avatar = editPreviewAvatar || editUser.avatar || ''
          window.dispatchEvent(new CustomEvent('usersUpdated'))
        }
      }
    }
    setShowEditModal(false)
    setEditUser({ name: '', email: '', role: 'Operator', phone: '', avatar: '' })
    setEditPreviewAvatar('')
    setSelectedUser(null)
  }

  const openDeleteModal = (user) => {
    setSelectedUser(user)
    setShowDeleteModal(true)
  }

  const handleDeleteUser = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((u) => u.name !== selectedUser.name))
    }
    setShowDeleteModal(false)
    setSelectedUser(null)
  }

  const toggleUserStatus = (userName) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.name === userName) {
          const newStatus = u.status === 'Aktif' ? 'Non-aktif' : 'Aktif'
          if (u.username) {
            const db = getMockUsersDB()
            const dbUser = db[u.username]
            if (dbUser) {
              dbUser.isActive = newStatus === 'Aktif'
              window.dispatchEvent(new CustomEvent('usersUpdated'))
            }
          }
          return {
            ...u,
            status: newStatus,
            statusBg: newStatus === 'Aktif' ? 'bg-green-100' : 'bg-error-container',
            statusText: newStatus === 'Aktif' ? 'text-green-700' : 'text-error',
          }
        }
        return u
      })
    )
  }

  return (
    <div className="px-margin-mobile py-lg max-w-4xl mx-auto animate-fade-in">
      <div className="flex p-1 bg-surface-container-low rounded-xl border border-outline-variant mb-lg">
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'pengguna' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('pengguna')}
        >
          Pengguna
        </button>
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'ikan' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('ikan')}
        >
          Ikan
        </button>
        <button
          className={`flex-1 py-sm px-md rounded-lg font-label-md text-label-md transition-all ${activeTab === 'investor' ? 'bg-primary-container text-on-primary-container shadow-sm' : 'text-on-surface-variant hover:bg-surface-container-high'}`}
          onClick={() => setActiveTab('investor')}
        >
          Investor
        </button>
      </div>

      {activeTab === 'pengguna' ? (
        <>
          <section className="space-y-lg mb-xl">
            <div className="flex flex-col sm:flex-row gap-sm justify-between items-start sm:items-center">
              <div className="relative group w-full sm:w-96">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-outline">search</span>
                </div>
                <input
                  className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-all font-body-lg text-body-lg outline-none"
                  placeholder="Cari nama atau email..."
                  type="text"
                />
              </div>
              <div className="flex gap-sm w-full sm:w-auto">
                {hasRolePermission(role, 'manageUsers') && (
                  <button
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-primary text-on-primary rounded-xl font-label-md font-bold hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm"
                    onClick={() => setShowAddModal(true)}
                  >
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    Tambah Pengguna
                  </button>
                )}
                <Link
                  to="/users/roles"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-4 bg-secondary-container text-on-secondary-container rounded-xl font-label-md font-bold hover:opacity-90 transition-opacity active:scale-[0.98] shadow-sm"
                >
                  <span className="material-symbols-outlined text-[20px]">shield</span>
                  Role
                </Link>
              </div>
            </div>
            <div className="flex gap-sm overflow-x-auto no-scrollbar pb-2">
              {roleFilters.map((filter) => (
                <button
                  key={filter}
                  className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${activeFilter === filter ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container'}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="flex gap-sm overflow-x-auto no-scrollbar pb-2">
              {statusFilters.map((opt) => (
                <button
                  key={opt}
                  className={`px-5 py-2 rounded-full font-label-md text-label-md whitespace-nowrap transition-colors ${statusFilter === opt ? 'bg-primary text-on-primary shadow-sm' : 'border border-outline-variant bg-surface text-on-surface-variant hover:bg-surface-container'}`}
                  onClick={() => setStatusFilter(opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-md">
            {filteredUsers.map((user, index) => (
              <div key={user.name} className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-primary/50 hover:shadow-md transition-all card-hover animate-slide-up" style={{ animationFillMode: 'backwards', animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-surface-container shadow-sm flex-shrink-0">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full ${user.avatarBg} ${user.avatarText} flex items-center justify-center font-bold text-headline-md`}>
                        {user.initials}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-headline-md text-headline-md text-on-surface">{user.name}</h3>
                    <p className="font-body-md text-body-md text-outline">{user.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className={`px-3 py-1 rounded-lg ${user.roleBg} ${user.roleText} font-label-md text-label-md`}>{user.role}</span>
                      <span className={`px-3 py-1 rounded-lg ${user.statusBg} ${user.statusText} font-label-md text-label-md flex items-center gap-1`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Aktif' ? 'bg-green-500' : 'bg-red-500'}`}></span> {user.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 self-end sm:self-center">
                  <button className="p-2.5 text-outline hover:text-primary hover:bg-primary-container/10 rounded-xl transition-all" title="Edit" onClick={() => openEditModal(user)}>
                    <span className="material-symbols-outlined text-[20px]">edit</span>
                  </button>
                  <button
                    className={`p-2.5 rounded-xl transition-all ${user.status === 'Aktif' ? 'text-outline hover:text-error hover:bg-error-container/10' : 'text-outline hover:text-primary hover:bg-primary-container/10'}`}
                    title={user.status === 'Aktif' ? 'Non-aktifkan akun' : 'Aktifkan akun'}
                    onClick={() => toggleUserStatus(user.name)}
                  >
                    <span className="material-symbols-outlined text-[20px]">{user.status === 'Aktif' ? 'lock' : 'lock_open'}</span>
                  </button>
                  <button className="p-2.5 text-outline hover:text-error hover:bg-error-container/10 rounded-xl transition-all" title="Hapus" onClick={() => openDeleteModal(user)}>
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </section>
        </>
      ) : activeTab === 'ikan' ? (
        <section className="space-y-md animate-fade-in">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Daftar Jenis Ikan</h3>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity active:scale-[0.98]"
              onClick={() => setShowAddFishModal(true)}
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Tambah Ikan
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {fishTypes.map((fish, index) => (
              <div key={fish} className="flex items-center justify-between p-3 bg-surface border border-outline-variant rounded-xl card-hover animate-slide-up" style={{ animationFillMode: 'backwards', animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">fish</span>
                  <span className="font-body-md text-body-md text-on-surface">{fish}</span>
                </div>
                <div className="flex gap-1">
                  <button className="p-1.5 text-outline hover:text-primary hover:bg-primary-container/10 rounded-lg transition-all" title="Edit" onClick={() => { setEditingFish(fish); setShowEditFishModal(true) }}>
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-outline hover:text-error hover:bg-error-container/10 rounded-lg transition-all" title="Hapus" onClick={() => { setSelectedFish(fish); setShowDeleteFishModal(true) }}>
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="space-y-md animate-fade-in">
          <div className="flex justify-between items-center mb-md">
            <h3 className="font-headline-md text-headline-md text-on-surface">Daftar Investor</h3>
            <button
              className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity active:scale-[0.98]"
              onClick={() => setShowAddInvestorModal(true)}
            >
              <span className="material-symbols-outlined text-[20px]">person_add</span>
              Tambah Investor
            </button>
          </div>
          <div className="space-y-2">
            {investors.map((inv, index) => (
              <div key={inv.name} className="flex items-center justify-between p-4 bg-surface border border-outline-variant rounded-xl card-hover animate-slide-up" style={{ animationFillMode: 'backwards', animationDelay: `${index * 0.05}s` }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-sm">
                    {inv.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-on-surface">{inv.name}</p>
                    <p className="font-body-sm text-body-sm text-outline">{inv.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-lg bg-primary-container/20 text-primary font-label-md text-label-md">Investor</span>
                  <button className="p-1.5 text-outline hover:text-primary hover:bg-primary-container/10 rounded-lg transition-all" title="Edit" onClick={() => { setEditingInvestor(inv); setShowEditInvestorModal(true) }}>
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                  <button className="p-1.5 text-outline hover:text-error hover:bg-error-container/10 rounded-lg transition-all" title="Hapus" onClick={() => { setSelectedInvestor(inv); setShowDeleteInvestorModal(true) }}>
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowAddModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Tambah Pengguna Baru</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowAddModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Lengkap</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama lengkap"
                  type="text"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="email@example.com"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Telepon</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+62 8xx xxxx xxxx"
                  type="text"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Foto Profil</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                    {previewAvatar ? (
                      <img src={previewAvatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[28px]">person</span>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setPreviewAvatar(reader.result)
                            setNewUser((prev) => ({ ...prev, avatar: reader.result }))
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Pilih Foto
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Peran</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  <option value="Operator">Operator</option>
                  <option value="Admin">Admin</option>
                  <option value="Investor">Investor</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={handleAddUser}
              >
                Tambah Pengguna
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowEditModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Edit Pengguna</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowEditModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Lengkap</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama lengkap"
                  type="text"
                  value={editUser.name}
                  onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="email@example.com"
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Telepon</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+62 8xx xxxx xxxx"
                  type="text"
                  value={editUser.phone}
                  onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Foto Profil</label>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                    {editPreviewAvatar ? (
                      <img src={editPreviewAvatar} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[28px]">person</span>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setEditPreviewAvatar(reader.result)
                            setEditUser((prev) => ({ ...prev, avatar: reader.result }))
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <span className="flex items-center justify-center gap-2 px-4 py-2.5 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[18px]">upload</span>
                      Ganti Foto
                    </span>
                  </label>
                </div>
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Peran</label>
                <select
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                >
                  <option value="Operator">Operator</option>
                  <option value="Admin">Admin</option>
                  <option value="Investor">Investor</option>
                  <option value="Owner">Owner</option>
                </select>
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={handleEditUser}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowDeleteModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Hapus Pengguna</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowDeleteModal(false)}>close</button>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-lg">Apakah Anda yakin ingin menghapus pengguna <strong>{selectedUser?.name}</strong>? Tindakan ini tidak dapat dibatalkan.</p>
            <div className="flex gap-sm">
              <button
                className="flex-1 py-md rounded-xl font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                onClick={() => setShowDeleteModal(false)}
              >
                Batal
              </button>
              <button
                className="flex-1 py-md rounded-xl font-label-md bg-error text-on-error hover:opacity-90 transition-opacity"
                onClick={handleDeleteUser}
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddFishModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowAddFishModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Tambah Jenis Ikan</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowAddFishModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Ikan</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Cakalang"
                  type="text"
                  value={newFish}
                  onChange={(e) => setNewFish(e.target.value)}
                />
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={() => {
                  if (newFish.trim()) {
                    setFishTypes((prev) => [...prev, newFish.trim()])
                    setNewFish('')
                    setShowAddFishModal(false)
                  }
                }}
              >
                Tambah Ikan
              </button>
            </div>
          </div>
        </div>
      )}

{showAddInvestorModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowAddInvestorModal(false)}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Tambah Investor</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowAddInvestorModal(false)}>close</button>
            </div>
            <div className="space-y-md">
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Lengkap</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Nama lengkap"
                  type="text"
                  value={newInvestor.name}
                  onChange={(e) => setNewInvestor({ ...newInvestor, name: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
                <input
                  className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="email@example.com"
                  type="email"
                  value={newInvestor.email}
                  onChange={(e) => setNewInvestor({ ...newInvestor, email: e.target.value })}
                />
              </div>
              <div className="flex flex-col gap-xs">
                <label className="font-label-md text-label-md text-on-surface-variant uppercase">Foto Profil</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-surface-container border border-outline-variant flex items-center justify-center">
                    {newInvestorPreview ? (
                      <img src={newInvestorPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[24px]">person</span>
                    )}
                  </div>
                  <label className="flex-1 cursor-pointer">
                    <input
                      accept="image/*"
                      className="hidden"
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          const reader = new FileReader()
                          reader.onloadend = () => {
                            setNewInvestorPreview(reader.result)
                            setNewInvestor((prev) => ({ ...prev, avatar: reader.result }))
                          }
                          reader.readAsDataURL(file)
                        }
                      }}
                    />
                    <span className="flex items-center justify-center gap-2 px-3 py-2 bg-surface border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[16px]">upload</span>
                      Pilih Foto
                    </span>
                  </label>
                </div>
              </div>
              <button
                className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                onClick={() => {
                  if (newInvestor.name.trim() && newInvestor.email.trim()) {
                    setInvestors((prev) => [...prev, { name: newInvestor.name.trim(), email: newInvestor.email.trim(), avatar: newInvestor.avatar || '' }])
                    setNewInvestor({ name: '', email: '', avatar: '' })
                    setNewInvestorPreview('')
                    setShowAddInvestorModal(false)
                  }
                }}
              >
                Tambah Investor
              </button>
            </div>
          </div>
        </div>
      )}

       {showEditFishModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowEditFishModal(false)}>
           <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-lg">
               <h3 className="font-headline-md text-headline-md text-on-surface">Edit Jenis Ikan</h3>
               <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowEditFishModal(false)}>close</button>
             </div>
             <div className="space-y-md">
               <div className="flex flex-col gap-xs">
                 <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Ikan</label>
                 <input
                   className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                   type="text"
                   value={editingFish}
                   onChange={(e) => setEditingFish(e.target.value)}
                 />
               </div>
               <button
                 className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                 onClick={() => {
                   if (editingFish.trim()) {
                     setFishTypes((prev) => prev.map((f) => f === selectedFish ? editingFish.trim() : f))
                     setShowEditFishModal(false)
                     setEditingFish('')
                     setSelectedFish('')
                   }
                 }}
               >
                 Simpan
               </button>
             </div>
           </div>
         </div>
       )}

       {showDeleteFishModal && (
         <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowDeleteFishModal(false)}>
           <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
             <div className="flex justify-between items-center mb-lg">
               <h3 className="font-headline-md text-headline-md text-on-surface">Hapus Jenis Ikan</h3>
               <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowDeleteFishModal(false)}>close</button>
             </div>
             <p className="font-body-md text-body-md text-on-surface-variant mb-lg">Apakah Anda yakin ingin menghapus jenis ikan <strong>{selectedFish}</strong>?</p>
             <div className="flex gap-sm">
               <button
                 className="flex-1 py-md rounded-xl font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                 onClick={() => setShowDeleteFishModal(false)}
               >
                 Batal
               </button>
               <button
                 className="flex-1 py-md rounded-xl font-label-md bg-error text-on-error hover:opacity-90 transition-opacity"
                 onClick={() => {
                   setFishTypes((prev) => prev.filter((f) => f !== selectedFish))
                   setShowDeleteFishModal(false)
                   setSelectedFish('')
                 }}
               >
                 Hapus
               </button>
             </div>
</div>
          </div>
        )}

        {showEditInvestorModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowEditInvestorModal(false)}>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface">Edit Investor</h3>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowEditInvestorModal(false)}>close</button>
              </div>
              <div className="space-y-md">
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase">Nama Lengkap</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    type="text"
                    value={editingInvestor.name}
                    onChange={(e) => setEditingInvestor({ ...editingInvestor, name: e.target.value })}
                  />
                </div>
                <div className="flex flex-col gap-xs">
                  <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
                  <input
                    className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    type="email"
                    value={editingInvestor.email}
                    onChange={(e) => setEditingInvestor({ ...editingInvestor, email: e.target.value })}
                  />
                </div>
                <button
                  className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                  onClick={() => {
                    if (editingInvestor.name.trim() && editingInvestor.email.trim()) {
                      setInvestors((prev) => prev.map((inv) =>
                        inv.name === selectedInvestor.name
                          ? { ...inv, name: editingInvestor.name.trim(), email: editingInvestor.email.trim() }
                          : inv
                      ))
                      setShowEditInvestorModal(false)
                      setEditingInvestor({ name: '', email: '' })
                      setSelectedInvestor(null)
                    }
                  }}
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        )}

        {showDeleteInvestorModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={() => setShowDeleteInvestorModal(false)}>
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-lg">
                <h3 className="font-headline-md text-headline-md text-on-surface">Hapus Investor</h3>
                <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={() => setShowDeleteInvestorModal(false)}>close</button>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant mb-lg">Apakah Anda yakin ingin menghapus investor <strong>{selectedInvestor?.name}</strong>?</p>
              <div className="flex gap-sm">
                <button
                  className="flex-1 py-md rounded-xl font-label-md border border-outline-variant text-on-surface-variant hover:bg-surface-container transition-colors"
                  onClick={() => setShowDeleteInvestorModal(false)}
                >
                  Batal
                </button>
                <button
                  className="flex-1 py-md rounded-xl font-label-md bg-error text-on-error hover:opacity-90 transition-opacity"
                  onClick={() => {
                    setInvestors((prev) => prev.filter((inv) => inv.name !== selectedInvestor.name))
                    setShowDeleteInvestorModal(false)
                    setSelectedInvestor(null)
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  export default UserManagement