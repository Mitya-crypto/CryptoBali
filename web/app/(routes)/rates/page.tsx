import axios from 'axios'

async function getRates() {
  const res = await axios.get(process.env.NEXT_PUBLIC_WEBAPP_URL + '/api/rates', { validateStatus: ()=>true })
  return res.data
}

export default async function RatesPage() {
  const data = await getRates()
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">КУРС USDT</h2>
        <div className="card p-6">
          <div className="text-lg">Покупка</div>
          <div className="text-3xl font-bold">{data.buy.toFixed(2)} RUB</div>
          <div className="mt-6 text-lg">Продажа</div>
          <div className="text-3xl font-bold">{data.sell.toFixed(2)} RUB</div>
          <p className="text-white/70 text-sm mt-6">Данный курс является биржевым и меняется каждую минуту.</p>
          <p className="text-white/70 text-sm">Мы не берём никаких дополнительных комиссий с Вас (в демо).</p>
          <a className="btn btn-ghost mt-6 inline-block" href="/">Перейти на главный экран</a>
        </div>
      </div>
    </main>
  )
}