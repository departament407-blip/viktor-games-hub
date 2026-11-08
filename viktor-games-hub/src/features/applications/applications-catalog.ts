import type { Locale } from "../../shared/config/site-content";
export interface Application {
  slug: string;
  title: string;
  url: string;
  image: string;
  category: string;
  description: string;
  note: string;
  steps: string[];
}
export function applicationsCatalog(locale: Locale): Application[] {
  const ru = locale === "ru";
  return [
    {
      slug: "book-studio",
      title: "Book Studio",
      url: "https://bookstudio-web-production.up.railway.app/",
      image: "/assets/applications/book-studio/icon.webp",
      category: ru ? "Генератор книг" : "Book creator",
      description: ru
        ? "Преврати идею в книгу. Продумай структуру, утверди оглавление и переходи к работе над главами."
        : "Turn an idea into a book. Shape the outline, approve the structure and start working on your chapters.",
      note: ru
        ? "Для работы потребуется вход в студию"
        : "Sign in to the studio to start writing",
      steps: ru
        ? ["Идея", "Оглавление", "Рукопись"]
        : ["Idea", "Outline", "Manuscript"],
    },
  ];
}
