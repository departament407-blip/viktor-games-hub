import { useEffect, useMemo, useState } from "react";
import { FeaturedGame } from "../features/games/components/FeaturedGame";
import { GamesGrid } from "../features/games/GamesGrid";
import { fallbackGames } from "../features/games/fallback-games";
import { loadGamesCatalog } from "../features/games/games-api";
import type { Game, GamesCatalogSource } from "../features/games/games-types";
import { upcomingGames } from "../features/games/upcoming-games";
import { AboutLab } from "../features/home/AboutLab";
import { GameHero } from "../features/home/GameHero";
import { SiteHeader } from "../features/home/SiteHeader";
import { appCopy, locales, type Locale } from "./i18n";
import { useDocumentMeta } from "./useDocumentMeta";

interface GamesState {
  games: Game[];
  source: GamesCatalogSource;
  isLoading: boolean;
}

const socialPreviewImage = "/assets/social-preview.svg";

export function App() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [gamesState, setGamesState] = useState<GamesState>({
    games: fallbackGames,
    source: "fallback",
    isLoading: true,
  });
  const copy = appCopy[locale];

  useEffect(() => {
    let isMounted = true;

    loadGamesCatalog().then((catalog) => {
      if (!isMounted) {
        return;
      }

      setGamesState({
        games: catalog.games,
        source: catalog.source,
        isLoading: false,
      });
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    useDocumentMeta({
      description: copy.metaDescription,
      image: socialPreviewImage,
      title: copy.title,
    });
  }, [copy.htmlLang, copy.metaDescription, copy.title]);

  const publishedGames = useMemo(
    () => gamesState.games.map((game) => enrichGameWithLocalAssets(game)),
    [gamesState.games],
  );
  const featuredGame = publishedGames.find((game) => game.featured) ?? publishedGames[0] ?? fallbackGames[0];
  const catalogGames = [...publishedGames, ...upcomingGames];

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper">
      <div className="relative bg-[linear-gradient(180deg,#070908_0%,#11100e_58%,#171511_100%)]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(105,214,169,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(105,214,169,0.05)_1px,transparent_1px)] bg-[length:38px_38px]" />
        <SiteHeader
          activeLocale={locale}
          brandAriaLabel={copy.brandAriaLabel}
          languageAriaLabel={copy.languageAriaLabel}
          locales={locales}
          nav={copy.nav}
          navAriaLabel={copy.navAriaLabel}
          onLocaleChange={setLocale}
        />
        <GameHero copy={copy.hero} featuredGame={featuredGame} labels={copy.gamesGrid} />
      </div>

      <FeaturedGame
        apiNote={copy.featured.api}
        eyebrow={copy.featured.eyebrow}
        fallbackNote={copy.featured.fallback}
        game={featuredGame}
        labels={copy.gamesGrid}
        source={gamesState.source}
        text={copy.featured.text}
        title={copy.featured.title}
      />

      <section
        className="bg-ink-soft px-[clamp(16px,4vw,56px)] py-12 sm:py-16"
        id="games-catalog"
        aria-labelledby="games-catalog-title"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="mb-7 max-w-[760px] sm:mb-9">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-normal text-mint">{copy.catalog.eyebrow}</p>
            <h2
              className="m-0 text-3xl font-black leading-none tracking-normal sm:text-5xl"
              id="games-catalog-title"
            >
              {copy.catalog.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/68 sm:text-lg">{copy.catalog.text}</p>
          </div>

          <GamesGrid games={catalogGames} isLoading={gamesState.isLoading} labels={copy.gamesGrid} />
        </div>
      </section>

      <AboutLab copy={copy.about} />

      <footer className="bg-ink px-[clamp(16px,4vw,56px)] py-8 text-paper/65">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="block text-paper">Viktor Games Lab</strong>
            <span className="mt-1 block text-sm">{copy.footer.tagline}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <a className="text-paper/75 no-underline hover:text-amber" href="https://railway.com" rel="noreferrer" target="_blank">
              {copy.footer.railway}
            </a>
            <a
              className="text-paper/75 no-underline hover:text-amber"
              href="https://github.com/departament407-blip/viktor-games-hub"
              rel="noreferrer"
              target="_blank"
            >
              {copy.footer.github}
            </a>
            <a className="text-paper/75 no-underline hover:text-amber" href="#hero-title">
              {copy.footer.backToTop}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function enrichGameWithLocalAssets(game: Game): Game {
  if (game.slug !== "saper-last-mistake") {
    return game;
  }

  return {
    ...fallbackGames[0],
    ...game,
    coverAlt: game.coverAlt ?? fallbackGames[0].coverAlt,
    coverImage: game.coverImage ?? fallbackGames[0].coverImage,
    detailsUrl: game.detailsUrl ?? fallbackGames[0].detailsUrl,
    featured: game.featured ?? fallbackGames[0].featured,
    playUrl: game.playUrl ?? fallbackGames[0].playUrl,
    tags: game.tags ?? fallbackGames[0].tags,
  };
}
