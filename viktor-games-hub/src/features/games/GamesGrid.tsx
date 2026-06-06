import type { Game } from "./games-types";

interface GamesGridProps {
  games: Game[];
  isLoading: boolean;
  labels: {
    statusLabels: Record<Game["status"], string>;
    play: string;
    details: string;
    tagsAriaLabel: string;
  };
}

export function GamesGrid({ games, isLoading, labels }: GamesGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[18px]" aria-live="polite">
        <article className="flex min-h-[330px] flex-col gap-[18px] overflow-hidden rounded-lg border border-paper/15 bg-paper/[0.04] bg-gradient-to-br from-paper/[0.08] to-paper/[0.02] p-6 shadow-lab">
          <div className="h-7 w-[110px] animate-pulse rounded-lg bg-paper/15" />
          <div className="h-9 w-[min(340px,84%)] animate-pulse rounded-lg bg-paper/15" />
          <div className="h-[18px] w-full animate-pulse rounded-lg bg-paper/15" />
          <div className="h-[18px] w-2/3 animate-pulse rounded-lg bg-paper/15" />
        </article>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-[18px]">
      {games.map((game) => (
        <article
          className="flex min-h-[330px] flex-col gap-[18px] rounded-lg border border-paper/15 bg-paper/[0.04] bg-gradient-to-br from-paper/[0.08] to-paper/[0.02] p-6 shadow-lab"
          key={game.slug}
        >
          <div className="flex min-h-7 items-start justify-between gap-3 max-[560px]:flex-col">
            <span className="inline-flex min-h-[26px] items-center rounded-lg bg-mint px-2.5 text-xs font-extrabold text-ink">
              {labels.statusLabels[game.status]}
            </span>
            <span className="inline-flex min-h-[26px] max-w-[54%] items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-paper/15 px-2.5 text-xs font-extrabold text-paper/60 max-[560px]:max-w-full">
              {game.slug}
            </span>
          </div>

          <h3 className="m-0 text-[1.42rem] font-black leading-tight tracking-normal">{game.title}</h3>
          <p className="m-0 flex-1 leading-relaxed text-paper/75">{game.description}</p>

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

          <div className="flex flex-wrap gap-3">
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-transparent bg-amber px-[18px] text-[0.96rem] font-extrabold text-ink no-underline shadow-[0_14px_30px_rgba(255,200,87,0.22)] transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href={game.playUrl}
            >
              {labels.play}
            </a>
            <a
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-transparent bg-mint px-[18px] text-[0.96rem] font-extrabold text-ink no-underline transition hover:-translate-y-0.5 focus-visible:-translate-y-0.5 sm:w-auto"
              href={game.detailsUrl ?? "#development-process"}
            >
              {labels.details}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
