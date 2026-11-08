import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import type { Game } from "../games/games-types";
import type { SiteContent } from "../../shared/config/site-content";
import { GameStation } from "./GameStation";

interface Props {
  games: Game[];
  copy: SiteContent;
  selected: string;
  launching: string | null;
  motion: boolean;
  onSelect: (slug: string) => void;
  onDetails: (game: Game) => void;
  onLaunch: (event: MouseEvent<HTMLAnchorElement>, game: Game) => void;
}
export function GameFloor({
  games,
  copy,
  selected,
  launching,
  motion,
  onSelect,
  onDetails,
  onLaunch,
}: Props) {
  const floor = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const scrollTo = (slug: string, smooth = true) => {
    const rail = floor.current;
    const item = rail?.querySelector<HTMLElement>(
      `[data-slug="${CSS.escape(slug)}"]`,
    );
    if (rail && item && window.matchMedia("(max-width: 760px)").matches) {
      rail.scrollTo({
        left:
          item.offsetLeft -
          rail.offsetLeft -
          (rail.clientWidth - item.offsetWidth) / 2,
        behavior: smooth && motion ? "smooth" : "instant",
      });
    }
    onSelect(slug);
  };
  useEffect(() => {
    if (!initialized.current && games.length) {
      scrollTo(selected, false);
      initialized.current = true;
    }
  }, [games.length]);
  const move = (delta: number) => {
    const index = games.findIndex((game) => game.slug === selected);
    scrollTo(games[(index + delta + games.length) % games.length].slug);
  };
  return (
    <section
      id="games-catalog"
      className="game-floor"
      aria-label={copy.catalog}
    >
      <div
        className="station-rail"
        ref={floor}
        onScroll={() => {
          const rail = floor.current;
          if (!rail || !window.matchMedia("(max-width: 760px)").matches) return;
          const middle =
            rail.getBoundingClientRect().left + rail.clientWidth / 2;
          const nearest = [
            ...rail.querySelectorAll<HTMLElement>(".station"),
          ].sort(
            (a, b) =>
              Math.abs(
                a.getBoundingClientRect().left + a.clientWidth / 2 - middle,
              ) -
              Math.abs(
                b.getBoundingClientRect().left + b.clientWidth / 2 - middle,
              ),
          )[0];
          if (nearest) onSelect(nearest.dataset.slug!);
        }}
      >
        {games.map((game) => (
          <GameStation
            key={game.slug}
            game={game}
            copy={copy}
            selected={selected === game.slug}
            launching={launching === game.slug}
            onSelect={() => scrollTo(game.slug)}
            onDetails={() => onDetails(game)}
            onLaunch={onLaunch}
          />
        ))}
      </div>
      <div className="floor-caption">
        <span className="caption-line" />
        <p>
          <span className="desktop-copy">{copy.chooseGame}</span>
          <span className="mobile-copy">{copy.chooseMobile}</span>
        </p>
        <span className="caption-line" />
      </div>
      <div className="floor-navigation">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label={copy.previous}
        >
          ←
        </button>
        <div className="game-dots">
          {games.map((game) => (
            <button
              key={game.slug}
              className={selected === game.slug ? "is-current" : ""}
              onClick={() => scrollTo(game.slug)}
              aria-label={`${copy.selectGame} — ${game.title}`}
              aria-pressed={selected === game.slug}
            >
              <span />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => move(1)} aria-label={copy.next}>
          →
        </button>
      </div>
    </section>
  );
}
