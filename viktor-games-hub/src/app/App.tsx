import { useEffect, useRef, useState } from "react";
import type { MouseEvent } from "react";
import type { Game } from "../features/games/games-types";
import { useGamesCatalog } from "../features/games/useGamesCatalog";
import { ClubHeader } from "../features/club/ClubHeader";
import { GameFloor } from "../features/club/GameFloor";
import { GameDetails } from "../features/club/GameDetails";
import { LaserLights } from "../features/club/LaserLights";
import { useLightEffects } from "../features/club/useLightEffects";
import { AudioControls } from "../features/audio/AudioControls";
import { useClubAudio } from "../features/audio/useClubAudio";
import {
  siteContentByLocale,
  type Locale,
} from "../shared/config/site-content";
import { readPreference, savePreference } from "../shared/config/preferences";
import { useDocumentMeta } from "./useDocumentMeta";

export function App() {
  const [locale, setLocale] = useState<Locale>(() =>
    readPreference("locale", "ru") === "en" ? "en" : "ru",
  );
  const [selected, setSelected] = useState("saper-last-mistake");
  const [details, setDetails] = useState<string | null>(null);
  const [launching, setLaunching] = useState<string | null>(null);
  const launchTimer = useRef<ReturnType<typeof setTimeout>>();
  const detailOpener = useRef<HTMLElement | null>(null);
  const copy = siteContentByLocale[locale];
  const games = useGamesCatalog(locale);
  const audio = useClubAudio();
  const lights = useLightEffects();
  const detailGame = games.find((game) => game.slug === details);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    savePreference("locale", locale);
    useDocumentMeta({
      description: copy.seoDescription,
      image: "/assets/brand/og-club.jpg",
      title: copy.seoTitle,
    });
  }, [locale, copy]);
  useEffect(() => () => clearTimeout(launchTimer.current), []);

  const launch = (event: MouseEvent<HTMLAnchorElement>, game: Game) => {
    if (
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0 ||
      !game.playUrl
    )
      return;
    audio.pause();
    if (!lights.enabled) return;
    event.preventDefault();
    if (launching) return;
    setLaunching(game.slug);
    launchTimer.current = setTimeout(
      () => window.location.assign(game.playUrl!),
      280,
    );
  };
  const closeDetails = () => {
    setDetails(null);
    requestAnimationFrame(() => detailOpener.current?.focus());
  };

  return (
    <div
      id="top"
      className={`club ${lights.enabled ? "motion-on" : "motion-off"} ${launching ? "club--launching" : ""}`}
    >
      <div className="club-scene" aria-hidden="true">
        <div className="club-hall" />
        <div className="club-haze" />
        <LaserLights
          analyser={audio.analyser}
          enabled={lights.enabled}
          playing={audio.playing}
        />
      </div>
      <a className="skip-link" href="#games-catalog">
        {copy.skip}
      </a>
      <ClubHeader locale={locale} onLocaleChange={setLocale} copy={copy}>
        <AudioControls audio={audio} copy={copy} />
      </ClubHeader>
      <main>
        <div className="club-intro">
          <p className="intro-eyebrow">
            <span />
            VIKTOR GAMES LAB
            <span />
          </p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-description">{copy.heroDescription}</p>
        </div>
        <GameFloor
          games={games}
          copy={copy}
          selected={selected}
          launching={launching}
          motion={lights.enabled}
          onSelect={setSelected}
          onDetails={(game) => {
            detailOpener.current = document.activeElement as HTMLElement;
            setDetails(game.slug);
          }}
          onLaunch={launch}
        />
      </main>
      <footer className="club-footer">
        <p>{copy.footnote}</p>
        <div>
          <button
            className="lights-toggle"
            type="button"
            onClick={lights.toggle}
            aria-pressed={lights.enabled}
            disabled={lights.reduced}
            title={lights.enabled ? copy.effectsOn : copy.effectsOff}
          >
            <span aria-hidden="true">✧</span>
            {lights.enabled ? copy.effectsOn : copy.effectsOff}
          </button>
          <a
            href="https://github.com/departament407-blip/viktor-games-hub"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </div>
      </footer>
      {detailGame && (
        <GameDetails
          game={detailGame}
          copy={copy}
          onClose={closeDetails}
          onLaunch={launch}
        />
      )}
    </div>
  );
}
