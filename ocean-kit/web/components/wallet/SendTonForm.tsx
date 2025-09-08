'use client';
import { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address } from '@ton/core';
import { buildTonDeeplink } from '@/lib/deeplink';

export default function SendTonForm({ prefill }: { prefill?: { to?: string; amount?: string; comment?: string } }) {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [to, setTo] = useState(prefill?.to || '');
  const [amount, setAmount] = useState(prefill?.amount || '');
  const [comment, setComment] = useState(prefill?.comment || '');
  const [sending, setSending] = useState(false);

  async function onSend() {
    try {
      Address.parse(to); // will throw if invalid
    } catch {
      alert('Неверный адрес получателя');
      return;
    }
    const nano = BigInt(Math.round((parseFloat(amount || '0') || 0) * 1e9));
    if (nano <= 0n) return alert('Введите сумму > 0');
    setSending(true);
    try {
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [{
          address: to,
          amount: nano.toString(),
          stateInit: undefined,
          payload: comment ? btoa(new TextEncoder().encode(comment).reduce((acc, b) => acc + String.fromCharCode(b), "")) : undefined
        }]
      });
    } catch (e: any) {
      console.error(e);
      alert('Отправка отменена или ошибка');
    } finally {
      setSending(false);
    }
  }

  const deeplink = buildTonDeeplink(to, amount, comment);

  return (
    <div className="card grid" style={{gap:12}}>
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>Отправка TON</strong>
        <TonConnectButton />
      </div>
      <div className="grid cols2">
        <div><label>Адрес получателя</label><input value={to} onChange={e=>setTo(e.target.value)} placeholder="EQ..." /></div>
        <div><label>Сумма (TON)</label><input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.0" /></div>
      </div>
      <div><label>Комментарий</label><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Coffee" /></div>
      <div className="row">
        <button className="btn" onClick={onSend} disabled={!wallet || sending}>{sending ? 'Отправка...' : 'Отправить'}</button>
        <a href={deeplink} target="_blank" rel="noreferrer" className="pill" style={{border:'1px solid rgba(255,255,255,.2)'}}>Открыть в кошельке</a>
      </div>
      <div className="muted">Нужен подключенный кошелёк TonConnect.</div>
    </div>
  );
}
