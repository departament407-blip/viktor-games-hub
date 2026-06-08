import type { Game } from "./games-types";

const saperAssetsBase = "/assets/games/saper-last-mistake";
const placeholdersBase = "/assets/placeholders";

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

export const upcomingGames: Game[] = [
  {
    slug: "operation-blackout",
    title: "Операция: Blackout",
    description: "Короткая тактическая головоломка про энергию, риск и решения под давлением.",
    playUrl: undefined,
    status: "planned",
    detailsUrl: "#about-lab",
    iconImage: `${placeholdersBase}/coming-soon-icon.svg`,
    coverImage: `${placeholdersBase}/coming-soon-cover.svg`,
    heroImage: `${placeholdersBase}/coming-soon-cover.svg`,
    cardPreviewImage: `${placeholdersBase}/coming-soon-cover.svg`,
    coverAlt: "Временная обложка игры, которая скоро появится",
    screenshots: [],
    tags: ["Coming soon", "Puzzle", "Tactical"],
  },
  {
    slug: "biome-runner",
    title: "Biome Runner",
    description: "Survival-эксперимент с биомами, маршрутами и быстрыми браузерными забегами.",
    playUrl: undefined,
    status: "prototype",
    detailsUrl: "#about-lab",
    iconImage: `${placeholdersBase}/coming-soon-icon.svg`,
    coverImage: `${placeholdersBase}/coming-soon-cover.svg`,
    heroImage: `${placeholdersBase}/coming-soon-cover.svg`,
    cardPreviewImage: `${placeholdersBase}/coming-soon-cover.svg`,
    coverAlt: "Временная обложка прототипа игры",
    screenshots: [],
    tags: ["Prototype", "Survival", "Browser"],
  },
];
