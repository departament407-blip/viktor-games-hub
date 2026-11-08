import { useEffect, useState } from "react";
import {
  readPreference,
  savePreference,
} from "../../shared/config/preferences";
export function useLightEffects() {
  const [enabled, setEnabled] = useState(
    () => readPreference("lights", "on") === "on",
  );
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => setReduced(query.matches);
    query.addEventListener("change", change);
    return () => query.removeEventListener("change", change);
  }, []);
  return {
    enabled: enabled && !reduced,
    toggle: () => {
      setEnabled(!enabled);
      savePreference("lights", enabled ? "off" : "on");
    },
    reduced,
  };
}
