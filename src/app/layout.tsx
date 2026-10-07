import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Noto_Sans_Arabic, Public_Sans } from 'next/font/google';
import './globals.css';
import { getDirection } from '@/shared/i18n/locale-utils';
import type { Locale } from '@/shared/i18n/locales';

export const metadata: Metadata = {
  title: 'Alumi — Aluminum kitchen systems',
  description: 'A bilingual demo storefront for aluminum kitchen cabinets and units.',
  robots: { index: false, follow: false },
};

const publicSans = Public_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-public-sans', display: 'swap' });
const arabicSans = Noto_Sans_Arabic({ subsets: ['arabic'], weight: ['400', '500', '600'], variable: '--font-arabic', display: 'swap' });

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const requestHeaders = await headers();
  const locale: Locale = requestHeaders.get('x-locale') === 'en' ? 'en' : 'ar';
  return <html lang={locale} dir={getDirection(locale)} suppressHydrationWarning><body className={`${publicSans.variable} ${arabicSans.variable}`}>{children}</body></html>;
}
