import { defaultLocale, supportedLocales, type Locale } from './locales';

export function isLocale(value: string): value is Locale {
  return supportedLocales.includes(value as Locale);
}

export function getDirection(locale: Locale): 'rtl' | 'ltr' {
  return locale === 'ar' ? 'rtl' : 'ltr';
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'ar' ? 'en' : 'ar';
}

export function switchLocalePath(pathname: string, locale: Locale): string {
  const segments = pathname.split('/');
  if (isLocale(segments[1] ?? '')) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join('/') || `/${defaultLocale}`;
}
