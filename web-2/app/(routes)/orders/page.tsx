import { headers } from 'next/headers'
export const dynamic = 'force-dynamic'

async function getOrders() {
  const h = headers()
  const proto = h.get('x-forwarded-proto') ?? 'https'
  const host = h.get('x-forwarded-host') ?? h.get('host')
  const base = `${proto}://${host}`
  const res = await fetch(`${base}/api/orders`, { cache: 'no-store' })
  if (!res.ok) return []
  return res.json()
}

export default async function OrdersPage() {
  const orders = await getOrders()
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">ВСЕ ЗАЯВКИ</h2>
        <div className="space-y-4">
          {orders.length === 0 && <div className="text-white/70">Пока заявок нет.</div>}
          {orders.map((o: any) => (
            <div key={o.id} className="card p-5">
              <div className="text-green-400 font-semibold">Успешная заявка на продажу</div>
              <div className="text-sm text-white/70">Номер заявки: {o.id}</div>
              <div className="text-sm text-white/70">Получено: {o.got} RUB по курсу {o.rate}</div>
            </div>
          ))}
        </div>
        <a className="btn btn-ghost mt-6 inline-block" href="/">Перейти на главный экран</a>
      </div>
    </main>
  )
}