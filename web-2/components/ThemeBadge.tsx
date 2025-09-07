'use client'
import { getBaliTheme } from '@/lib/theme'
import { useEffect, useState } from 'react'
export default function ThemeBadge() {
  const [label, setLabel] = useState('')
  useEffect(() => { const t = getBaliTheme(); setLabel(t==='day'?'Бали: утро/день': t==='sunset'?'Бали: закат':'Бали: ночь') }, [])
  return <span className="px-3 py-1 rounded-full bg-white/10 text-white/80 text-xs">{label}</span>
}