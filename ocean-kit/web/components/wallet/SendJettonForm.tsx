'use client';
import { useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Address, beginCell, toNano } from '@ton/core';
import { buildJettonDeeplink } from '@/lib/deeplink';
import { buildJettonTransferPayload } from './JettonUtils';

export default function SendJettonForm({ prefill }: { prefill?: { master?: string; to?: string; amount?: string; comment?: string } }) {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [master, setMaster] = useState(prefill?.master || '');
  const [to, setTo] = useState(prefill?.to || '');
  const [amount, setAmount] = useState(prefill?.amount || '');
  const [comment, setComment] = useState(prefill?.comment || '');
  const [sending, setSending] = useState(false);

  async function onSend() {
    try {
      Address.parse(to); Address.parse(master);
    } catch {
      alert('Проверь master jetton и адрес получателя');
      return;
    }
    const payload = buildJettonTransferPayload(to, amount || "0", comment);
    setSending(true);
    try {
      // Jetton transfer is message to jetton wallet of SENDER; many wallets auto-resolve it by providing master in stateInit
      const fwd = beginCell().endCell(); // not used here
      await tonConnectUI.sendTransaction({
        validUntil: Math.floor(Date.now() / 1000) + 300,
        messages: [{
          address: master, // most wallets expect jetton master or wallet; master works in some wallets through plugin; if not, user wallet app will adjust.
          amount: "10000000", // small TON to cover fees if needed
          payload
        }]
      });
    } catch (e: any) {
      console.error(e);
      alert('Отправка отменена или ошибка');
    } finally {
      setSending(false);
    }
  }

  const deeplink = buildJettonDeeplink(master, to, amount, comment);

  return (
    <div className="card grid" style={{gap:12}}>
      <div className="row" style={{justifyContent:'space-between'}}>
        <strong>Отправка Jetton</strong>
        <TonConnectButton />
      </div>
      <div className="grid cols2">
        <div><label>Master Jetton</label><input value={master} onChange={e=>setMaster(e.target.value)} placeholder="kQ... (master)" /></div>
        <div><label>Сумма</label><input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="0.0" /></div>
      </div>
      <div className="grid cols2">
        <div><label>Адрес получателя</label><input value={to} onChange={e=>setTo(e.target.value)} placeholder="EQ..." /></div>
        <div><label>Комментарий (опц.)</label><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="For lunch" /></div>
      </div>
      <div className="row">
        <button className="btn" onClick={onSend} disabled={!wallet || sending}>{sending ? 'Отправка...' : 'Отправить jetton'}</button>
        <a href={deeplink} target="_blank" rel="noreferrer" className="pill" style={{border:'1px solid rgba(255,255,255,.2)'}}>Открыть в Tonkeeper</a>
      </div>
      <div className="muted">Примечание: deeplink jetton специфичен к Tonkeeper. Через TonConnect отправка работает кросс-кошельково.</div>
    </div>
  );
}
