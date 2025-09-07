'use client'
import { useEffect, useState } from 'react'
import { getBaliTheme, type Theme } from '@/lib/theme'

export default function OceanBackground() {
  const [theme, setTheme] = useState<Theme>('day')
  useEffect(() => {
    const t = () => setTheme(getBaliTheme())
    t(); const id = setInterval(t, 60_000); return () => clearInterval(id)
  }, [])
  return <div className={`ocean-wrap theme-${theme}`} aria-hidden><div className="waves"/></div>
}