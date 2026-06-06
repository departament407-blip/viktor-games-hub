import { fallbackGames } from "./fallback-games";
import type { Game, GamesCatalogResult, GameStatus } from "./games-types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ?? "";
const gamesEndpoint = `${apiBaseUrl}/api/games`;
const supportedStatuses: GameStatus[] = ["published", "development", "prototype", "planned"];

export async function loadGamesCatalog(): Promise<GamesCatalogResult> {
  try {
    const response = await fetch(gamesEndpoint, {
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Games API returned ${response.status}`);
    }

    const payload: unknown = await response.json();
    const games = parseGamesPayload(payload);

    if (games.length === 0) {
      throw new Error("Games API returned an empty catalog");
    }

    return {
      games,
      source: "api",
    };
  } catch {
    return {
      games: fallbackGames,
      source: "fallback",
    };
  }
}

function parseGamesPayload(payload: unknown): Game[] {
  const rawGames = Array.isArray(payload)
    ? payload
    : isRecord(payload) && Array.isArray(payload.games)
      ? payload.games
      : [];

  return rawGames.filter(isGame).map(normalizeGame);
}

function normalizeGame(game: Game): Game {
  return {
    slug: game.slug,
    title: game.title,
    description: game.description,
    playUrl: game.playUrl,
    status: game.status,
    detailsUrl: game.detailsUrl,
    tags: game.tags,
  };
}

function isGame(value: unknown): value is Game {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.slug === "string" &&
    typeof value.title === "string" &&
    typeof value.description === "string" &&
    typeof value.playUrl === "string" &&
    isGameStatus(value.status) &&
    (value.detailsUrl === undefined || typeof value.detailsUrl === "string") &&
    (value.tags === undefined || isStringArray(value.tags))
  );
}

function isGameStatus(value: unknown): value is GameStatus {
  return typeof value === "string" && supportedStatuses.includes(value as GameStatus);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
