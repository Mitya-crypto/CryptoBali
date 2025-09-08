'use client';
import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { buildTonDeeplink, buildJettonDeeplink } from '@/lib/deeplink';

export default function RequestPayment() {
  const [asset, setAsset] = useState<'ton'|'jetton'>('ton');
  const [to, setTo] = useState(''); // заполни своим адресом для приёма
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [master, setMaster] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [link, setLink] = useState('');

  useEffect(() => {
    const l = asset === 'ton' ? buildTonDeeplink(to, amount, comment) : buildJettonDeeplink(master, to, amount, comment);
    setLink(l);
    if (canvasRef.current) QRCode.toCanvas(canvasRef.current, l, { margin: 1, scale: 6 });
  }, [asset, to, amount, comment, master]);

  return (
    <div className="card grid" style={{gap:12}}>
      <strong>Запросить платёж</strong>
      <div className="grid cols2">
        <div>
          <label>Актив</label>
          <select value={asset} onChange={e=>setAsset(e.target.value as any)}>
            <option value="ton">TON</option>
            <option value="jetton">Jetton</option>
          </select>
        </div>
        <div>
          <label>Сумма</label>
          <input value={amount} onChange={e=>setAmount(e.target.value)} placeholder="1.23" />
        </div>
      </div>
      {asset === 'jetton' && (
        <div><label>Master Jetton</label><input value={master} onChange={e=>setMaster(e.target.value)} placeholder="kQ..." /></div>
      )}
      <div><label>Адрес получателя (ваш)</label><input value={to} onChange={e=>setTo(e.target.value)} placeholder="EQ..." /></div>
      <div><label>Комментарий</label><input value={comment} onChange={e=>setComment(e.target.value)} placeholder="Invoice #42" /></div>
      <div className="row">
        <canvas ref={canvasRef} style={{ background:'#fff', borderRadius: 8 }} />
        <a href={link} target="_blank" rel="noreferrer" className="pill" style={{border:'1px solid rgba(255,255,255,.2)'}}>Открыть ссылку</a>
      </div>
      <div className="muted">Сканируйте QR или отправьте ссылку плательщику.</div>
    </div>
  );
}
