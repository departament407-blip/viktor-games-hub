import type { Game } from "../features/games/games-types";

export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];

export interface GamesUiLabels {
  statusLabels: Record<Game["status"], string>;
  play: string;
  details: string;
  unavailable: string;
  tagsAriaLabel: string;
}

export const appCopy = {
  ru: {
    htmlLang: "ru",
    title: "Viktor Games Lab | Браузерные игры",
    metaDescription:
      "Viktor Games Lab - игровой хаб с браузерными экспериментами. Играй в Сапёр: Последняя ошибка и следи за новыми релизами.",
    brandAriaLabel: "Главная страница Viktor Games Lab",
    navAriaLabel: "Основная навигация",
    languageAriaLabel: "Выбор языка",
    nav: {
      featured: "Главная игра",
      catalog: "Каталог",
      about: "О лаборатории",
    },
    hero: {
      eyebrow: "Браузерные игры и тактические эксперименты",
      title: "Игровой хаб\nViktor Games Lab",
      lead:
        "Небольшая лаборатория браузерных игр: тактика, риск, быстрые прототипы и живые релизы без лишней витрины.",
      playFeatured: "Играть в Сапёр",
      browseCatalog: "Смотреть каталог",
      statGames: "1 опубликованная игра",
      statBuilds: "Railway deploy",
    },
    featured: {
      eyebrow: "Главная игра",
      title: "Сапёр: Последняя ошибка",
      text:
        "Тактическая версия сапёра с оперативниками, HP, перками и биомами. Каждый шаг по сетке может быть последней ошибкой.",
      api: "Каталог загружен из live API игр.",
      fallback: "Показан локальный каталог. API игр можно подключить позже через /api/games.",
    },
    catalog: {
      eyebrow: "Каталог игр",
      title: "Игры лаборатории",
      text: "Пока здесь первый опубликованный релиз и несколько направлений, которые могут вырасти в следующие игры.",
    },
    about: {
      eyebrow: "О лаборатории",
      title: "Игры сначала. Архитектура - без шума.",
      text:
        "Хаб остаётся лёгким frontend-проектом: React, TypeScript, Vite и Railway. Backend/API можно подключить позже, когда каталогу понадобится реальная динамика.",
      stackTitle: "Как собрано",
      processTitle: "Как развивается",
      stack: ["React", "TypeScript", "Vite", "Tailwind", "Railway", "API-ready"],
      process: ["Прототип", "Играбельный релиз", "Итерации по балансу"],
    },
    gamesGrid: {
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
    footer: {
      tagline: "Браузерные игры, тактические эксперименты и аккуратные релизы.",
      railway: "Railway",
      github: "GitHub",
      backToTop: "Наверх",
    },
  },
  en: {
    htmlLang: "en",
    title: "Viktor Games Lab | Browser Games",
    metaDescription:
      "Viktor Games Lab is a browser games hub for playable experiments. Play Saper: Last Mistake and follow new releases.",
    brandAriaLabel: "Viktor Games Lab home",
    navAriaLabel: "Primary navigation",
    languageAriaLabel: "Language selection",
    nav: {
      featured: "Featured",
      catalog: "Catalog",
      about: "About",
    },
    hero: {
      eyebrow: "Browser games and tactical experiments",
      title: "Viktor Games Lab\ngame hub",
      lead:
        "A small browser game lab for tactical experiments, risk, fast prototypes and playable releases without extra noise.",
      playFeatured: "Play Saper",
      browseCatalog: "Browse catalog",
      statGames: "1 published game",
      statBuilds: "Railway deploy",
    },
    featured: {
      eyebrow: "Featured game",
      title: "Saper: Last Mistake",
      text:
        "A tactical minesweeper with operatives, HP, perks and biomes. Every move across the grid can become the last mistake.",
      api: "Loaded from the live games API.",
      fallback: "Showing the local catalog. The /api/games endpoint can be connected later.",
    },
    catalog: {
      eyebrow: "Games catalog",
      title: "Lab games",
      text: "The hub currently has the first published release and a few directions that may grow into future games.",
    },
    about: {
      eyebrow: "About the lab",
      title: "Games first. Architecture kept quiet.",
      text:
        "The hub stays a lightweight frontend: React, TypeScript, Vite and Railway. A backend/API can be connected later when the catalog needs real dynamic data.",
      stackTitle: "Built with",
      processTitle: "Workflow",
      stack: ["React", "TypeScript", "Vite", "Tailwind", "Railway", "API-ready"],
      process: ["Prototype", "Playable release", "Balance iterations"],
    },
    gamesGrid: {
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
    footer: {
      tagline: "Browser games, tactical experiments and careful releases.",
      railway: "Railway",
      github: "GitHub",
      backToTop: "Back to top",
    },
  },
} as const;
