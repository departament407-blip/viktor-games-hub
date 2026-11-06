import type { Game } from "./games-types";

const saperAssetsBase = "/assets/games/saper-last-mistake";

export const gamesCatalog: Game[] = [
  {
    slug: "saper-last-mistake",
    title: "Сапёр: Последняя ошибка",
    description: "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
    playUrl: "https://game-saper-last-mistake-production.up.railway.app/",
    status: "published",
    iconImage: `${saperAssetsBase}/icon.png`,
    coverImage: `${saperAssetsBase}/cover.png`,
    heroImage: `${saperAssetsBase}/hero.png`,
    cardPreviewImage: `${saperAssetsBase}/card-preview.png`,
    coverAlt: "Обложка тактической браузерной игры Сапёр: Последняя ошибка",
    featured: true,
    screenshots: [
      `${saperAssetsBase}/screenshots/screenshot-01.png`,
      `${saperAssetsBase}/screenshots/screenshot-02.png`,
      `${saperAssetsBase}/screenshots/screenshot-03.png`,
    ],
    tags: ["Тактика", "Сапёр", "Sci-fi", "Браузерная игра"],
  },
  {
    slug: "pirate-tabletop",
    title: "Pirate Tabletop",
    description: "Открывай остров клетка за клеткой и доставляй золото на корабль. Играй с друзьями по коду комнаты или против 1–3 ботов.",
    playUrl: "https://game-backend-production-550d.up.railway.app/",
    status: "alpha",
    cardPreviewImage: "/assets/games/pirate-tabletop/board.webp",
    coverAlt: "Игровое поле Pirate Tabletop с открытыми тайлами острова",
    tags: ["Настольная стратегия", "Онлайн", "Соло"],
  },
];

export const upcomingGames: Game[] = [
  {
    slug: "vlastitel-galaktiki",
    title: "Властитель Галактики",
    description: "В прототипе космической RTS материнский корабль отправляет приказы зонду. Чем дальше зонд, тем позже приходит ответ. Сейчас это прототип для Windows.",
    status: "prototype",
    cardPreviewImage: "/assets/games/vlastitel-galaktiki/sector.svg",
    coverAlt: "Схема маршрута и связи с зондом",
    tags: ["Космическая RTS", "Windows"],
  },
];
