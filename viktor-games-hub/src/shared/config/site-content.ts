import type { Game } from "../../features/games/games-types";

export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];

export interface GamesUiLabels {
  statusLabels: Record<Game["status"], string>;
  play: string;
  details: string;
  unavailable: string;
  tagsAriaLabel: string;
}

interface SiteNavContent {
  featured: string;
  catalog: string;
  about: string;
}

export interface SiteContent {
  htmlLang: string;
  siteName: string;
  siteTagline: string;
  seoTitle: string;
  seoDescription: string;
  brandAriaLabel: string;
  navAriaLabel: string;
  languageAriaLabel: string;
  nav: SiteNavContent;
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  heroStatGames: string;
  heroStatBuilds: string;
  heroDeployLabel: string;
  featuredEyebrow: string;
  apiCatalogNote: string;
  fallbackCatalogNote: string;
  catalogEyebrow: string;
  catalogTitle: string;
  catalogDescription: string;
  aboutEyebrow: string;
  aboutTitle: string;
  aboutDescription: string;
  stackTitle: string;
  processTitle: string;
  stack: readonly string[];
  process: readonly string[];
  footerText: string;
  footerRailway: string;
  footerGithub: string;
  footerBackToTop: string;
  gameLabels: GamesUiLabels;
}

export const siteContent = {
  htmlLang: "ru",
  siteName: "Viktor Games Lab",
  siteTagline: "Браузерные игры, тактические эксперименты и аккуратные релизы.",
  seoTitle: "Viktor Games Lab | Браузерные игры",
  seoDescription:
    "Viktor Games Lab - игровой хаб с браузерными экспериментами. Играй в Сапёр: Последняя ошибка и следи за новыми релизами.",
  brandAriaLabel: "Главная страница Viktor Games Lab",
  navAriaLabel: "Основная навигация",
  languageAriaLabel: "Выбор языка",
  nav: {
    featured: "Главная игра",
    catalog: "Каталог",
    about: "О лаборатории",
  },
  heroEyebrow: "Браузерные игры и тактические эксперименты",
  heroTitle: "Игровой хаб\nViktor Games Lab",
  heroDescription:
    "Небольшая лаборатория браузерных игр: тактика, риск, быстрые прототипы и живые релизы без лишней витрины.",
  primaryButtonText: "Играть в Сапёр",
  secondaryButtonText: "Смотреть каталог",
  heroStatGames: "1 опубликованная игра",
  heroStatBuilds: "Railway deploy",
  heroDeployLabel: "deploy",
  featuredEyebrow: "Главная игра",
  apiCatalogNote: "Каталог загружен из live API игр.",
  fallbackCatalogNote: "Показан локальный каталог. API игр можно подключить позже через /api/games.",
  catalogEyebrow: "Каталог игр",
  catalogTitle: "Игры лаборатории",
  catalogDescription:
    "Пока здесь первый опубликованный релиз и несколько направлений, которые могут вырасти в следующие игры.",
  aboutEyebrow: "О лаборатории",
  aboutTitle: "Игры сначала. Архитектура - без шума.",
  aboutDescription:
    "Хаб остаётся лёгким frontend-проектом: React, TypeScript, Vite и Railway. Backend/API можно подключить позже, когда каталогу понадобится реальная динамика.",
  stackTitle: "Как собрано",
  processTitle: "Как развивается",
  stack: ["React", "TypeScript", "Vite", "Tailwind", "Railway", "API-ready"],
  process: ["Прототип", "Играбельный релиз", "Итерации по балансу"],
  footerText: "Браузерные игры, тактические эксперименты и аккуратные релизы.",
  footerRailway: "Railway",
  footerGithub: "GitHub",
  footerBackToTop: "Наверх",
  gameLabels: {
    statusLabels: {
      published: "Опубликовано",
      development: "В разработке",
      prototype: "Прототип",
      planned: "Скоро",
    },
    play: "Играть",
    details: "Подробнее",
    unavailable: "Скоро",
    tagsAriaLabel: "Теги игры",
  },
} satisfies SiteContent;

export const siteContentByLocale = {
  ru: siteContent,
  en: {
    htmlLang: "en",
    siteName: "Viktor Games Lab",
    siteTagline: "Browser games built with TypeScript, Railway, PostgreSQL and AI-assisted development.",
    seoTitle: "Viktor Games Lab | Browser Games",
    seoDescription:
      "Viktor Games Lab is a browser games hub for playable experiments. Play Saper: Last Mistake and follow new releases.",
    brandAriaLabel: "Viktor Games Lab home",
    navAriaLabel: "Primary navigation",
    languageAriaLabel: "Language selection",
    nav: {
      featured: "Featured",
      catalog: "Catalog",
      about: "About",
    },
    heroEyebrow: "Browser games and tactical experiments",
    heroTitle: "Viktor Games Lab\ngame hub",
    heroDescription:
      "Browser games built with TypeScript, Railway, PostgreSQL and AI-assisted development.",
    primaryButtonText: "Play Saper",
    secondaryButtonText: "Browse catalog",
    heroStatGames: "1 published game",
    heroStatBuilds: "Railway deploy",
    heroDeployLabel: "deploy",
    featuredEyebrow: "Featured game",
    apiCatalogNote: "Loaded from the live games API.",
    fallbackCatalogNote: "Showing the local catalog. The /api/games endpoint can be connected later.",
    catalogEyebrow: "Games catalog",
    catalogTitle: "Lab games",
    catalogDescription: "The hub currently has the first published release and a few directions that may grow into future games.",
    aboutEyebrow: "About the lab",
    aboutTitle: "Games first. Architecture kept quiet.",
    aboutDescription:
      "The hub stays a lightweight frontend: React, TypeScript, Vite and Railway. A backend/API can be connected later when the catalog needs real dynamic data.",
    stackTitle: "Built with",
    processTitle: "Workflow",
    stack: ["React", "TypeScript", "Vite", "Tailwind", "Railway", "API-ready"],
    process: ["Prototype", "Playable release", "Balance iterations"],
    footerText: "Browser games, tactical experiments and careful releases.",
    footerRailway: "Railway",
    footerGithub: "GitHub",
    footerBackToTop: "Back to top",
    gameLabels: {
      statusLabels: {
        published: "Published",
        development: "In development",
        prototype: "Prototype",
        planned: "Coming soon",
      },
      play: "Play",
      details: "Details",
      unavailable: "Soon",
      tagsAriaLabel: "Game tags",
    },
  },
} satisfies Record<Locale, SiteContent>;
