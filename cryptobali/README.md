# CRYPTOBALI — Telegram Mini App (Surf Style)

Океанский UI с автосменой темы по времени Бали (день/закат/ночь), мок‑API и телеграм‑бот.

## Быстрый старт
```bash
# Установка
cd apps/web && npm i && cd ../../
cd apps/bot && npm i && cd ../../

# WebApp
cd apps/web
cp .env.local.example .env.local
npm run dev   # http://localhost:3000

# Bot
cd ../bot
cp .env.example .env
# укажи BOT_TOKEN и WEBAPP_URL=http://localhost:3000
npm run dev
```