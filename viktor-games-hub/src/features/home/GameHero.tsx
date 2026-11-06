import type { GamesUiLabels } from "../../shared/config/site-content";
import type { Game } from "../games/games-types";

interface GameHeroProps {
  copy: {
    eyebrow: string;
    title: string;
    lead: string;
    playFeatured: string;
    browseCatalog: string;
    statGames: string;
    playableLabel: string;
    statBuilds: string;
    deployLabel: string;
  };
  featuredGame: Game;
  labels: GamesUiLabels;
}

export function GameHero({ copy, featuredGame, labels }: GameHeroProps) {
  return (
    <section className="relative px-[clamp(16px,4vw,56px)] pb-12 pt-5 sm:pb-16 lg:pb-20" aria-labelledby="hero-title">
      <div className="pointer-events-none absolute inset-x-0 top-[-120px] h-[520px] bg-[radial-gradient(circle_at_74%_18%,rgba(255,200,87,0.24),transparent_34rem),radial-gradient(circle_at_18%_36%,rgba(105,214,169,0.12),transparent_24rem)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink" />

      <div className="relative mx-auto grid w-full max-w-[1180px] grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1.08fr)] lg:gap-12">
        <div className="pt-4 sm:pt-10">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-normal text-mint sm:text-sm">
            {copy.eyebrow}
          </p>
          <h1
            className="m-0 max-w-[760px] whitespace-pre-line text-[clamp(1.85rem,8.4vw,3.4rem)] font-black leading-[0.92] tracking-normal sm:text-[clamp(3rem,5vw,4.9rem)]"
            id="hero-title"
          >
            {copy.title}
          </h1>
          <p className="mt-5 max-w-[660px] text-base leading-relaxed text-paper/78 sm:mt-6 sm:text-xl">
            {copy.lead}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            {featuredGame.playUrl ? (
              <a
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-transparent bg-amber px-5 text-base font-black text-ink no-underline shadow-[0_18px_34px_rgba(255,200,87,0.22)] transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
                href={featuredGame.playUrl}
                rel="noreferrer"
                target="_blank"
              >
                {copy.playFeatured}
              </a>
            ) : null}
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-paper/25 bg-paper/10 px-5 text-base font-black text-paper no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href="#games-catalog"
            >
              {copy.browseCatalog}
            </a>
          </div>

          <dl className="mt-7 grid grid-cols-2 gap-3 text-sm sm:max-w-[440px]">
            <div className="rounded-lg border border-paper/12 bg-paper/[0.06] p-3">
              <dt className="text-paper/55">{copy.playableLabel}</dt>
              <dd className="m-0 mt-1 font-black text-amber">{copy.statGames}</dd>
            </div>
            <div className="rounded-lg border border-paper/12 bg-paper/[0.06] p-3">
              <dt className="text-paper/55">{copy.deployLabel}</dt>
              <dd className="m-0 mt-1 font-black text-mint">{copy.statBuilds}</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[680px] lg:max-w-none">
          <div className="absolute -inset-4 rounded-[28px] bg-[radial-gradient(circle_at_70%_16%,rgba(255,200,87,0.24),transparent_18rem)] blur-2xl" />
          <div className="relative overflow-hidden rounded-2xl border border-amber/30 bg-ink-soft shadow-lab">
            <img
              className="aspect-[16/10] w-full object-cover"
              src={featuredGame.heroImage ?? featuredGame.coverImage}
              alt={featuredGame.coverAlt ?? featuredGame.title}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent p-4 sm:p-6">
              <span className="inline-flex rounded-lg bg-amber px-3 py-1 text-xs font-black uppercase text-ink">
                {labels.statusLabels[featuredGame.status]}
              </span>
              <h2 className="m-0 mt-3 text-2xl font-black leading-tight sm:text-4xl">{featuredGame.title}</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
