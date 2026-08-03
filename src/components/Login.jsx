import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { forgotPassword, getMockUsersDB } from '../utils/auth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showForgotModal, setShowForgotModal] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')
  const [forgotSuccess, setForgotSuccess] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signIn(username, password)
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async (e) => {
    e.preventDefault()
    setForgotLoading(true)
    setForgotError('')
    setForgotSuccess(false)

    try {
      const result = await forgotPassword(forgotEmail)
      setForgotSuccess(true)
    } catch (err) {
      setForgotError(err.message)
    } finally {
      setForgotLoading(false)
    }
  }

  const resetForgotForm = () => {
    setShowForgotModal(false)
    setForgotEmail('')
    setForgotError('')
    setForgotSuccess(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile relative animate-fade-in">
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-primary-container/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[35%] bg-secondary-container/20 blur-[100px] rounded-full"></div>
      </div>

      <main className="w-full max-w-[400px] flex flex-col items-center">
        <header className="flex flex-col items-center mb-xl animate-slide-up">
          <div className="w-20 h-20 bg-primary-container rounded-xl flex items-center justify-center mb-md shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Asy-Syifa Panua</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Manajemen Perikanan &amp; Keuangan</p>
        </header>

        <form className="w-full flex flex-col gap-lg animate-slide-up delay-200" onSubmit={handleSubmit} style={{ animationFillMode: 'backwards' }}>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="username">NAMA PENGGUNA</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
              <input
                className="w-full h-[56px] pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg transition-all focus:ring-0"
                id="username"
                placeholder="Masukkan nama pengguna"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center ml-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">KATA SANDI</label>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
              <input
                className="w-full h-[56px] pl-[48px] pr-[56px] bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg transition-all focus:ring-0"
                id="password"
                placeholder="••••••••"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container px-4 py-2 rounded-lg font-body-md text-body-md text-center">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-md pt-xs">
            <button
              type="submit"
              className="w-full h-[56px] bg-primary-container hover:bg-primary text-on-primary font-headline-md text-headline-md rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Autentikasi...
                </>
              ) : (
                <>
Masuk
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
            <div className="flex justify-center">
              <button
                type="button"
                className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-xs bg-transparent border-none cursor-pointer"
                onClick={() => setShowForgotModal(true)}
              >
                LUPA KATA SANDI?
              </button>
            </div>
          </div>
        </form>

        <footer className="mt-xl flex flex-col items-center gap-md">
          <div className="flex items-center gap-sm">
            <div className="h-[1px] w-12 bg-outline-variant"></div>
            <span className="font-label-md text-label-md">SECURE ACCESS</span>
            <div className="h-[1px] w-12 bg-outline-variant"></div>
          </div>
          <div className="flex gap-lg">
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-green-600">verified_user</span>
              <span className="font-label-md text-label-md uppercase">SHA-256 Terenkripsi</span>
            </div>
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px] text-green-600">shield</span>
              <span className="font-label-md text-label-md uppercase">Token Terverifikasi</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-lg">
            Belum punya akun?{' '}
            <a
              className="text-primary font-bold hover:underline"
              href={`https://wa.me/${getMockUsersDB().admin.phone.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hubungi Admin
            </a>
          </p>
        </footer>
      </main>

      {showForgotModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-md" onClick={resetForgotForm}>
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg w-full max-w-sm" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-lg">
              <h3 className="font-headline-md text-headline-md text-on-surface">Lupa Kata Sandi</h3>
              <button className="material-symbols-outlined text-on-surface-variant hover:text-primary transition-colors" onClick={resetForgotForm}>close</button>
            </div>

            {!forgotSuccess ? (
              <>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                  Masukkan email yang terdaftar untuk menerima link reset kata sandi.
                </p>
                <form onSubmit={handleForgotPassword} className="space-y-md">
                  <div className="flex flex-col gap-xs">
                    <label className="font-label-md text-label-md text-on-surface-variant uppercase">Email</label>
                    <input
                      className="w-full bg-surface border border-outline-variant rounded-lg p-md font-body-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                      placeholder="contoh@email.com"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                  {forgotError && (
                    <div className="bg-error-container text-on-error-container px-4 py-2 rounded-lg font-body-md text-body-md text-center">
                      {forgotError}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform disabled:opacity-50"
                    disabled={forgotLoading}
                  >
                    {forgotLoading ? (
                      <>
                        <span className="material-symbols-outlined animate-spin inline-block">progress_activity</span>
                        Mengirim...
                      </>
                    ) : (
                      'Kirim Link Reset'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 bg-success-container rounded-full flex items-center justify-center mx-auto mb-md">
                  <span className="material-symbols-outlined text-[32px] text-on-success-container">check_circle</span>
                </div>
                <h4 className="font-headline-md text-headline-md text-on-surface mb-sm">Email Terkirim</h4>
                <p className="font-body-md text-body-md text-on-surface-variant mb-md">
                  Link reset kata sandi telah dikirim ke <strong>{forgotEmail}</strong>.
                </p>
                <p className="font-body-sm text-body-sm text-outline mb-lg">
                  Dalam simulasi ini, email tidak dikirim secara nyata. Pada sistem produksi, pengguna akan menerima email berisi tautan untuk mengatur ulang kata sandi mereka.
                </p>
                <button
                  className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-headline-md text-headline-md font-bold active:scale-[0.98] transition-transform"
                  onClick={resetForgotForm}
                >
                  Kembali ke Masuk
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Login