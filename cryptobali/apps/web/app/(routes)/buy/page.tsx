'use client'
import { useState } from 'react'
import axios from 'axios'

export default function BuySellPage() {
  const [amount, setAmount] = useState('')
  const [lastId, setLastId] = useState<number | null>(null)
  const [fields, setFields] = useState({ lastName:'', firstName:'', middleName:'', trc20:'' })
  const [agree, setAgree] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!agree) return alert('Подтвердите правила сервиса')
    if (!/^[TA][A-Za-z0-9]{33}$/.test(fields.trc20)) return alert('Неверный TRC-20 адрес (34 символа)')
    setLoading(true)
    try {
      const res = await axios.post('/api/orders', { amount: Number(amount), ...fields })
      setLastId(res.data.id)
    } finally { setLoading(false) }
  }

  return (
    <main className="min-h-dvh relative">
      <div className="mx-auto max-w-xl px-5 pt-10 pb-24">
        <h2 className="text-2xl font-semibold mb-6">Введите сумму в рублях</h2>

        <label className="label">Сумма, RUB</label>
        <input className="input" placeholder="20000" value={amount} onChange={e=>setAmount(e.target.value)} />

        <div className="mt-6 grid grid-cols-1 gap-4">
          <div>
            <label className="label">Фамилия*</label>
            <input className="input" value={fields.lastName} onChange={e=>setFields(v=>({...v,lastName:e.target.value}))} />
          </div>
          <div>
            <label className="label">Имя*</label>
            <input className="input" value={fields.firstName} onChange={e=>setFields(v=>({...v,firstName:e.target.value}))} />
          </div>
          <div>
            <label className="label">Отчество*</label>
            <input className="input" value={fields.middleName} onChange={e=>setFields(v=>({...v,middleName:e.target.value}))} />
          </div>
          <div>
            <label className="label">Адрес кошелька TRC-20 (34 символа)*</label>
            <input className="input" placeholder="T..." value={fields.trc20} onChange={e=>setFields(v=>({...v,trc20:e.target.value}))} />
          </div>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm text-white/80">
          <input type="checkbox" checked={agree} onChange={e=>setAgree(e.target.checked)} />
          Я прочитал <a className="underline" href="#">правила</a> и принимаю условия сервиса
        </label>

        <div className="mt-6 flex gap-3">
          <button onClick={submit} disabled={loading} className="btn btn-primary">{loading? 'Создание...' : 'Создать заявку'}</button>
        </div>

        {lastId && (
          <div className="card p-5 mt-6">
            <div className="text-green-400 font-semibold">Заявка создана ✓</div>
            <div className="text-sm text-white/70 mt-1">Номер заявки: {lastId}</div>
            <a className="btn btn-ghost mt-4 inline-block" href="/orders">Перейти во все заявки</a>
          </div>
        )}

        <a className="btn btn-ghost mt-8 inline-block" href="/">На главный экран</a>
      </div>
    </main>
  )
}