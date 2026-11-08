import { useEffect, useRef } from "react";
import type { RefObject } from "react";

export function LaserLights({
  analyser,
  enabled,
  playing,
}: {
  analyser: RefObject<AnalyserNode | null>;
  enabled: boolean;
  playing: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0,
      width = 0,
      height = 0,
      energy = 0;
    const bins = new Uint8Array(128);
    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (analyser.current && enabled && playing) {
        analyser.current.getByteFrequencyData(bins);
        const bass = bins.slice(1, 12).reduce((a, b) => a + b, 0) / 11 / 255;
        energy += (bass - energy) * 0.18;
      } else energy *= 0.9;
      const phase = enabled ? time / 1000 : 0;
      for (let side = 0; side < 2; side++) {
        const rgb = side ? "236,56,255" : "32,227,255";
        const x = width * (side ? 0.79 : 0.2),
          y = height * 0.14;
        for (let i = 0; i < 7; i++) {
          const spread = Math.sin(phase * 0.13 + i * 0.29 + side * 2) * 0.23;
          const destX = width * (0.05 + i * 0.15 + spread);
          const destY = height * (0.7 + (i % 3) * 0.1);
          const gradient = ctx.createLinearGradient(x, y, destX, destY);
          gradient.addColorStop(0, `rgba(${rgb},${0.13 + energy * 0.17})`);
          gradient.addColorStop(0.55, `rgba(${rgb},${0.06 + energy * 0.08})`);
          gradient.addColorStop(1, `rgba(${rgb},0)`);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1.2 + energy * 1.6;
          ctx.shadowBlur = 8;
          ctx.shadowColor = `rgb(${rgb})`;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(destX, destY);
          ctx.stroke();
        }
      }
      if (enabled && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      resize();
      draw(performance.now());
    };
    const observer = new ResizeObserver(refresh);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", refresh);
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", refresh);
    };
  }, [analyser, enabled, playing]);
  return <canvas ref={ref} className="laser-lights" aria-hidden="true" />;
}
