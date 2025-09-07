export default function SupportPage(){
  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">Поддержка</h2>
        <div className="card p-6 space-y-2">
          <p className="text-white/80">Пишите нам в Telegram: <a className="underline" href="https://t.me/your_support">@your_support</a></p>
          <p className="text-white/60 text-sm">Ответим оперативно 24/7.</p>
        </div>
        <a className="btn btn-ghost mt-6 inline-block" href="/">На главный экран</a>
      </div>
    </main>
  )
}