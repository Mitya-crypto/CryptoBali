import OceanBackground from '@/components/OceanBackground'
import MenuCard from '@/components/MenuCard'
import ThemeBadge from '@/components/ThemeBadge'

export default function Page() {
  return (
    <main className="min-h-dvh relative">
      <OceanBackground />
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">CRYPTOBALI</h1>
            <p className="text-white/70 text-sm">Обмен криптовалют • Бали</p>
          </div>
          <ThemeBadge />
        </header>

        <div className="grid gap-4">
          <MenuCard href="/buy" title="Купить / Продать USDT" subtitle="Создать заявку" />
          <div className="grid grid-cols-2 gap-4">
            <MenuCard href="/rates" title="Курс" />
            <MenuCard href="/orders" title="Все заявки" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <MenuCard href="/support" title="Поддержка" />
            <MenuCard href="/about" title="О нас" />
          </div>
          <MenuCard href="/aml" title="AML проверка" subtitle="5 бесплатных проверок/мес" />
          <MenuCard href="/referrals" title="Реферальная программа" />
        </div>
      </div>
    </main>
  )
}