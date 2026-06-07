import type { Locale } from "../../app/i18n";

interface LanguageToggleProps {
  activeLocale: Locale;
  ariaLabel: string;
  locales: Locale[];
  onChange: (locale: Locale) => void;
}

export function LanguageToggle({ activeLocale, ariaLabel, locales, onChange }: LanguageToggleProps) {
  return (
    <div
      className="flex shrink-0 rounded-lg border border-paper/20 bg-ink/70 p-1 shadow-lab"
      role="group"
      aria-label={ariaLabel}
    >
      {locales.map((locale) => (
        <button
          className={`min-h-8 rounded-md px-3 text-xs font-black uppercase transition ${
            activeLocale === locale
              ? "bg-amber text-ink"
              : "text-paper/75 hover:text-paper focus-visible:text-paper"
          }`}
          key={locale}
          type="button"
          aria-pressed={activeLocale === locale}
          onClick={() => onChange(locale)}
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
