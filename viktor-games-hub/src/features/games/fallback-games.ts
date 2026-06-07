import type { Game } from "./games-types";

export const fallbackGames: Game[] = [
  {
    slug: "saper-last-mistake",
    title: "Сапёр: Последняя ошибка",
    description: "Тактический браузерный сапёр с оперативниками, HP, перками и биомами.",
    playUrl: "https://game-saper-last-mistake-production.up.railway.app/",
    status: "published",
    detailsUrl: "#saper-last-mistake",
    coverImage: "/assets/saper-last-mistake-cover.svg",
    coverAlt: "Обложка тактической браузерной игры Сапёр: Последняя ошибка",
    featured: true,
    tags: ["Тактика", "Сапёр", "Sci-fi", "Браузерная игра"],
  },
];
