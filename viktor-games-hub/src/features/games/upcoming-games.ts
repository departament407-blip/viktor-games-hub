import type { Game } from "./games-types";

export const upcomingGames: Game[] = [
  {
    slug: "operation-blackout",
    title: "Операция: Blackout",
    description: "Короткая тактическая головоломка про энергию, риск и решения под давлением.",
    status: "planned",
    detailsUrl: "#about-lab",
    tags: ["Coming soon", "Puzzle", "Tactical"],
  },
  {
    slug: "biome-runner",
    title: "Biome Runner",
    description: "Survival-эксперимент с биомами, маршрутами и быстрыми браузерными забегами.",
    status: "prototype",
    detailsUrl: "#about-lab",
    tags: ["Prototype", "Survival", "Browser"],
  },
];
