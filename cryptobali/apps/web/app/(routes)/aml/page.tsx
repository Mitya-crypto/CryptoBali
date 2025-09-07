'use client'
import { useState } from 'react'
import axios from 'axios'

export default function AMLPage() {
  const [addr, setAddr] = useState('')
  const [left, setLeft] = useState(5)
  const [res, setRes] = useState<null | { score:number; verdict:string }>(null)

  async function check() {
    if (left <= 0) return alert('Лимит проверок исчерпан')
    if (!/^[TA][A-Za-z0-9]{33}$/.test(addr)) return alert('Введите TRC-20 адрес (34 символа)')
    const r = await axios.post('/api/aml', { address: addr })
    setRes(r.data)
    setLeft(v => v-1)
  }

  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">AML ПРОВЕРКА</h2>
        <label className="label">Адрес кошелька TRC-20 (34 символа)*</label>
        <input className="input" placeholder="T..." value={addr} onChange={e=>setAddr(e.target.value)} />
        <div className="text-yellow-300/90 text-sm mt-2">Внимание! Доступны {left} бесплатных проверок в месяц.</div>
        <div className="mt-4 flex gap-3">
          <button className="btn btn-primary" onClick={check}>Проверить кошелёк</button>
          <a href="/" className="btn btn-ghost">Перейти на главный экран</a>
        </div>
        {res && (
          <div className="card p-5 mt-6">
            <div className="text-lg font-semibold">Результат</div>
            <div className="text-white/80 mt-2">Риск‑скор: {res.score}</div>
            <div className="text-white/80">Вердикт: {res.verdict}</div>
          </div>
        )}
      </div>
    </main>
  )
}