import { useCallback, useEffect, useRef, useState } from "react";
import {
  readPreference,
  savePreference,
} from "../../shared/config/preferences";
import { ClubAudioEngine } from "./ClubAudioEngine";

export function useClubAudio() {
  const engine = useRef<ClubAudioEngine | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const alive = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [track, setTrack] = useState(0);
  const [volume, setVolumeState] = useState(() => {
    const value = Number(readPreference("volume", "0.35"));
    return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.35;
  });

  const pause = useCallback(() => {
    engine.current?.pause();
    setPlaying(false);
  }, []);
  const setVolume = (value: number) => {
    setVolumeState(value);
    engine.current?.setVolume(value);
    savePreference("volume", String(value));
  };
  const toggle = async () => {
    if (loading) return;
    if (playing) {
      pause();
      return;
    }
    setLoading(true);
    setError(false);
    try {
      if (!engine.current) {
        engine.current = new ClubAudioEngine((index) => {
          if (alive.current) setTrack(index);
        });
        analyser.current = engine.current.analyser;
      }
      engine.current.setVolume(volume);
      const started = await engine.current.play();
      if (alive.current) setPlaying(started);
    } catch {
      if (alive.current) setError(true);
    } finally {
      if (alive.current) setLoading(false);
    }
  };

  useEffect(() => {
    alive.current = true;
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pause);
    return () => {
      alive.current = false;
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", pause);
      engine.current?.dispose();
      engine.current = null;
      analyser.current = null;
    };
  }, [pause]);
  return {
    playing,
    loading,
    error,
    volume,
    track,
    analyser,
    toggle,
    pause,
    setVolume,
  };
}
export type ClubAudio = ReturnType<typeof useClubAudio>;
