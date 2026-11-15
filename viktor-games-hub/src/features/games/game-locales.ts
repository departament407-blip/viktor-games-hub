import type { Locale } from "../../shared/config/site-content";
import type { Game } from "./games-types";

const english: Record<
  string,
  Pick<Game, "title" | "subtitle" | "description" | "tags" | "coverAlt">
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
    subtitle: "Island of Lost Gold",
    description:
      "Explore the island tile by tile and bring gold back to your ship. Share a room code with friends or play against one to three bots.",
    tags: ["Board game", "Online", "Solo"],
    coverAlt:
      "A pirate captain with a compass and treasure on a tropical island",
  },
  "tyaga-k-nebu": {
    title: "Тяга к небу",
    description: "On a distant planet, a plane rises above the wreckage.",
    tags: ["Science fiction", "Flight"],
    coverAlt: "A lone figure beside a wreck reaches after a plane taking off.",
  },
};

export function localizeGame(game: Game, locale: Locale): Game {
  return locale === "en" && english[game.slug]
    ? { ...game, ...english[game.slug] }
    : game;
}
