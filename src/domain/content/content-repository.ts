import type { Locale, LocalizedText } from '../catalog/value-objects/locale';

export type Article = { slug: string; title: LocalizedText; excerpt: LocalizedText; body: LocalizedText; image: string };
export type PageCopy = { nav: Record<'home' | 'shop' | 'about' | 'support' | 'blog', string>; articles: Article[]; policies: Record<string, LocalizedText> };
export type ContentRepository = { getCopy(locale: Locale): PageCopy };
