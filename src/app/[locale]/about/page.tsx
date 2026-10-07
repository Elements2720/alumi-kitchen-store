import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AboutPage } from '@/presentation/sections/info-pages';
import { pageMetadata } from '@/shared/config/metadata';
import { isLocale } from '@/shared/i18n/locale-utils';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, locale === 'ar' ? 'من نحن' : 'About', locale === 'ar' ? 'تعرف على تجربة ألومِي التجريبية.' : 'Learn about the Alumi demo experience.', '/about') : {}; }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <AboutPage locale={locale} />; }
