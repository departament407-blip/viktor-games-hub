import { useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import type { Game } from "../games/games-types";
import type { SiteContent } from "../../shared/config/site-content";

export function GameDetails({
  game,
  copy,
  onClose,
  onLaunch,
}: {
  game: Game;
  copy: SiteContent;
  onClose: () => void;
  onLaunch: (event: MouseEvent<HTMLAnchorElement>, game: Game) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className="game-dialog"
      aria-labelledby="detail-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="dialog-content">
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label={copy.close}
        >
          ×
        </button>
        <img
          src={game.cardPreviewImage ?? game.coverImage}
          alt={game.coverAlt ?? game.title}
        />
        <div className="dialog-copy">
          <h2 id="detail-title">{game.title}</h2>
          <p>{game.description}</p>
          <ul>
            {game.tags?.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {game.playUrl ? (
            <a
              className="play-button"
              href={game.playUrl}
              onClick={(event) => onLaunch(event, game)}
            >
              {copy.play} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <p className="development-status">{copy.inDevelopment}</p>
          )}
        </div>
      </div>
    </dialog>
  );
}
