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
    "playUrl": "/games/saper-last-mistake/",
    "status": "published"
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
      "playUrl": "/games/saper-last-mistake/",
      "status": "published"
    }
  ]
}
```

Если API недоступен, используется локальный список из `src/features/games/fallback-games.ts`.

Для отдельного API-домена можно задать:

```bash
VITE_API_BASE_URL=https://example.com
```
