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
