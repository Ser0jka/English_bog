# English Bog Site MVP

Чистый каркас лендинга для English Bog. Сейчас подключены базовая структура Next.js, TypeScript, SCSS Modules, общие компоненты и ссылки для CTA в Telegram-бота.

## Запуск

```bash
pnpm install
pnpm dev
```

Откройте `http://localhost:3000`.

Если порт `3000` занят:

```bash
pnpm dev:3002
```

Откройте `http://localhost:3002`.

## Где менять ссылки

Все основные ссылки лежат в `src/data/links.ts`.

Пока `BOT_USERNAME` оставлен placeholder, его нужно заменить на username реального Telegram-бота.

## Структура

```text
src/
  app/
  components/
  shared/
  data/
  styles/
```

Верстку следующих блоков можно добавлять по одному в `src/components`, не переписывая весь проект.
