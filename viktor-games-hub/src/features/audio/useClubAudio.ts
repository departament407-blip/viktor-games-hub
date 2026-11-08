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
  const attempt = useRef(0);
  const waitingForGesture = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [track, setTrack] = useState(0);
  const [volume, setVolumeState] = useState(() => {
    const value = Number(readPreference("volume", "0.35"));
    return Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0.35;
  });
  const currentVolume = useRef(volume);
  const pause = useCallback(() => {
    waitingForGesture.current = false;
    attempt.current++;
    engine.current?.pause();
    setPlaying(false);
    setLoading(false);
  }, []);
  const setVolume = (value: number) => {
    currentVolume.current = value;
    setVolumeState(value);
    engine.current?.setVolume(value);
    savePreference("volume", String(value));
  };
  const start = useCallback(async (automatic = false) => {
    if (document.hidden) return;
    const token = ++attempt.current;
    if (!automatic) waitingForGesture.current = false;
    setLoading(true);
    setError(false);
    try {
      if (!engine.current) {
        engine.current = new ClubAudioEngine((index) => {
          if (alive.current) setTrack(index);
        });
        analyser.current = engine.current.analyser;
      }
      engine.current.setVolume(currentVolume.current);
      const started = await engine.current.play(automatic);
      if (alive.current && token === attempt.current) {
        setPlaying(started);
        if (started) waitingForGesture.current = false;
      }
    } catch {
      if (alive.current && token === attempt.current) setError(true);
    } finally {
      if (alive.current && token === attempt.current) setLoading(false);
    }
  }, []);
  const toggle = () => {
    if (loading) return;
    if (playing) pause();
    else void start();
  };
  useEffect(() => {
    alive.current = true;
    waitingForGesture.current = true;
    void start(true);
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    const onGesture = (event: Event) => {
      if (
        !waitingForGesture.current ||
        document.hidden ||
        (event.target as Element).closest?.("[data-audio-controls]")
      )
        return;
      if (
        event instanceof KeyboardEvent &&
        (event.ctrlKey || event.metaKey || event.altKey || event.key === "Tab")
      )
        return;
      void start();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pause);
    // Bubble after React: a launch/pause button can cancel the pending autostart.
    window.addEventListener("click", onGesture);
    window.addEventListener("keydown", onGesture);
    return () => {
      alive.current = false;
      attempt.current++;
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", pause);
      window.removeEventListener("click", onGesture);
      window.removeEventListener("keydown", onGesture);
      engine.current?.dispose();
      engine.current = null;
      analyser.current = null;
    };
  }, [pause, start]);
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
