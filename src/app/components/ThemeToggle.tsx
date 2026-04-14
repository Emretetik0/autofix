'use client'

import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    // Check initial preference
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      setIsLight(true)
      document.body.classList.add('light-mode')
    }
  }, [])

  const toggleTheme = () => {
    if (isLight) {
      document.body.classList.remove('light-mode')
      localStorage.setItem('theme', 'dark')
      setIsLight(false)
    } else {
      document.body.classList.add('light-mode')
      localStorage.setItem('theme', 'light')
      setIsLight(true)
    }
  }

  return (
    <button 
      onClick={toggleTheme}
      style={{
        background: 'transparent',
        border: '1px solid var(--border)',
        borderRadius: '50%',
        width: '36px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '1.25rem',
        color: 'var(--text-main)',
        transition: 'all 0.3s ease'
      }}
      title="Temayı Değiştir"
    >
      {isLight ? '🌙' : '☀️'}
    </button>
  )
}
