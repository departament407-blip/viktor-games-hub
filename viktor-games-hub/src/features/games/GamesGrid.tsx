import type { Game } from "./games-types";

interface GamesGridProps {
  games: Game[];
  isLoading: boolean;
  labels: {
    statusLabels: Record<Game["status"], string>;
    play: string;
    details: string;
    unavailable: string;
    tagsAriaLabel: string;
  };
}

export function GamesGrid({ games, isLoading, labels }: GamesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-live="polite">
        <article className="min-h-[420px] overflow-hidden rounded-xl border border-paper/15 bg-paper/[0.04] shadow-lab">
          <div className="aspect-[16/9] animate-pulse bg-paper/15" />
          <div className="flex flex-col gap-4 p-5">
            <div className="h-7 w-[120px] animate-pulse rounded-lg bg-paper/15" />
            <div className="h-9 w-4/5 animate-pulse rounded-lg bg-paper/15" />
            <div className="h-[18px] w-full animate-pulse rounded-lg bg-paper/15" />
            <div className="h-[18px] w-2/3 animate-pulse rounded-lg bg-paper/15" />
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {games.map((game) => (
        <GameCard game={game} key={game.slug} labels={labels} />
      ))}
    </div>
  );
}

function GameCard({ game, labels }: { game: Game; labels: GamesGridProps["labels"] }) {
  return (
    <article
      className="group flex min-h-[430px] flex-col overflow-hidden rounded-xl border border-paper/15 bg-paper/[0.04] shadow-lab transition hover:-translate-y-1 hover:border-amber/35"
      id={game.slug}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-soft">
        {game.coverImage ? (
          <img
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
            src={game.coverImage}
            alt={game.coverAlt ?? game.title}
          />
        ) : (
          <div className="h-full w-full bg-[radial-gradient(circle_at_78%_18%,rgba(255,200,87,0.28),transparent_14rem),linear-gradient(135deg,#111815,#26150e)]">
            <div className="grid h-full grid-cols-4 grid-rows-3 gap-1 p-5 opacity-80">
              {Array.from({ length: 12 }).map((_, index) => (
                <span
                  className={`rounded-lg border ${
                    index % 5 === 0
                      ? "border-amber/45 bg-amber/15"
                      : "border-mint/15 bg-paper/[0.04]"
                  }`}
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
        <span className="absolute left-4 top-4 rounded-lg bg-ink/80 px-3 py-1 text-xs font-black text-amber backdrop-blur">
          {labels.statusLabels[game.status]}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="m-0 text-xs font-black uppercase text-paper/45">{game.slug}</p>
          <h3 className="m-0 mt-2 text-2xl font-black leading-tight tracking-normal">{game.title}</h3>
        </div>
        <p className="m-0 flex-1 leading-relaxed text-paper/72">{game.description}</p>

        {game.tags && game.tags.length > 0 ? (
          <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label={`${labels.tagsAriaLabel}: ${game.title}`}>
            {game.tags.map((tag) => (
              <li
                className="inline-flex min-h-[26px] items-center rounded-lg bg-paper/10 px-2.5 text-xs font-extrabold text-paper/75"
                key={tag}
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          {game.playUrl ? (
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-transparent bg-amber px-[18px] text-[0.96rem] font-extrabold text-ink no-underline shadow-[0_14px_30px_rgba(255,200,87,0.18)] transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href={game.playUrl}
              rel="noreferrer"
              target="_blank"
            >
              {labels.play}
            </a>
          ) : (
            <span className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-paper/15 bg-paper/10 px-[18px] text-[0.96rem] font-extrabold text-paper/50 sm:w-auto">
              {labels.unavailable}
            </span>
          )}
          <a
            className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-paper/20 bg-paper/10 px-[18px] text-[0.96rem] font-extrabold text-paper no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
            href={game.detailsUrl ?? "#about-lab"}
          >
            {labels.details}
          </a>
        </div>
      </div>
    </article>
  );
}
