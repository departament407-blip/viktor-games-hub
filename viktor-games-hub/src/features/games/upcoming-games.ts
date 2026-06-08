import type { Game } from "./games-types";

export const upcomingGames: Game[] = [
  {
    slug: "operation-blackout",
    title: "Операция: Blackout",
    description: "Короткая тактическая головоломка про энергию, риск и решения под давлением.",
    status: "planned",
    detailsUrl: "#about-lab",
    iconImage: "/assets/placeholders/coming-soon-icon.svg",
    coverImage: "/assets/placeholders/coming-soon-cover.svg",
    cardPreviewImage: "/assets/placeholders/coming-soon-cover.svg",
    coverAlt: "Временная обложка игры, которая скоро появится",
    tags: ["Coming soon", "Puzzle", "Tactical"],
  },
  {
    slug: "biome-runner",
    title: "Biome Runner",
    description: "Survival-эксперимент с биомами, маршрутами и быстрыми браузерными забегами.",
    status: "prototype",
    detailsUrl: "#about-lab",
    iconImage: "/assets/placeholders/coming-soon-icon.svg",
    coverImage: "/assets/placeholders/coming-soon-cover.svg",
    cardPreviewImage: "/assets/placeholders/coming-soon-cover.svg",
    coverAlt: "Временная обложка прототипа игры",
    tags: ["Prototype", "Survival", "Browser"],
  },
];
