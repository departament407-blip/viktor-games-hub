import type { Game } from "./games-types";

const saperAssetsBase = "/assets/games/saper-last-mistake";

export const gamesCatalog: Game[] = [
  {
    slug: "saper-last-mistake",
    title: "Сапёр: Последняя ошибка",
    description:
      "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
    playUrl: "https://game-saper-last-mistake-production.up.railway.app/",
    status: "published",
    iconImage: `${saperAssetsBase}/squad-bar.webp`,
    coverImage: `${saperAssetsBase}/cover.png`,
    heroImage: `${saperAssetsBase}/hero.png`,
    cardPreviewImage: `${saperAssetsBase}/squad-bar.webp`,
    coverAlt: "Шесть сапёров обнимаются за столиком в баре",
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
    title: "Шакал",
    subtitle: "Остров потерянного золота",
    description:
      "Открывай остров клетка за клеткой и доставляй золото на корабль. Играй с друзьями по коду комнаты или против 1–3 ботов.",
    playUrl: "https://game-backend-production-550d.up.railway.app/",
    status: "published",
    cardPreviewImage: "/assets/games/pirate-tabletop/pirate-cover.webp",
    coverAlt: "Пират с компасом и сокровищами на тропическом острове",
    tags: ["Настольная стратегия", "Онлайн", "Соло"],
  },
];

export const upcomingGames: Game[] = [
  {
    slug: "tyaga-k-nebu",
    title: "Тяга к небу",
    description: "Среди обломков на далёкой планете в небо поднимается самолёт.",
    status: "announced",
    cardPreviewImage: "/assets/games/tyaga-k-nebu/poster.webp",
    coverAlt: "Постер «Тяга к небу»: человек у разбитого корабля тянется вслед взлетающему самолёту.",
    tags: ["Фантастика", "Полёт"],
  },
];
