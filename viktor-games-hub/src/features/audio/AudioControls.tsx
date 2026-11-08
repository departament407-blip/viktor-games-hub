import type { SiteContent } from "../../shared/config/site-content";
import type { ClubAudio } from "./useClubAudio";
import { playlist } from "./playlist";

export function AudioControls({
  audio,
  copy,
}: {
  audio: ClubAudio;
  copy: SiteContent;
}) {
  const label = audio.loading
    ? copy.soundLoading
    : audio.playing
      ? copy.soundOn
      : copy.soundOff;
  return (
    <div className={`audio-controls ${audio.playing ? "is-playing" : ""}`}>
      <button
        className="audio-toggle"
        type="button"
        onClick={() => void audio.toggle()}
        disabled={audio.loading}
        aria-pressed={audio.playing}
        aria-label={label}
        title={label}
      >
        <span className="equalizer" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className="audio-label">{label}</span>
      </button>
      <label className="volume-control">
        <span className="sr-only">{copy.volume}</span>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={Math.round(audio.volume * 100)}
          onChange={(event) =>
            audio.setVolume(Number(event.target.value) / 100)
          }
          aria-valuetext={`${Math.round(audio.volume * 100)}%`}
        />
        <span aria-hidden="true">{Math.round(audio.volume * 100)}%</span>
      </label>
      {audio.playing && (
        <span className="now-playing" aria-live="polite">
          {playlist[audio.track].title}
        </span>
      )}
      {audio.error && (
        <p className="audio-error" role="alert">
          {copy.audioError}
        </p>
      )}
    </div>
  );
}
