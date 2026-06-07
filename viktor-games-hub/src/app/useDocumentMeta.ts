interface DocumentMeta {
  description: string;
  image: string;
  title: string;
}

export function useDocumentMeta({ description, image, title }: DocumentMeta) {
  const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
  document.querySelector('meta[property="og:description"]')?.setAttribute("content", description);
  document.querySelector('meta[property="og:image"]')?.setAttribute("content", imageUrl);
  document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", title);
  document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", description);
  document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", imageUrl);
}
