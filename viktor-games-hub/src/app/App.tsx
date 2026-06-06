import { useEffect, useState } from "react";
import { GamesGrid } from "../features/games/GamesGrid";
import { fallbackGames } from "../features/games/fallback-games";
import { loadGamesCatalog } from "../features/games/games-api";
import type { Game, GamesCatalogSource } from "../features/games/games-types";
import { appCopy, locales, type Locale } from "./i18n";

interface GamesState {
  games: Game[];
  source: GamesCatalogSource;
  isLoading: boolean;
}

const techStack = ["React", "TypeScript", "Vite", "Railway", "PostgreSQL", "AI-assisted dev"];

const heroBackground = {
  backgroundImage: [
    "linear-gradient(90deg, rgba(17, 16, 14, 0.94) 0%, rgba(17, 16, 14, 0.78) 38%, rgba(17, 16, 14, 0.18) 100%)",
    "linear-gradient(180deg, rgba(17, 16, 14, 0.2) 0%, rgba(17, 16, 14, 0.58) 100%)",
    "url('/hero-lab.png')",
  ].join(", "),
};

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
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", copy.metaDescription);
  }, [copy.htmlLang, copy.metaDescription]);

  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper">
      <section
        className="relative isolate flex min-h-[min(760px,88svh)] flex-col bg-cover bg-center px-[clamp(18px,4vw,56px)] pb-[72px] pt-6 max-[820px]:min-h-[84svh] max-[560px]:pb-14"
        style={heroBackground}
        aria-labelledby="hero-title"
      >
        <div className="mx-auto flex w-full max-w-[1160px] items-center justify-between gap-[18px] max-[820px]:items-start">
          <a
            className="grid size-[42px] shrink-0 place-items-center rounded-lg border border-paper/30 bg-ink/50 text-base font-black text-amber no-underline shadow-lab"
            href="/"
            aria-label={copy.brandAriaLabel}
          >
            <span>V</span>
          </a>
          <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-5">
            <nav
              className="flex flex-wrap items-center justify-end gap-3 text-[0.88rem] text-paper/80 sm:gap-6 sm:text-[0.95rem] lg:gap-7"
              aria-label={copy.navAriaLabel}
            >
              <a className="no-underline transition-colors hover:text-amber focus-visible:text-amber" href="#featured-games">
                {copy.nav.games}
              </a>
              <a className="no-underline transition-colors hover:text-amber focus-visible:text-amber" href="#tech-stack">
                {copy.nav.stack}
              </a>
              <a
                className="no-underline transition-colors hover:text-amber focus-visible:text-amber"
                href="#development-process"
              >
                {copy.nav.process}
              </a>
            </nav>
            <div
              className="flex rounded-lg border border-paper/20 bg-ink/50 p-1 shadow-lab"
              role="group"
              aria-label={copy.languageAriaLabel}
            >
              {locales.map((item) => (
                <button
                  className={`min-h-8 rounded-md px-3 text-xs font-black uppercase transition ${
                    locale === item ? "bg-amber text-ink" : "text-paper/75 hover:text-paper focus-visible:text-paper"
                  }`}
                  key={item}
                  type="button"
                  aria-pressed={locale === item}
                  onClick={() => setLocale(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mb-0 mt-auto w-full max-w-[1160px] pt-24 max-[560px]:pt-[70px]">
          <p className="mb-3.5 text-xs font-extrabold uppercase tracking-normal text-mint">
            {copy.hero.eyebrow}
          </p>
          <h1
            className="m-0 max-w-[760px] text-5xl font-black leading-[0.9] tracking-normal sm:text-6xl lg:text-8xl xl:text-9xl"
            id="hero-title"
          >
            Viktor Games Lab
          </h1>
          <p className="mt-7 max-w-[660px] text-lg leading-relaxed text-paper/85 sm:text-xl lg:text-2xl">
            {copy.hero.lead}
          </p>
          <div className="mt-[34px] flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-transparent bg-amber px-[18px] text-[0.96rem] font-extrabold text-ink no-underline shadow-[0_14px_30px_rgba(255,200,87,0.22)] transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href="#featured-games"
            >
              {copy.hero.explore}
            </a>
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-paper/30 bg-paper/10 px-[18px] text-[0.96rem] font-extrabold text-paper no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href="https://railway.com"
              rel="noreferrer"
              target="_blank"
            >
              {copy.hero.railway}
            </a>
          </div>
        </div>
      </section>

      <section
        className="bg-ink-soft px-[clamp(18px,4vw,56px)] py-[86px]"
        id="featured-games"
        aria-labelledby="featured-title"
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="mb-[34px] max-w-[780px]">
            <p className="mb-3.5 text-xs font-extrabold uppercase tracking-normal text-mint">
              {copy.featured.eyebrow}
            </p>
            <h2
              className="m-0 text-3xl font-black leading-none tracking-normal sm:text-4xl lg:text-6xl"
              id="featured-title"
            >
              {copy.featured.title}
            </h2>
            <p className="mt-[18px] max-w-[660px] leading-relaxed text-paper/70">
              {gamesState.source === "api" ? copy.featured.api : copy.featured.fallback}
            </p>
          </div>
          <GamesGrid games={gamesState.games} isLoading={gamesState.isLoading} labels={copy.gamesGrid} />
        </div>
      </section>

      <section
        className="bg-paper px-[clamp(18px,4vw,56px)] py-[86px] text-ink"
        id="tech-stack"
        aria-labelledby="stack-title"
      >
        <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-start gap-[34px] lg:grid-cols-[minmax(0,0.86fr)_minmax(280px,1.14fr)]">
          <div className="max-w-[780px]">
            <p className="mb-3.5 text-xs font-extrabold uppercase tracking-normal text-mint">
              {copy.stack.eyebrow}
            </p>
            <h2 className="m-0 text-3xl font-black leading-none tracking-normal sm:text-4xl lg:text-6xl" id="stack-title">
              {copy.stack.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {techStack.map((tech) => (
              <div
                className="flex min-h-[72px] items-center rounded-lg border border-ink/10 bg-white/60 p-[18px] font-black text-ink shadow-lab-soft"
                key={tech}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="bg-[linear-gradient(135deg,rgba(38,198,218,0.18),transparent_30%),linear-gradient(315deg,rgba(255,115,92,0.18),transparent_34%)] bg-paper-soft px-[clamp(18px,4vw,56px)] py-[86px] text-ink"
        id="development-process"
        aria-labelledby="process-title"
      >
        <div className="mx-auto w-full max-w-[1160px]">
          <div className="mb-[34px] max-w-[780px]">
            <p className="mb-3.5 text-xs font-extrabold uppercase tracking-normal text-mint">
              {copy.process.eyebrow}
            </p>
            <h2 className="m-0 text-3xl font-black leading-none tracking-normal sm:text-4xl lg:text-6xl" id="process-title">
              {copy.process.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {copy.process.steps.map((step, index) => (
              <article className="min-h-60 rounded-lg border border-ink/10 bg-white/60 p-6" key={step.label}>
                <span className="mb-[42px] inline-flex font-black text-coral">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 text-[1.42rem] font-black leading-tight tracking-normal">{step.label}</h3>
                <p className="mt-3.5 leading-relaxed text-ink/70">{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="flex flex-col items-start justify-between gap-[18px] border-t border-ink/10 bg-paper px-[clamp(18px,4vw,56px)] py-7 text-ink/70 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-1.5">
          <strong className="text-ink">Viktor Games Lab</strong>
          <span>{copy.footer.tagline}</span>
        </div>
        <a className="font-extrabold text-ink no-underline" href="#hero-title">
          {copy.footer.backToTop}
        </a>
      </footer>
    </main>
  );
}
