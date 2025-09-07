import { NextResponse } from 'next/server'
import { scoreToVerdict } from './sanitize'

export async function POST() {
  // Демо: случайный скор вместо реального AML‑API
  const score = Math.floor(Math.random()*100)
  return NextResponse.json({ score, verdict: scoreToVerdict(score) })
}