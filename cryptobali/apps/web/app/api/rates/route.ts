import { NextResponse } from 'next/server'

export async function GET() {
  // Макет: базовая цена и спред
  const baseUsdtRub = 81.70; // заглушка
  const spreadBps = Number(process.env.NEXT_PUBLIC_FAKE_SPREAD_BPS || 60); // 0.60%
  const buy = baseUsdtRub * (1 + spreadBps/10_000) // Мы покупаем дороже
  const sell = baseUsdtRub * (1 - spreadBps/10_000) // Мы продаём дешевле
  return NextResponse.json({ buy, sell })
}