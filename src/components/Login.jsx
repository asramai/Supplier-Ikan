import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      navigate('/')
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-margin-mobile relative">
      <div className="fixed inset-0 -z-10 overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[40%] bg-primary-container/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[35%] bg-secondary-container/20 blur-[100px] rounded-full"></div>
      </div>

      <main className="w-full max-w-[400px] flex flex-col items-center">
        <header className="flex flex-col items-center mb-xl">
          <div className="w-20 h-20 bg-primary-container rounded-xl flex items-center justify-center mb-md shadow-sm">
            <span className="material-symbols-outlined text-[48px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>waves</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">Asy-Syifa Panua</h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Fishery &amp; Financial Management</p>
        </header>

        <form className="w-full flex flex-col gap-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-xs">
            <label className="font-label-md text-label-md text-on-surface-variant ml-1" htmlFor="username">USERNAME</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
              <input
                className="w-full h-[56px] pl-[48px] pr-md bg-white border border-outline-variant rounded-lg font-body-lg text-body-lg transition-all focus:ring-0"
                id="username"
                placeholder="Enter your username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-xs">
            <div className="flex justify-between items-center ml-1">
              <label className="font-label-md text-label-md text-on-surface-variant" htmlFor="password">PASSWORD</label>
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

          <div className="flex flex-col gap-md pt-xs">
            <button
              type="submit"
              className="w-full h-[56px] bg-primary-container hover:bg-primary text-on-primary font-headline-md text-headline-md rounded-lg shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-sm disabled:opacity-50"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  Authenticating...
                </>
              ) : (
                <>
                  Login
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>
            <div className="flex justify-center">
              <a className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors py-xs" href="#">FORGOT PASSWORD?</a>
            </div>
          </div>
        </form>

        <footer className="mt-xl flex flex-col items-center gap-md">
          <div className="flex items-center gap-sm">
            <div className="h-[1px] w-12 bg-outline-variant"></div>
            <span className="font-label-md text-label-md text-on-surface-variant">SECURE ACCESS</span>
            <div className="h-[1px] w-12 bg-outline-variant"></div>
          </div>
          <div className="flex gap-lg">
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span className="font-label-md text-label-md uppercase">Encrypted</span>
            </div>
            <div className="flex items-center gap-xs text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">gpp_good</span>
              <span className="font-label-md text-label-md uppercase">Certified</span>
            </div>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant mt-lg">
            Don't have an account? <a className="text-primary font-bold hover:underline" href="#">Contact Admin</a>
          </p>
        </footer>
      </main>
    </div>
  )
}

export default Login