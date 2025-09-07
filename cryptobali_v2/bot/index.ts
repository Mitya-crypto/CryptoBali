import 'dotenv/config'
import { Telegraf, Markup } from 'telegraf'

const BOT_TOKEN = process.env.BOT_TOKEN!
const WEBAPP_URL = process.env.WEBAPP_URL!

const bot = new Telegraf(BOT_TOKEN)

bot.start(async (ctx) => {
  await ctx.reply(
    'Добро пожаловать в CRYPTOBALI! Откройте мини-приложение:',
    Markup.keyboard([
      [Markup.button.webApp('Открыть CRYPTOBALI', WEBAPP_URL)],
      ['Обмен', 'Курсы']
    ]).resize()
  )
  try {
    await ctx.telegram.setChatMenuButton({
      chatId: ctx.chat?.id,
      menuButton: { type: 'web_app', text: 'CRYPTOBALI', web_app: { url: WEBAPP_URL } }
    })
  } catch {}
})

bot.hears('Обмен', (ctx) => ctx.reply('Открываем обмен', Markup.inlineKeyboard([
  Markup.button.webApp('Купить/Продать USDT', WEBAPP_URL + '/buy')
])))

bot.hears('Курсы', (ctx) => ctx.reply('Текущие курсы', Markup.inlineKeyboard([
  Markup.button.webApp('Открыть курсы', WEBAPP_URL + '/rates')
])))

bot.launch()
console.log('CRYPTOBALI bot launched')
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))