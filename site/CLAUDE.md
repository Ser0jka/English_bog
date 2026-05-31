# English Bog — MVP Landing Page

## Проект
Лендинг для репетитора английского Dave Englishbad / English Bog.  
Сайт-референс: https://englishbad.shop/  
Путь: `C:\Users\sersu\Desktop\English_bog\site`

## Стек
- Next.js + TypeScript
- SCSS Modules (без Tailwind, без UI-библиотек)
- pnpm
- Dev-сервер: localhost:3007

## Структура src/
```
src/
  app/
    page.tsx         ✅
    layout.tsx       ✅
    globals.scss     ✅
  components/
    Hero/            ✅
    ForWhom/         ✅
    Blessed/         ✅
    Program/         ✅
    SkillCarousel/   ✅
    Footer/          ✅
  shared/
    Button/          ✅
    Container/       ✅
    Section/         ✅
  data/
    links.ts         ✅
    content.ts       ✅
  styles/
    variables.scss   ✅
    mixins.scss      ✅
    reset.scss       ✅
```

## Папка с ТЗ и макетами
```
site/tz/
  heroblock/        pc.png, laptop.png, phone.png, tz.txt
  secondblock/      pc.png, laptop.png, phone.png, tz.txt
  blessedblock/     pc.png, laptop.png, phone.png, tz.txt
  plan/             pc.png, laptop.png, phone.png, tz.txt
  Skillcarousel/    pc.png, laptop.png, phone.png, tz.txt
  price/            pc.png, laptop.png, phone.png, tz.txt
  bigCtaButton/     pc.png, laptop.png, phone.png, tz.txt
  reviews/          pc.png, laptop.png, phone.png, tz.txt
  Faq/              pc.png, laptop.png, phone.png, tz.txt
  footer/           pc.png, laptop.png, phone.png, tz.txt
```

## Выполненные блоки

### ✅ Header
- Логотип / имя Dave Englishbad
- Навигация (якорные ссылки)
- CTA-кнопка

### ✅ Hero (heroblock)
- Главный заголовок «ГОВОРИ НА АНГЛИЙСКОМ КАК НОСИТЕЛЬ»
- Подзаголовок
- CTA-кнопки → telegramBotMaterials, telegramBotTest
- Placeholder для фото Дейва (пустой div.photoSlot)
- Адаптив: 1920 / 1440 / 1024 / 768 / 360px

### ✅ ForWhom (secondblock)
- Кому подходят занятия
- Карточки по категориям

### ✅ Blessed (blessedblock)
- Заголовок «К счастью, у меня есть решение»
- Три плейсхолдера: photoBg (фон-флаг), photoPerson (Дейв), photoBubble (облачко)
- Все три — пустые div'ы, готовые под замену на <Image>
- Текст «GOD BLESS DAVE» — золотой градиентный CSS
- Звёзды ★★★ золотые
- Поле bubble удалено из content.ts

### ✅ Program (plan)
- Заголовок «Программа практикума»
- 3 карточки: Блок 1 Гласные 😊, Блок 2 Согласные, Блок 3 Закрепляем (красная)
- Уроки с CSS tooltip на :hover
- photoSlot в карточке 3 — пустой div под фото
- Кнопка «ПРИСОЕДИНИТЬСЯ»
- Адаптив: 3 колонки → 2 → 1

### ✅ SkillCarousel (Skillcarousel)
- Scroll-based карусель: wrapper = 300vh, section = sticky 100vh
- Три слайда: тебя не понимают / не различаешь слова / акцент выдаёт
- Scroll listener считает позицию через getBoundingClientRect
- **ВАЖНО:** последнее незавершённое задание — убрать магнитный снап,
  сделать непрерывное движение трека пропорционально прокрутке (translateX как %)
- photoSlot — пустой div под фото
- videoSlot — div с play-кнопкой, наклон через style={{ rotate }} (-6° / +5° / -4°)
- Точки навигации: клик → window.scrollTo()

## Блоки ещё не сделаны
Все блоки MVP готовы ✅

## Правила проекта
- Все ссылки только через `src/data/links.ts`
- Вместо форм — CTA-кнопки в Telegram
- Изображения — пустые div-плейсхолдеры, без inline-стилей внутри
- Каждый компонент независим, не трогать уже готовые при добавлении нового
- После каждого блока запускать `npx next build` для проверки

## Ссылки (links.ts)
```ts
telegramBotDefault:    "https://t.me/BOT_USERNAME"
telegramBotMaterials:  "https://t.me/BOT_USERNAME?start=materials"
telegramBotTest:       "https://t.me/BOT_USERNAME?start=test"
telegramBotSite:       "https://t.me/BOT_USERNAME?start=site"
telegramBotLead:       "https://t.me/BOT_USERNAME?start=lead"
telegramChannel:       "https://t.me/englishbogg"
instagram:             "https://www.instagram.com/english_bog/"
```

## Следующий шаг после открытия сессии
MVP лендинг полностью сверстан. Все блоки собираются без ошибок (`npx next build`).
Следующие задачи:
- Вставить реальные фото/видео вместо div-заглушек (photoSlot, videoSlot, bubbleSlot)
- Подключить реальный Telegram-бот (поменять BOT_USERNAME в links.ts)
- Деплой на продакшн
