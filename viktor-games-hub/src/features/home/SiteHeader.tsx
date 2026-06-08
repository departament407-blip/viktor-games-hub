import type { Locale } from "../../shared/config/site-content";
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
  siteName: string;
}

export function SiteHeader({
  activeLocale,
  brandAriaLabel,
  languageAriaLabel,
  locales,
  nav,
  navAriaLabel,
  onLocaleChange,
  siteName,
}: SiteHeaderProps) {
  return (
    <header className="relative z-20 px-[clamp(16px,4vw,56px)] py-4 sm:py-5">
      <div className="mx-auto flex w-full max-w-[1180px] flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a className="flex min-w-0 items-center gap-3 text-paper no-underline" href="/" aria-label={brandAriaLabel}>
          <img
            className="h-12 w-[165px] shrink-0 object-contain object-left sm:h-14 sm:w-[190px]"
            src="/assets/brand/logo.svg"
            alt={siteName}
          />
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
