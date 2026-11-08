export function readPreference(key: string, fallback: string): string {
  try {
    return localStorage.getItem(`vgl.${key}`) ?? fallback;
  } catch {
    return fallback;
  }
}

export function savePreference(key: string, value: string): void {
  try {
    localStorage.setItem(`vgl.${key}`, value);
  } catch {
    // Browser privacy settings can disable storage. Controls still work for this visit.
  }
}
