export default function AboutPage(){
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">О нас</h2>
        <div className="card p-6 space-y-2">
          <p className="text-white/80">CRYPTOBALI — обмен криптовалют с уклоном в серф‑лайфстайл. Мы работаем 24/7 и держим лучшие курсы на Бали.</p>
          <p className="text-white/60 text-sm">Адрес офиса: Denpasar, Bali (пример). Для покупки USDT в офисе создайте заявку через бота.</p>
        </div>
        <a className="btn btn-ghost mt-6 inline-block" href="/">На главный экран</a>
      </div>
    </main>
  )
}