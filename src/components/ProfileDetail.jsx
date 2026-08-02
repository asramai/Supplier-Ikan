import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { updateProfile, getCurrentUser } from '../utils/auth'

function ProfileDetail() {
  const navigate = useNavigate()
  const { user, refreshUser } = useAuth()
  const currentUsername = user?.username

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [address, setAddress] = useState(user?.address || '')
  const [avatar, setAvatar] = useState(user?.avatar || '')
  const [previewAvatar, setPreviewAvatar] = useState(user?.avatar || '')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const current = getCurrentUser()
    if (current) {
      setName(current.name || '')
      setEmail(current.email || '')
      setPhone(current.phone || '')
      setAddress(current.address || '')
      setAvatar(current.avatar || '')
      setPreviewAvatar(current.avatar || '')
    }
  }, [user])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    setTimeout(() => {
      const saved = updateProfile({ name, email, phone, address, avatar: previewAvatar || avatar })
      if (saved) {
        refreshUser()
        setSuccess(true)
        setTimeout(() => setSuccess(false), 3000)
      } else {
        setError('Gagal menyimpan profil')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="px-margin-mobile pt-lg max-w-2xl mx-auto animate-fade-in">
      <div className="mb-lg flex items-center gap-sm">
        <button
          className="p-2 text-outline hover:text-primary hover:bg-primary-container/10 rounded-lg transition-colors"
          onClick={() => navigate('/profile')}
        >
          <span className="material-symbols-outlined text-[24px]">arrow_back</span>
        </button>
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Detail Profil</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Kelola informasi pribadi dan foto profil Anda.</p>
        </div>
      </div>

      <form className="space-y-lg" onSubmit={handleSubmit}>
        <div className="bg-surface border border-outline-variant rounded-xl p-md space-y-md card-hover">
          <div className="flex flex-col items-center gap-md">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-surface-container border border-outline-variant shadow-sm">
              {previewAvatar ? (
                <img src={previewAvatar} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-headline-lg">
                  {name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <label className="cursor-pointer">
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
                      setAvatar(reader.result)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
              />
              <span className="flex items-center gap-2 px-4 py-2 bg-surface-container-high border border-outline-variant rounded-lg font-label-md text-label-md text-on-surface-variant hover:border-primary hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                Ganti Foto Profil
              </span>
            </label>
          </div>

          <div className="grid grid-cols-1 gap-md">
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="name">Nama Lengkap</label>
              <input
                id="name"
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="email">Email</label>
              <input
                id="email"
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="phone">Telepon</label>
              <input
                id="phone"
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-xs">
              <label className="font-label-md text-label-md text-on-surface-variant uppercase" htmlFor="address">Alamat</label>
              <textarea
                id="address"
                className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none resize-none"
                rows="3"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-error-container text-on-error-container px-4 py-2 rounded-lg font-body-md text-body-md text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-[#E8F5E9] text-[#28A745] px-4 py-2 rounded-lg font-body-md text-body-md text-center">
            Profil berhasil diperbarui
          </div>
        )}

        <button
          type="submit"
          className="w-full h-[56px] bg-primary-container text-on-primary-container font-headline-md text-headline-md rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Menyimpan...
            </>
          ) : (
            <>
              <span className="material-symbols-outlined">save</span>
              Simpan Perubahan
            </>
          )}
        </button>
      </form>
    </div>
  )
}

export default ProfileDetail
