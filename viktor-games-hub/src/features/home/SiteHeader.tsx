import type { Locale } from "../../app/i18n";
import { LanguageToggle } from "../../shared/ui/LanguageToggle";

interface SiteHeaderProps {
  activeLocale: Locale;
  brandAriaLabel: string;
  languageAriaLabel: string;
  locales: Locale[];
  nav: {
    featured: string;
    catalog: string;
    about: string;
  };
  navAriaLabel: string;
  onLocaleChange: (locale: Locale) => void;
}

export function SiteHeader({
  activeLocale,
  brandAriaLabel,
  languageAriaLabel,
  locales,
  nav,
  navAriaLabel,
  onLocaleChange,
}: SiteHeaderProps) {
  return (
    <header className="relative z-20 px-[clamp(16px,4vw,56px)] py-4 sm:py-5">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a className="flex min-w-0 items-center gap-3 text-paper no-underline" href="/" aria-label={brandAriaLabel}>
          <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-paper/25 bg-ink/75 text-base font-black text-amber shadow-lab">
            V
          </span>
          <span className="min-w-0">
            <span className="block text-sm font-black leading-tight sm:text-base">Viktor Games Lab</span>
            <span className="block text-xs font-bold leading-tight text-paper/55 sm:text-sm">browser games hub</span>
          </span>
        </a>

        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
          <nav
            className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-[0.82rem] font-bold text-paper/75 sm:justify-end sm:gap-6 sm:text-[0.95rem]"
            aria-label={navAriaLabel}
          >
            <a className="no-underline transition-colors hover:text-amber focus-visible:text-amber" href="#featured-game">
              {nav.featured}
            </a>
            <a className="no-underline transition-colors hover:text-amber focus-visible:text-amber" href="#games-catalog">
              {nav.catalog}
            </a>
            <a className="no-underline transition-colors hover:text-amber focus-visible:text-amber" href="#about-lab">
              {nav.about}
            </a>
          </nav>

          <LanguageToggle
            activeLocale={activeLocale}
            ariaLabel={languageAriaLabel}
            locales={locales}
            onChange={onLocaleChange}
          />
        </div>
      </div>
    </header>
  );
}
