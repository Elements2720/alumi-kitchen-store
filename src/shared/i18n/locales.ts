export const supportedLocales = ['ar', 'en'] as const;

export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = 'ar';
