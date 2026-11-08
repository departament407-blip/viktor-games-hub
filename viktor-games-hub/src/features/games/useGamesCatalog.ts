import { useEffect, useMemo, useState } from "react";
import type { Game } from "./games-types";
import type { Locale } from "../../shared/config/site-content";
import { gamesCatalog, upcomingGames } from "./games-catalog";
import { loadGamesCatalog } from "./games-api";
import { localizeGame } from "./game-locales";

export function useGamesCatalog(locale: Locale) {
  const [games, setGames] = useState(gamesCatalog);

  useEffect(() => {
    let mounted = true;
    loadGamesCatalog().then((result) => {
      if (mounted) setGames(result.games);
    });
    return () => {
      mounted = false;
    };
  }, []);

  return useMemo(() => {
    const knownGames = [...gamesCatalog, ...upcomingGames];
    const merged: Game[] = games.map((game) => ({
      ...knownGames.find((entry) => entry.slug === game.slug),
      ...Object.fromEntries(
        Object.entries(game).filter(([, value]) => value !== undefined),
      ),
      slug: game.slug,
      title: game.title,
      description: game.description,
      status: game.status,
    }));
    const seen = new Set(merged.map((game) => game.slug));
    const catalog = [
      ...merged,
      ...upcomingGames.filter((game) => !seen.has(game.slug)),
    ];
    const order = [
      "pirate-tabletop",
      "saper-last-mistake",
      "vlastitel-galaktiki",
    ];
    const priority = (slug: string) =>
      order.includes(slug) ? order.indexOf(slug) : order.length;
    return catalog
      .sort((a, b) => priority(a.slug) - priority(b.slug))
      .map((game) => localizeGame(game, locale));
  }, [games, locale]);
}
