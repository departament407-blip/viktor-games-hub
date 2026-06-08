import type { Game } from "./games-types";

const saperAssetsBase = "/assets/games/saper-last-mistake";

export const gamesCatalog: Game[] = [
  {
    slug: "saper-last-mistake",
    title: "Сапёр: Последняя ошибка",
    description: "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
    playUrl: "https://game-saper-last-mistake-production.up.railway.app/",
    status: "published",
    detailsUrl: "#saper-last-mistake",
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
];
