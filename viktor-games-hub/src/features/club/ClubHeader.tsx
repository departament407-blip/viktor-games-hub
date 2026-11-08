import type { HubSection } from "../navigation/useHubSection";
import "../navigation/navigation.css";
import type { ReactNode } from "react";
import type { Locale, SiteContent } from "../../shared/config/site-content";

export function BrandMark() {
  return (
    <svg viewBox="0 0 48 42" fill="none" aria-hidden="true">
      <path d="M2 2h9l15 25L41 2h7L26 40 2 2Z" fill="currentColor" />
      <path d="m16 2 12 20 4-7L24 2h-8Z" fill="currentColor" opacity=".5" />
    </svg>
  );
}

interface Props {
  section: HubSection;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  copy: SiteContent;
  children: ReactNode;
}

export function ClubHeader({
  locale,
  onLocaleChange,
  copy,
  children,
  section,
}: Props) {
  return (
    <header className="club-header">
      <a className="brand" href="#top" aria-label={copy.siteName}>
        <BrandMark />
        <span>
          VIKTOR <span>GAMES LAB</span>
        </span>
      </a>
      <nav className="header-nav" aria-label={copy.sections}>
        <a
          href="#games"
          className="header-tab"
          aria-current={section === "games" ? "page" : undefined}
        >
          {copy.catalog}
        </a>
        <a
          href="#applications"
          className="header-tab"
          aria-current={section === "applications" ? "page" : undefined}
        >
          {copy.applications}
        </a>
      </nav>
      <div className="header-controls">
        {children}
        <label className="language-control">
          <span className="sr-only">{copy.language}</span>
          <select
            value={locale}
            onChange={(event) => onLocaleChange(event.target.value as Locale)}
          >
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </label>
      </div>
    </header>
  );
}
