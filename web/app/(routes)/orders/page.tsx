import axios from 'axios'

async function getOrders() {
  const res = await axios.get(process.env.NEXT_PUBLIC_WEBAPP_URL + '/api/orders', { validateStatus: ()=>true })
  return res.data as { id:number; status:string; amount:number; currency:string; got:number; rate:number }[]
}

export default async function OrdersPage() {
  const orders = await getOrders()
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">ВСЕ ЗАЯВКИ</h2>
        <div className="space-y-4">
          {orders.length === 0 && <div className="text-white/70">Пока заявок нет.</div>}
          {orders.map(o => (
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