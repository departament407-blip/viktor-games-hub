# Viktor Games Lab

Frontend-хаб для браузерных игр Viktor Games Lab. Сейчас это статический React/Vite сайт с локальным fallback-каталогом игр и готовой точкой подключения будущего API `GET /api/games`.

## Стек

- React
- TypeScript
- Vite
- Tailwind CSS без тяжелых UI-библиотек
- Railway для деплоя

## Локальный запуск

```bash
npm install
npm run dev
```

По умолчанию Vite поднимет dev server на `http://localhost:5173`.

## Build

```bash
npm run build
```

Собранный frontend появится в папке `dist`.

## Static start

```bash
npm run start
```

Команда отдает собранный `dist` через `serve`. Для локальной проверки сначала выполните `npm run build`.

## Railway deploy

Проект содержит `railway.toml`:

- build command: `npm install && npm run build`
- start command: `npm run start`

Railway передаст порт через переменную `PORT`, а `serve` будет слушать `0.0.0.0`.

## GitHub Actions deploy

В репозитории есть workflow `.github/workflows/deploy-viktor-games-hub.yml`. Он запускается при push в `main` или `master`, если изменились файлы хаба, а также вручную через `workflow_dispatch`.

Нужно добавить GitHub secret:

```text
RAILWAY_TOKEN
```

Это должен быть Railway Project Token для нужного проекта/окружения.

Опционально можно добавить GitHub repository variables:

```text
RAILWAY_SERVICE
RAILWAY_ENVIRONMENT
```

`RAILWAY_SERVICE` нужен, если в Railway-проекте несколько сервисов. `RAILWAY_ENVIRONMENT` нужен, если нужно явно выбрать окружение.

## How to edit content

Основные тексты сайта вынесены в `src/shared/config/site-content.ts`.
Там можно менять:

- название сайта: `siteName`;
- hero-заголовок: `heroTitle`;
- описание hero: `heroDescription`;
- текст главной кнопки: `primaryButtonText`;
- заголовок каталога: `catalogTitle`;
- заголовок и описание блока About: `aboutTitle`, `aboutDescription`;
- текст футера: `footerText`;
- SEO-тексты: `seoTitle`, `seoDescription`;
- подписи кнопок, статусов, навигации и футера.

Каталог игр редактируется в `src/features/games/games-catalog.ts`.
Там меняются:

- название и описание игры: `title`, `description`;
- ссылка на игру: `playUrl`;
- ссылка "Подробнее": `detailsUrl`;
- статус: `status`;
- жанры и теги: `tags`;
- пути к картинкам: `coverImage`, `iconImage`, `heroImage`, `screenshots`.

Ассеты лежат в `public/assets`. Для Сапёра используются файлы из `public/assets/games/saper-last-mistake`.

После изменения текстов, ссылок или картинок выполните:

```bash
npm run build
git add .
git commit -m "Update site content"
git push
```

Railway сейчас деплоит ветку `master`, поэтому для обычной работы создавайте отдельную ветку и открывайте Pull Request в `master`. Прямой push в `master` сразу уйдёт в production.

## How to replace images

Все публичные ассеты лежат в `public/assets`.

Брендовые картинки:

```text
public/assets/brand/logo.svg
public/assets/brand/favicon.svg
public/assets/brand/apple-touch-icon.png
public/assets/brand/og-image.png
```

Картинки игры `Сапёр: Последняя ошибка`:

```text
public/assets/games/saper-last-mistake/icon.png
public/assets/games/saper-last-mistake/cover.png
public/assets/games/saper-last-mistake/hero.png
public/assets/games/saper-last-mistake/card-preview.png
public/assets/games/saper-last-mistake/screenshots/screenshot-01.png
public/assets/games/saper-last-mistake/screenshots/screenshot-02.png
public/assets/games/saper-last-mistake/screenshots/screenshot-03.png
```

Чтобы заменить обложку Сапёра, положите новый файл вместо `public/assets/games/saper-last-mistake/cover.png`.
Чтобы заменить большую hero-картинку, замените `hero.png`.
Чтобы заменить картинку карточки в каталоге, замените `card-preview.png`.
Чтобы заменить иконку игры, замените `icon.png`.
Чтобы заменить social preview для шаринга, замените `public/assets/brand/og-image.png`.
Чтобы заменить favicon, замените `public/assets/brand/favicon.svg`.

Пути к игровым ассетам описаны в `src/features/games/games-catalog.ts`. Если имена файлов остаются такими же, React-код менять не нужно. После замены файлов выполните:

```bash
npm run build
git add .
git commit -m "Update game assets"
git push
```

Если Railway подключён к `master`, пушьте изменения в feature-ветку и мержите через Pull Request.

## Будущий API `/api/games`

При загрузке хаб делает запрос:

```http
GET /api/games
```

Поддерживаются оба формата ответа:

```json
[
  {
    "slug": "saper-last-mistake",
    "title": "Сапёр: Последняя ошибка",
    "description": "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
    "playUrl": "https://game-saper-last-mistake-production.up.railway.app/",
    "status": "published",
    "iconImage": "/assets/games/saper-last-mistake/icon.png",
    "coverImage": "/assets/games/saper-last-mistake/cover.png",
    "heroImage": "/assets/games/saper-last-mistake/hero.png",
    "cardPreviewImage": "/assets/games/saper-last-mistake/card-preview.png",
    "screenshots": [
      "/assets/games/saper-last-mistake/screenshots/screenshot-01.png",
      "/assets/games/saper-last-mistake/screenshots/screenshot-02.png",
      "/assets/games/saper-last-mistake/screenshots/screenshot-03.png"
    ]
  }
]
```

или:

```json
{
  "games": [
    {
      "slug": "saper-last-mistake",
      "title": "Сапёр: Последняя ошибка",
      "description": "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
      "playUrl": "https://game-saper-last-mistake-production.up.railway.app/",
      "status": "published",
      "iconImage": "/assets/games/saper-last-mistake/icon.png",
      "coverImage": "/assets/games/saper-last-mistake/cover.png",
      "heroImage": "/assets/games/saper-last-mistake/hero.png",
      "cardPreviewImage": "/assets/games/saper-last-mistake/card-preview.png",
      "screenshots": [
        "/assets/games/saper-last-mistake/screenshots/screenshot-01.png",
        "/assets/games/saper-last-mistake/screenshots/screenshot-02.png",
        "/assets/games/saper-last-mistake/screenshots/screenshot-03.png"
      ]
    }
  ]
}
```

Если API недоступен, используется локальный список из `src/features/games/games-catalog.ts`.

Для отдельного API-домена можно задать:

```bash
VITE_API_BASE_URL=https://example.com
```
