import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'
import TronWeb from 'tronweb'
import Database from 'better-sqlite3'
import QRCode from 'qrcode'
import CryptoJS from 'crypto-js'

const BOT_TOKEN = process.env.BOT_TOKEN
const WEBAPP_URL = process.env.WEBAPP_URL
const ENC_KEY = process.env.ENCRYPTION_KEY || 'change_me_please'

if (!BOT_TOKEN) { console.error('BOT_TOKEN is missing'); process.exit(1) }
if (!WEBAPP_URL) { console.error('WEBAPP_URL is missing'); process.exit(1) }

const bot = new Telegraf(BOT_TOKEN)
const tronWeb = new TronWeb({ fullHost: 'https://api.trongrid.io' })

const db = new Database('db.sqlite')
db.pragma('journal_mode = WAL')
db.exec(`
  CREATE TABLE IF NOT EXISTS users(
    tg_id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    phone TEXT,
    verified INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
  CREATE TABLE IF NOT EXISTS wallets(
    tg_id INTEGER PRIMARY KEY,
    tron_address TEXT,
    tron_priv_enc TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  );
`)
const enc = (s: string) => CryptoJS.AES.encrypt(s, ENC_KEY).toString()

bot.start(async (ctx) => {
  const u = ctx.from!
  db.prepare(
    `INSERT OR IGNORE INTO users(tg_id, username, first_name) VALUES(?,?,?)`
  ).run(u.id, u.username ?? null, u.first_name ?? null)

  await ctx.reply(
    'Добро пожаловать в CRYPTOBALI 🌊',
    Markup.inlineKeyboard([
      [Markup.button.webApp('Открыть CRYPTOBALI', WEBAPP_URL!)],
      [Markup.button.callback('Кошелёк', 'wallet'), Markup.button.callback('Верификация', 'verify')]
    ])
  )
})

bot.action('verify', async (ctx) => {
  await ctx.answerCbQuery()
  const kb = Markup.keyboard([[Markup.button.contactRequest('Отправить номер телефона')]]).oneTime().resize()
  await ctx.reply('Для первичной верификации отправьте номер телефона кнопкой ниже.', kb)
})

bot.on('contact', async (ctx) => {
  const phone = ctx.message.contact.phone_number
  const id = ctx.from!.id
  db.prepare(`UPDATE users SET phone=?, verified=1 WHERE tg_id=?`).run(phone, id)
  await ctx.reply('Спасибо! Телефон подтверждён ✅', Markup.removeKeyboard())
})

bot.action('wallet', async (ctx) => {
  await ctx.answerCbQuery()
  const id = ctx.from!.id
  let row = db.prepare(`SELECT tron_address FROM wallets WHERE tg_id=?`).get(id) as { tron_address?: string } | undefined

  if (!row?.tron_address) {
    const acc = await tronWeb.createAccount()
    db.prepare(`INSERT INTO wallets(tg_id, tron_address, tron_priv_enc) VALUES(?,?,?)`)
      .run(id, acc.address.base58, enc(acc.privateKey))
    row = { tron_address: acc.address.base58 }
  }

  const addr = row.tron_address!
  const png = await QRCode.toBuffer(addr, { margin: 1, width: 320 })

  await ctx.replyWithPhoto(
    { source: png },
    {
      caption:
        `Ваш депозитный адрес **USDT (TRC-20)**:\n\`${addr}\`\n\n` +
        `Скопируйте адрес или используйте QR-код.\n\n` +
        `⚠️ MVP: авто-зачисления нет. После перевода пришлите TX ID оператору.`,
      parse_mode: 'Markdown'
    }
  )
})
bot.command('qr', async (ctx) => {
  const n = Number(ctx.message.text.split(' ')[1] || '0')
  if (!(n > 0)) return ctx.reply('Пример: /qr 150  (сумма в USDT)')
  const id = ctx.from!.id
  const row = db.prepare(`SELECT tron_address FROM wallets WHERE tg_id=?`).get(id) as { tron_address?: string } | undefined
  if (!row?.tron_address) return ctx.reply('Сначала создайте кошелёк: «Кошелёк».')
  const payload = `${row.tron_address}?amount=${n}`
  const png = await QRCode.toBuffer(payload, { margin: 1, width: 320 })
  await ctx.replyWithPhoto({ source: png }, { caption: `QR для оплаты на ${n} USDT` })
})
bot.launch()
console.log('CRYPTOBALI bot launched')
