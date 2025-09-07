import { NextRequest, NextResponse } from 'next/server'
let mem: any[] = []
export async function GET() { return NextResponse.json(mem.slice(-10).reverse()) }
export async function POST(req: NextRequest) {
  const body = await req.json(); const id = (mem.at(-1)?.id || 31310) + 1
  const rate = 81
  mem.push({ id, status:'success', amount: body.amount, currency:'RUB', got: Math.round(body.amount * 1.251)/10, rate })
  return NextResponse.json({ id })
}