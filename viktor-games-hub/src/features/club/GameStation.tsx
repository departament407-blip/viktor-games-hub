import type { MouseEvent } from "react";
import type { Game } from "../games/games-types";
import type { SiteContent } from "../../shared/config/site-content";

interface Props {
  game: Game;
  copy: SiteContent;
  selected: boolean;
  offset: number;
  launching: boolean;
  onSelect: () => void;
  onLaunch: (event: MouseEvent<HTMLAnchorElement>, game: Game) => void;
  onDetails: () => void;
}

export function GameStation({
  game,
  copy,
  selected,
  offset,
  launching,
  onSelect,
  onLaunch,
  onDetails,
}: Props) {
  const saper = game.slug === "saper-last-mistake";
  const galaxy = game.slug === "vlastitel-galaktiki";
  const [title, subtitle] = saper ? game.title.split(": ") : [game.title, ""];
  const status = galaxy
    ? copy.prototype
    : game.status === "alpha"
      ? copy.alpha
      : copy.browser;
  const theme = saper ? "cyan" : galaxy ? "violet" : "pink";

  return (
    <article
      className={`station station--${theme} ${selected ? "station--featured" : ""} ${selected ? "is-selected" : ""} ${launching ? "is-launching" : ""}`}
      data-offset={Math.max(-2, Math.min(2, offset))}
      aria-hidden={Math.abs(offset) > 1 || undefined}
      id={game.slug}
      data-slug={game.slug}
      aria-labelledby={`${game.slug}-title`}
    >
      <div className="station-screen">
        <button
          type="button"
          className="station-select"
          onClick={onSelect}
          aria-label={`${copy.selectGame} — ${game.title}`}
          aria-pressed={selected}
          tabIndex={Math.abs(offset) <= 1 ? 0 : -1}
        >
          <img
            draggable={false}
            className="station-art"
            src={game.cardPreviewImage ?? game.coverImage}
            alt=""
            width="800"
            height="600"
          />
          <span className="screen-shade" />
        </button>
        <div className="station-copy">
          <h2 id={`${game.slug}-title`}>{title}</h2>
          <p className="station-subtitle">{subtitle || status}</p>
          <div className="station-actions">
            {game.playUrl ? (
              <a
                tabIndex={selected ? 0 : -1}
                href={game.playUrl}
                className="play-button"
                onClick={(event) => onLaunch(event, game)}
              >
                <span>{launching ? copy.launch : copy.play}</span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m9 5 8 7-8 7V5Z" fill="currentColor" />
                </svg>
              </a>
            ) : (
              <span className="development-status">{copy.inDevelopment}</span>
            )}
            <button
              type="button"
              className="game-info"
              tabIndex={selected ? 0 : -1}
              onClick={onDetails}
              aria-label={`${copy.details} — ${game.title}`}
            >
              i
            </button>
          </div>
        </div>
        <span className="screen-reflection" aria-hidden="true" />
      </div>
      <div className="monitor-neck" aria-hidden="true" />
      <img
        className="station-desk"
        src="/assets/club/station-desk.webp"
        width="1250"
        height="420"
        alt=""
        aria-hidden="true"
      />
    </article>
  );
}
