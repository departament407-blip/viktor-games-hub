import type { MouseEvent } from "react";
import type { Game } from "../games/games-types";
import type { SiteContent } from "../../shared/config/site-content";
import { GameStation } from "./GameStation";
import { carouselOffset, wrapIndex } from "./carousel";
import { useCarouselGesture } from "./useCarouselGesture";
import "./carousel.css";

interface Props {
  games: Game[];
  copy: SiteContent;
  selected: string;
  launching: string | null;
  onSelect: (slug: string) => void;
  onDetails: (game: Game) => void;
  onLaunch: (event: MouseEvent<HTMLAnchorElement>, game: Game) => void;
}
export function GameFloor({
  games,
  copy,
  selected,
  launching,
  onSelect,
  onDetails,
  onLaunch,
}: Props) {
  const index = Math.max(
    0,
    games.findIndex((game) => game.slug === selected),
  );
  const move = (delta: number) => {
    if (games.length > 1 && !launching)
      onSelect(games[wrapIndex(index + delta, games.length)].slug);
  };
  const gestures = useCarouselGesture(move);
  return (
    <section
      id="games-catalog"
      className="game-floor carousel-floor"
      aria-label={copy.catalog}
      aria-roledescription={copy.carousel}
      onKeyDown={(event) => {
        if (event.altKey || event.ctrlKey || event.metaKey) return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          move(event.key === "ArrowLeft" ? -1 : 1);
        }
        if ((event.key === "Home" || event.key === "End") && games.length) {
          event.preventDefault();
          onSelect(games[event.key === "Home" ? 0 : games.length - 1].slug);
        }
      }}
    >
      <div className="station-rail carousel-rail" {...gestures}>
        {games.map((game, itemIndex) => {
          const offset = carouselOffset(itemIndex, index, games.length);
          return (
            <GameStation
              key={game.slug}
              game={game}
              copy={copy}
              offset={offset}
              selected={itemIndex === index}
              launching={launching === game.slug}
              onSelect={() => onSelect(game.slug)}
              onDetails={() => onDetails(game)}
              onLaunch={onLaunch}
            />
          );
        })}
      </div>
      <div
        className="floor-navigation carousel-navigation"
        aria-label={copy.chooseGame}
      >
        <button
          type="button"
          disabled={games.length < 2 || !!launching}
          onClick={() => move(-1)}
          aria-label={copy.previous}
        >
          ←
        </button>
        <div
          className="carousel-selection"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>
            {String(games.length ? index + 1 : 0).padStart(2, "0")}{" "}
            <b>/ {String(games.length).padStart(2, "0")}</b>
          </span>
          <p>{games[index]?.title}</p>
        </div>
        <button
          type="button"
          disabled={games.length < 2 || !!launching}
          onClick={() => move(1)}
          aria-label={copy.next}
        >
          →
        </button>
      </div>
      <div className="game-dots carousel-dots" aria-label={copy.catalog}>
        {games.map((game, itemIndex) => (
          <button
            key={game.slug}
            type="button"
            className={itemIndex === index ? "is-current" : ""}
            onClick={() => onSelect(game.slug)}
            aria-label={`${copy.selectGame} — ${game.title}`}
            aria-pressed={itemIndex === index}
          >
            <span />
          </button>
        ))}
      </div>
      <p className="carousel-hint">{copy.carouselHint}</p>
    </section>
  );
}
