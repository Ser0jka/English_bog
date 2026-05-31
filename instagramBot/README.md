# English Bog Instagram Bot MVP

Webhook-сервис для сценария: человек пишет ключевое слово в комментарии под Reels, сервис получает webhook от Meta и отправляет private reply в Instagram Direct со ссылкой на Telegram-бота.

## Что важно знать

Официальный путь для такого сценария: Instagram Professional account + Meta app + webhooks по комментариям + Instagram Messaging API / Private Replies. Нельзя безопасно делать это через парсинг браузера или неофициальные Instagram-клиенты.

По документации Meta/Postman для Instagram API: Instagram API работает с Professional accounts, consumer accounts не поддерживаются; сообщения через Send API доступны для Instagram professional account, а для работы нужны соответствующие permissions и token. Private reply отправляется через endpoint `/{ig_user_id}/messages` с получателем по `comment_id`.

Нужно будет получить доступы и разрешения Meta. Для Instagram API с Facebook Login нужны Professional account и связанная Facebook Page; для комментариев и сообщений используются permissions вроде `instagram_manage_comments`, `instagram_business_manage_comments`, `instagram_business_manage_messages` в зависимости от выбранного API setup.

## Запуск локально

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload --port 8001
```

Проверка:

```bash
curl http://127.0.0.1:8001/health
```

## Настройка `.env`

```env
META_VERIFY_TOKEN=любой_секрет_для_проверки_webhook
META_APP_SECRET=секрет_приложения_meta
INSTAGRAM_ACCESS_TOKEN=токен_с_нужными_permissions
IG_USER_ID=id_instagram_professional_account
GRAPH_API_VERSION=v22.0

TELEGRAM_BOT_LINK=https://t.me/BOT_USERNAME?start=insta
TRIGGER_KEYWORDS=материал,материалы,ссылка,тест,урок,link
ALLOW_ANY_COMMENT=false
DRY_RUN=true
SKIP_SIGNATURE_VALIDATION=false
PUBLIC_COMMENT_REPLY_ENABLED=false
```

`DRY_RUN=true` оставляет сервис в безопасном режиме: он принимает webhook и показывает, что отправил бы в Direct, но не делает реальный запрос в Meta.

`SKIP_SIGNATURE_VALIDATION=true` можно использовать только локально для тестовых POST из Meta Dashboard, если подпись dashboard-теста не совпадает с App Secret. В production оставляйте `false`.

Когда Meta app, permissions и webhook готовы, можно поставить:

```env
DRY_RUN=false
```

## Webhook URL

Для локальной разработки нужен публичный HTTPS URL, например через ngrok:

```bash
ngrok http 8001
```

В Meta App Dashboard укажите:

```text
Callback URL: https://your-ngrok-url/webhook
Verify token: значение META_VERIFY_TOKEN
```

## Логика MVP

1. Meta отправляет POST `/webhook` при комментарии.
2. Сервис вытаскивает `comment_id`, `text`, `media_id`, `username`.
3. Проверяет комментарий по ключевым словам из `TRIGGER_KEYWORDS`.
4. Если есть совпадение, отправляет private reply в Direct:

```text
Привет! Спасибо за комментарий 🙌

Собрал для тебя материалы и короткий тест по английскому. Забрать можно здесь:
https://t.me/BOT_USERNAME?start=insta
```

5. Опционально может публично ответить на комментарий: `Спасибо! Отправил ссылку в Direct 🙌`.

## Тест webhook без Meta

В PowerShell:

```powershell
Invoke-RestMethod `
  -Uri http://127.0.0.1:8001/webhook `
  -Method Post `
  -ContentType "application/json" `
  -InFile .\examples\comment_webhook.json
```

Ожидаемый ответ в `DRY_RUN=true`:

```json
{
  "ok": true,
  "events": 1,
  "handled": [
    {
      "comment_id": "17900000000000000",
      "sent": true,
      "keyword": "материал",
      "dry_run": true
    }
  ]
}
```

## Следующие шаги

- завести Meta app;
- подключить Instagram Professional account к Facebook Page;
- настроить webhook на комментарии;
- получить нужные permissions и long-lived token;
- заменить `BOT_USERNAME` в `TELEGRAM_BOT_LINK`;
- выключить `DRY_RUN`.
