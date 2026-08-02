import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProfileSettings() {
  const navigate = useNavigate()
  const { user, signOut } = useAuth()
  const [displayName, setDisplayName] = useState(user?.name || '')

  useEffect(() => {
    setDisplayName(user?.name || '')
  }, [user])

  return (
    <div className="px-margin-mobile pt-lg max-w-2xl mx-auto animate-fade-in">
      <div className="mb-lg">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Pengaturan Profil</h2>
        <p className="font-body-md text-body-md text-on-surface-variant">Kelola informasi pribadi dan akun Anda.</p>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden card-hover">
        <button
          className="w-full flex items-center justify-between p-md hover:bg-surface-container-high transition-colors"
          onClick={() => navigate('/profile/detail')}
        >
          <div className="flex items-center gap-md">
            <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-md overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={displayName} className="w-full h-full object-cover" />
              ) : (
                displayName.charAt(0).toUpperCase()
              )}
            </div>
            <div className="text-left">
              <h3 className="font-headline-md text-headline-md text-on-surface">{displayName}</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">{user?.email}</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
        </button>
        <div className="border-t border-outline-variant">
          <button
            className="w-full flex items-center justify-between p-md hover:bg-error-container/10 transition-colors text-error"
            onClick={signOut}
          >
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">logout</span>
              </div>
              <div className="text-left">
                <h3 className="font-headline-md text-headline-md">Keluar</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">Logout dari akun Anda</p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings
