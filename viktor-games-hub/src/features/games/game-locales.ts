import type { Locale } from "../../shared/config/site-content";
import type { Game } from "./games-types";

const english: Record<
  string,
  Pick<Game, "title" | "description" | "tags" | "coverAlt">
> = {
  "saper-last-mistake": {
    title: "Saper: Last Mistake",
    description:
      "A tactical minesweeper with operatives, health, perks and distinct biomes.",
    tags: ["Tactical", "Minesweeper", "Sci-fi", "Browser"],
    coverAlt: "Six sapper teammates together at a bar",
  },
  "pirate-tabletop": {
    title: "Jackal",
    description:
      "Explore the island tile by tile and bring gold back to your ship. Share a room code with friends or play against one to three bots.",
    tags: ["Board game", "Online", "Solo"],
    coverAlt:
      "A pirate captain with a compass and treasure on a tropical island",
  },
  "vlastitel-galaktiki": {
    title: "Lord of the Galaxy",
    description:
      "Command a probe from your mothership in this Windows RTS prototype. The farther the probe travels, the longer its reports take to reach you.",
    tags: ["Space RTS", "Windows"],
    coverAlt: "A diagram of a probe route and its communications link",
  },
};

export function localizeGame(game: Game, locale: Locale): Game {
  return locale === "en" && english[game.slug]
    ? { ...game, ...english[game.slug] }
    : game;
}
