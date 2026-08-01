import React from 'react'

function Header() {
  return (
    <header className="bg-surface sticky top-0 z-50 w-full border-b border-outline-variant flex justify-between items-center px-margin-mobile py-sm h-16">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-headline-md">waves</span>
        <h1 className="font-headline-md text-headline-md font-bold text-primary">Asy-Syifa Panua</h1>
      </div>
      <div className="flex items-center gap-3">
        <button className="material-symbols-outlined text-on-surface-variant p-1 rounded-full hover:bg-surface-container">notifications</button>
        <div className="w-10 h-10 rounded-full border border-outline-variant overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-DdPzUcdGpxbnjR_NaOU2DPcK_mFNZs_RR9900pnv0ZiYHEk11U3ATeVnx89ObW5XL2fsdSIrJmEuB4YqF7XYrVVKqePIgbFyMtyqqkWQeJgBIpcNJA1C-KxPfQmlyoyhFSbUZDwBK1GpgWF7nKHAAhK6bho0UKP1e0FarccMKb3psfOs9iNyHoN0iScmFlBHuIuQ4gKpFbSSsIvnvjx9pb_6jwkFPON7wP-e_NvS0sfEm0X8n_vfAQ"
            alt="User profile"
          />
        </div>
      </div>
    </header>
  )
}

export default Header