import { useEffect, useState } from "react";
export type HubSection = "games" | "applications";
export function useHubSection(): HubSection {
  const read = (): HubSection =>
    window.location.hash.startsWith("#applications") ? "applications" : "games";
  const [section, setSection] = useState(read);
  useEffect(() => {
    const update = () => setSection(read());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return section;
}
