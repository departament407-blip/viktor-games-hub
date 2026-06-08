import type { GamesUiLabels } from "../../../shared/config/site-content";
import type { Game, GamesCatalogSource } from "../games-types";

interface FeaturedGameProps {
  apiNote: string;
  fallbackNote: string;
  game: Game;
  labels: GamesUiLabels;
  source: GamesCatalogSource;
  eyebrow: string;
}

export function FeaturedGame({ apiNote, fallbackNote, game, labels, source, eyebrow }: FeaturedGameProps) {
  return (
    <section
      className="relative bg-ink px-[clamp(16px,4vw,56px)] py-12 sm:py-16"
      id="featured-game"
      aria-labelledby="featured-game-title"
    >
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-5 overflow-hidden rounded-2xl border border-paper/12 bg-[linear-gradient(135deg,rgba(255,200,87,0.12),rgba(255,255,255,0.03)_38%,rgba(105,214,169,0.08))] p-4 shadow-lab sm:p-5 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:p-6">
        <div className="relative overflow-hidden rounded-xl border border-amber/25 bg-ink-soft">
          <img className="aspect-[16/10] h-full w-full object-cover" src={game.coverImage} alt={game.coverAlt ?? game.title} />
        </div>

        <div className="flex min-w-0 flex-col justify-center p-1 sm:p-4">
          <p className="mb-3 text-xs font-extrabold uppercase tracking-normal text-mint">{eyebrow}</p>
          <h2 className="m-0 text-3xl font-black leading-none tracking-normal sm:text-5xl" id="featured-game-title">
            {game.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-paper/75 sm:text-lg">{game.description}</p>
          <p className="mt-3 text-sm leading-relaxed text-paper/50">
            {source === "api" ? apiNote : fallbackNote}
          </p>

          {game.tags && game.tags.length > 0 ? (
            <ul className="mt-5 flex list-none flex-wrap gap-2 p-0" aria-label={`${labels.tagsAriaLabel}: ${game.title}`}>
              {game.tags.map((tag) => (
                <li className="rounded-lg bg-paper/10 px-3 py-1 text-xs font-black text-paper/75" key={tag}>
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {game.playUrl ? (
              <a
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-amber px-5 text-base font-black text-ink no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
                href={game.playUrl}
                rel="noreferrer"
                target="_blank"
              >
                {labels.play}
              </a>
            ) : null}
            <a
              className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-paper/20 bg-paper/10 px-5 text-base font-black text-paper no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href={game.detailsUrl ?? "#about-lab"}
            >
              {labels.details}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
