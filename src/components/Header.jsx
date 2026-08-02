import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  const handleLogout = () => {
    signOut()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-surface sticky top-0 z-50 w-full border-b border-outline-variant flex justify-between items-center px-margin-mobile py-sm h-16 animate-slide-down">
      <Link to="/" className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-headline-md">waves</span>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Asy-Syifa Panua</h1>
      </Link>
      <div className="flex items-center gap-3" ref={menuRef}>
        <button className="material-symbols-outlined text-on-surface-variant p-1 rounded-full hover:bg-surface-container">notifications</button>
        <div className="relative">
          <button
            className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <img
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DdPzUcdGpxbnjR_NaOU2DPcK_mFNZs_RR9900pnv0ZiYHEk11U3ATeVnx89ObW5XL2fsdSIrJmEuB4YqF7XYrVVKqePIgbFyMtyqqkWQeJgBIpcNJA1C-KxPfQmlyoyhFSbUZDwBK1GpgWF7nKHAAhK6bho0UKP1e0FarccMKb3psfOs9iNyHoN0iScmFlBHuIuQ4gKpFbSSsIvnvjx9pb_6jwkFPON7wP-e_NvS0sfEm0X8n_vfAQ"
              alt="User profile"
            />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-lg py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-surface-container-high transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                <p className="font-body-md text-body-md font-bold text-on-surface">{user?.name || 'Pengguna'}</p>
                <p className="font-label-md text-label-md text-on-surface-variant">{user?.role || ''}</p>
              </Link>
              <button
                className="w-full text-left px-4 py-2 font-label-md text-label-md text-error hover:bg-error-container/10 transition-colors"
                onClick={handleLogout}
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header