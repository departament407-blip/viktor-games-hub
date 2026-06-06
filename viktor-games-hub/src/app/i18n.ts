export type Locale = "ru" | "en";

export const locales: Locale[] = ["ru", "en"];

export const appCopy = {
  ru: {
    htmlLang: "ru",
    metaDescription:
      "Viktor Games Lab - хаб браузерных игр, созданный с TypeScript, Railway, PostgreSQL и AI-помощью в разработке.",
    brandAriaLabel: "Главная страница Viktor Games Lab",
    navAriaLabel: "Основная навигация",
    languageAriaLabel: "Выбор языка",
    nav: {
      games: "Игры",
      stack: "Стек",
      process: "Процесс",
    },
    hero: {
      eyebrow: "Хаб браузерных игр",
      lead: "Браузерные игры, созданные с TypeScript, Railway, PostgreSQL и AI-помощью в разработке.",
      explore: "Смотреть игры",
      railway: "Готово для Railway",
    },
    featured: {
      eyebrow: "Избранные игры",
      title: "Игровые эксперименты, собранные в одном месте.",
      api: "Каталог загружен из live API игр.",
      fallback: "Показан локальный каталог, пока API игр не подключен.",
    },
    stack: {
      eyebrow: "Технологии",
      title: "Сейчас лёгкий frontend, дальше архитектура готова к API.",
    },
    process: {
      eyebrow: "Процесс разработки",
      title: "Лаборатория остаётся лёгкой, пока не понадобится настоящий сервис.",
      steps: [
        {
          label: "Прототип",
          text: "Игровые идеи быстро доводятся до браузерного прототипа, а затем сжимаются до фокусного первого релиза.",
        },
        {
          label: "Релиз",
          text: "Статическая frontend-сборка остаётся простой сейчас и готовой к backend-каталогу, когда хаб вырастет.",
        },
        {
          label: "Итерации",
          text: "Игровые системы, баланс и интерфейс улучшаются небольшими видимыми шагами.",
        },
      ],
    },
    gamesGrid: {
      statusLabels: {
        published: "Опубликовано",
        development: "В разработке",
        prototype: "Прототип",
        planned: "Запланировано",
      },
      play: "Играть",
      details: "Подробнее",
      tagsAriaLabel: "Теги игры",
    },
    footer: {
      tagline: "Браузерные игры, по одному играбельному билду за раз.",
      backToTop: "Наверх",
    },
  },
  en: {
    htmlLang: "en",
    metaDescription:
      "Viktor Games Lab is a browser games hub built with TypeScript, Railway, PostgreSQL and AI-assisted development.",
    brandAriaLabel: "Viktor Games Lab home",
    navAriaLabel: "Primary navigation",
    languageAriaLabel: "Language selection",
    nav: {
      games: "Games",
      stack: "Stack",
      process: "Process",
    },
    hero: {
      eyebrow: "Browser games hub",
      lead: "Browser games built with TypeScript, Railway, PostgreSQL and AI-assisted development.",
      explore: "Explore games",
      railway: "Railway ready",
    },
    featured: {
      eyebrow: "Featured games",
      title: "Playable experiments, gathered in one place.",
      api: "Loaded from the live games catalog.",
      fallback: "Showing the local catalog while the games API is not connected.",
    },
    stack: {
      eyebrow: "Tech stack",
      title: "Small frontend now, API-ready architecture next.",
    },
    process: {
      eyebrow: "Development process",
      title: "The lab stays lightweight until a real service is needed.",
      steps: [
        {
          label: "Prototype",
          text: "Playable browser concepts are shaped quickly, then trimmed to a focused first release.",
        },
        {
          label: "Ship",
          text: "Static frontend builds stay simple now, with room for a backend catalog when the hub grows.",
        },
        {
          label: "Iterate",
          text: "Game systems, balance changes, and UI polish are improved in small visible loops.",
        },
      ],
    },
    gamesGrid: {
      statusLabels: {
        published: "Published",
        development: "In development",
        prototype: "Prototype",
        planned: "Planned",
      },
      play: "Play",
      details: "Details",
      tagsAriaLabel: "Game tags",
    },
    footer: {
      tagline: "Browser games, shipped one playable build at a time.",
      backToTop: "Back to top",
    },
  },
} as const;
