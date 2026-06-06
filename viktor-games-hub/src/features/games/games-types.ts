export type GameStatus = "published" | "development" | "prototype" | "planned";

export type GamesCatalogSource = "api" | "fallback";

export interface Game {
  slug: string;
  title: string;
  description: string;
  playUrl: string;
  status: GameStatus;
  detailsUrl?: string;
  tags?: string[];
}

export interface GamesCatalogResult {
  games: Game[];
  source: GamesCatalogSource;
}
