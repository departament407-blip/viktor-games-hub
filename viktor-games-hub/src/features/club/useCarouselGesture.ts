import { useRef } from "react";
import type { PointerEvent, MouseEvent } from "react";

export function useCarouselGesture(move: (direction: number) => void) {
  const start = useRef<{ x: number; y: number; id: number } | null>(null);
  const dragged = useRef(false);
  return {
    onPointerDown(event: PointerEvent<HTMLDivElement>) {
      dragged.current = false;
      if (
        !event.isPrimary ||
        event.button !== 0 ||
        (event.target as Element).closest(".station-actions")
      )
        return;
      start.current = {
        x: event.clientX,
        y: event.clientY,
        id: event.pointerId,
      };
    },
    onPointerMove(event: PointerEvent<HTMLDivElement>) {
      const point = start.current;
      if (!point || point.id !== event.pointerId) return;
      const dx = event.clientX - point.x;
      const dy = event.clientY - point.y;
      if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.3) {
        dragged.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
      }
    },
    onPointerUp(event: PointerEvent<HTMLDivElement>) {
      const point = start.current;
      start.current = null;
      if (!point || point.id !== event.pointerId) return;
      const dx = event.clientX - point.x;
      const dy = event.clientY - point.y;
      if (
        dragged.current &&
        Math.abs(dx) > 45 &&
        Math.abs(dx) > Math.abs(dy) * 1.3
      )
        move(dx < 0 ? 1 : -1);
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
    },
    onPointerCancel() {
      start.current = null;
    },
    onClickCapture(event: MouseEvent<HTMLDivElement>) {
      if (dragged.current && event.detail !== 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    },
  };
}
