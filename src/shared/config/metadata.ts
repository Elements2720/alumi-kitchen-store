import type { Metadata } from 'next';
import type { Locale } from '@/shared/i18n/locales';
import { getAlternateLocale } from '@/shared/i18n/locale-utils';
import { siteConfig } from './site';

export function pageMetadata(locale: Locale, title: string, description: string, path = ''): Metadata {
  const alternate = getAlternateLocale(locale);
  const canonical = `${siteConfig.url}/${locale}${path}`;
  return {
    title: `${title} — ${locale === 'ar' ? siteConfig.nameArabic : siteConfig.name}`,
    description,
    alternates: { canonical, languages: { ar: `${siteConfig.url}/ar${path}`, en: `${siteConfig.url}/en${path}` } },
    openGraph: { title, description, url: canonical, locale, alternateLocale: [alternate], type: 'website' },
    robots: siteConfig.demo ? { index: false, follow: false } : undefined,
  };
}
