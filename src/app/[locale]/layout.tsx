import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockContentRepository } from '@/data/content/mock-content-repository';
import { SiteFooter } from '@/presentation/components/site-footer';
import { SiteHeader } from '@/presentation/components/site-header';
import { CartProvider } from '@/presentation/state/cart-provider';
import { pageMetadata } from '@/shared/config/metadata';
import { isLocale } from '@/shared/i18n/locale-utils';
import { supportedLocales, type Locale } from '@/shared/i18n/locales';

export function generateStaticParams() { return supportedLocales.map((locale) => ({ locale })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return pageMetadata(locale, locale === 'ar' ? 'مطابخ ألوميتال مصممة لمساحتك' : 'Aluminum kitchens designed for your space', locale === 'ar' ? 'متجر تجريبي ثنائي اللغة لوحدات ودواليب المطابخ.' : 'A bilingual demo storefront for aluminum kitchen cabinets and units.');
}

export default async function LocaleLayout({ children, params }: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const labels = mockContentRepository.getCopy(locale).nav;
  return <CartProvider><SiteHeader locale={locale} labels={labels} />{children}<SiteFooter locale={locale} labels={labels} /></CartProvider>;
}
