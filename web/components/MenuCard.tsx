import Link from 'next/link'

export default function MenuCard({ href, title, subtitle }: { href: string; title: string; subtitle?: string }) {
  return (
    <Link href={href} className="card p-5 hover:scale-[1.01] transition block">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle && <div className="text-white/70 text-sm mt-1">{subtitle}</div>}
    </Link>
  )
}