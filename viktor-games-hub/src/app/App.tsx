import { useEffect, useMemo, useState } from "react";
import { FeaturedGame } from "../features/games/components/FeaturedGame";
import { GamesGrid } from "../features/games/GamesGrid";
import { fallbackGames } from "../features/games/fallback-games";
import { loadGamesCatalog } from "../features/games/games-api";
import { upcomingGames } from "../features/games/games-catalog";
import type { Game, GamesCatalogSource } from "../features/games/games-types";
import { AboutLab } from "../features/home/AboutLab";
import { GameHero } from "../features/home/GameHero";
import { SiteHeader } from "../features/home/SiteHeader";
import { locales, siteContentByLocale, type Locale } from "../shared/config/site-content";
import { useDocumentMeta } from "./useDocumentMeta";

interface GamesState {
  games: Game[];
  source: GamesCatalogSource;
  isLoading: boolean;
}

const socialPreviewImage = "/assets/brand/og-image.png";

export function App() {
  const [locale, setLocale] = useState<Locale>("ru");
  const [gamesState, setGamesState] = useState<GamesState>({
    games: fallbackGames,
    source: "fallback",
    isLoading: true,
  });
  const content = siteContentByLocale[locale];
  const gameLabels = content.gameLabels;

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
    document.documentElement.lang = content.htmlLang;
    useDocumentMeta({
      description: content.seoDescription,
      image: socialPreviewImage,
      title: content.seoTitle,
    });
  }, [content.htmlLang, content.seoDescription, content.seoTitle]);

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
          brandAriaLabel={content.brandAriaLabel}
          languageAriaLabel={content.languageAriaLabel}
          locales={locales}
          nav={content.nav}
          navAriaLabel={content.navAriaLabel}
          onLocaleChange={setLocale}
          siteName={content.siteName}
        />
        <GameHero
          copy={{
            browseCatalog: content.secondaryButtonText,
            deployLabel: content.heroDeployLabel,
            eyebrow: content.heroEyebrow,
            lead: content.heroDescription,
            playFeatured: content.primaryButtonText,
            statBuilds: content.heroStatBuilds,
            statGames: content.heroStatGames,
            title: content.heroTitle,
          }}
          featuredGame={featuredGame}
          labels={gameLabels}
        />
      </div>

      <FeaturedGame
        apiNote={content.apiCatalogNote}
        eyebrow={content.featuredEyebrow}
        fallbackNote={content.fallbackCatalogNote}
        game={featuredGame}
        labels={gameLabels}
        source={gamesState.source}
      />

      <section
        className="bg-ink-soft px-[clamp(16px,4vw,56px)] py-12 sm:py-16"
        id="games-catalog"
        aria-labelledby="games-catalog-title"
      >
        <div className="mx-auto w-full max-w-[1180px]">
          <div className="mb-7 max-w-[760px] sm:mb-9">
            <p className="mb-3 text-xs font-extrabold uppercase tracking-normal text-mint">{content.catalogEyebrow}</p>
            <h2
              className="m-0 text-3xl font-black leading-none tracking-normal sm:text-5xl"
              id="games-catalog-title"
            >
              {content.catalogTitle}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/68 sm:text-lg">{content.catalogDescription}</p>
          </div>

          <GamesGrid games={catalogGames} isLoading={gamesState.isLoading} labels={gameLabels} />
        </div>
      </section>

      <AboutLab
        copy={{
          eyebrow: content.aboutEyebrow,
          process: content.process,
          processTitle: content.processTitle,
          stack: content.stack,
          stackTitle: content.stackTitle,
          text: content.aboutDescription,
          title: content.aboutTitle,
        }}
      />

      <footer className="bg-ink px-[clamp(16px,4vw,56px)] py-8 text-paper/65">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <strong className="block text-paper">{content.siteName}</strong>
            <span className="mt-1 block text-sm">{content.footerText}</span>
          </div>
          <div className="flex flex-wrap gap-4 text-sm font-black">
            <a className="text-paper/75 no-underline hover:text-amber" href="https://railway.com" rel="noreferrer" target="_blank">
              {content.footerRailway}
            </a>
            <a
              className="text-paper/75 no-underline hover:text-amber"
              href="https://github.com/departament407-blip/viktor-games-hub"
              rel="noreferrer"
              target="_blank"
            >
              {content.footerGithub}
            </a>
            <a className="text-paper/75 no-underline hover:text-amber" href="#hero-title">
              {content.footerBackToTop}
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
    cardPreviewImage: game.cardPreviewImage ?? fallbackGames[0].cardPreviewImage,
    coverAlt: game.coverAlt ?? fallbackGames[0].coverAlt,
    coverImage: game.coverImage ?? fallbackGames[0].coverImage,
    detailsUrl: game.detailsUrl ?? fallbackGames[0].detailsUrl,
    featured: game.featured ?? fallbackGames[0].featured,
    heroImage: game.heroImage ?? fallbackGames[0].heroImage,
    iconImage: game.iconImage ?? fallbackGames[0].iconImage,
    playUrl: game.playUrl ?? fallbackGames[0].playUrl,
    screenshots: game.screenshots ?? fallbackGames[0].screenshots,
    tags: game.tags ?? fallbackGames[0].tags,
  };
}
