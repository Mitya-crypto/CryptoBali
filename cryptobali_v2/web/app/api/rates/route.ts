import { NextResponse } from 'next/server'
export async function GET() {
  const baseUsdtRub = 81.70
  const spreadBps = 60
  const buy = baseUsdtRub * (1 + spreadBps/10_000)
  const sell = baseUsdtRub * (1 - spreadBps/10_000)
  return NextResponse.json({ buy, sell })
}