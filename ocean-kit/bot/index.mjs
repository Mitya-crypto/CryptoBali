import 'dotenv/config';
import { Bot, InlineKeyboard } from 'grammy';

const token = process.env.BOT_TOKEN;
const webUrl = process.env.WEBAPP_URL;
if (!token || !webUrl) {
  console.error('Set BOT_TOKEN and WEBAPP_URL in .env');
  process.exit(1);
}

const bot = new Bot(token);

bot.command('start', async (ctx) => {
  const kb = {
    keyboard: [[{ text: 'Открыть CRYPTOBALI', web_app: { url: webUrl } }]],
    resize_keyboard: true,
    is_persistent: true
  };
  await ctx.reply('Привет! Это CRYPTOBALI Ocean 🌊', { reply_markup: kb });
  await ctx.reply('Быстрые действия:', {
    reply_markup: new InlineKeyboard()
      .url('Открыть миниап', webUrl)
      .row()
      .url('Создать платёж TON 1.23', `${webUrl}?asset=ton&to=EQ...&amount=1.23&comment=Coffee`)
  });
});

bot.command('pay', async (ctx) => {
  // /pay <amount> <EQ_to> [comment...]
  const parts = (ctx.match as string || '').trim().split(/\s+/);
  if (parts.length < 2) return ctx.reply('Формат: /pay <amount> <EQ_to> [comment]');
  const amount = parts[0];
  const to = parts[1];
  const comment = parts.slice(2).join(' ');
  const url = new URL(webUrl);
  url.searchParams.set('asset', 'ton');
  url.searchParams.set('amount', amount);
  url.searchParams.set('to', to);
  if (comment) url.searchParams.set('comment', comment);
  await ctx.reply('Открой для оплаты TON:', { reply_markup: new InlineKeyboard().url('Открыть', url.toString()) });
});

bot.command('payjet', async (ctx) => {
  // /payjet <masterJetton> <amount> <EQ_to> [comment...]
  const parts = (ctx.match as string || '').trim().split(/\s+/);
  if (parts.length < 3) return ctx.reply('Формат: /payjet <masterJetton> <amount> <EQ_to> [comment]');
  const master = parts[0];
  const amount = parts[1];
  const to = parts[2];
  const comment = parts.slice(3).join(' ');
  const url = new URL(webUrl);
  url.searchParams.set('asset', 'jetton');
  url.searchParams.set('jetton', master);
  url.searchParams.set('amount', amount);
  url.searchParams.set('to', to);
  if (comment) url.searchParams.set('comment', comment);
  await ctx.reply('Открой для оплаты Jetton:', { reply_markup: new InlineKeyboard().url('Открыть', url.toString()) });
});

bot.catch(err => console.error('Bot error', err));

bot.start();
console.log('CRYPTOBALI Ocean bot launched');
