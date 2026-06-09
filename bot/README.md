# English Bog Telegram Bot MVP

MVP Telegram-бота для мини-воронки репетитора английского Dave Englishbad / English Bog.

Бот умеет:

- принимать пользователей из разных источников через deep-link;
- показывать меню;
- выдавать материалы после подписки на Telegram-канал;
- проводить мини-тест;
- собирать ответы и контакт после теста;
- отправлять контакт админу в Telegram;
- отправлять админу незавершенную форму, если пользователь вышел в меню во время теста;
- вести Excel-таблицу `data/analytics.xlsx` с пользователями и ключевыми действиями;
- держать простую структуру для дальнейшего подключения базы, рассылок и CRM.

## 1. Создать бота через BotFather

1. Откройте Telegram и найдите `@BotFather`.
2. Отправьте команду `/newbot`.
3. Укажите имя и username бота.
4. Скопируйте токен вида `1234567890:AA...`.

## 2. Настроить `.env`

Скопируйте пример:

```bash
cp .env.example .env
```

Заполните значения:

```env
BOT_TOKEN=токен_бота_от_BotFather
ADMIN_IDS=123456789,987654321
CHANNEL_USERNAME=@englishbogg
CHANNEL_URL=https://t.me/englishbogg
MATERIALS_URL=https://englishbog.taplink.ws/
WELCOME_VIDEO_NOTE_FILE_ID=sources/video.mp4
```

`ADMIN_IDS` - Telegram ID админов, которым будут приходить контакты пользователей.

`CHANNEL_USERNAME` нужен для проверки подписки через `getChatMember`. Чтобы проверка работала надежно, добавьте бота админом в канал. Если проверка недоступна, бот не сломает сценарий и выдаст материалы мягко.

`WELCOME_VIDEO_NOTE_FILE_ID` - необязательный file_id видео-кружочка или путь к локальному mp4-файлу относительно папки `bot`, например `sources/video.mp4`. Если заполнить, бот будет отправлять кружочек перед приветственным текстом и кнопками.

## 3. Установить зависимости

Нужен Python 3.11+.

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

## 4. Запустить

Из папки `bot`:

```bash
python -m app.main
```

Также поддерживается запуск:

```bash
python app/main.py
```

## 5. Deep-link ссылки

Замените `BOT_USERNAME` на username вашего бота:

```text
https://t.me/English_bog_bot?start=materials
https://t.me/English_bog_bot?start=test
https://t.me/English_bog_bot?start=site
https://t.me/English_bog_bot?start=insta
https://t.me/English_bog_bot?start=lead
```

Заложены будущие источники: `reels_1`, `reels_2`, `avito`, `tg_channel`, `campaign_1`. Неизвестные параметры тоже сохраняются как источник контакта.

## Структура

```text
bot/
  app/
    main.py
    config.py
    keyboards/
    handlers/
    states/
    services/
    utils/
  .env.example
  requirements.txt
  README.md
```

На этом этапе полноценная база данных, сайт, Instagram API, CRM и массовые рассылки не подключены. Вместо базы бот ведет локальный Excel-файл `data/analytics.xlsx`. Команда `/admin` отправляет этот файл администратору, если он уже создан.
