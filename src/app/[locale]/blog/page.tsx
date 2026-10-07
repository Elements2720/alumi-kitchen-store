import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockContentRepository } from '@/data/content/mock-content-repository';
import { BlogPage } from '@/presentation/sections/info-pages';
import { pageMetadata } from '@/shared/config/metadata';
import { isLocale } from '@/shared/i18n/locale-utils';
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, locale === 'ar' ? 'المدونة' : 'Journal', locale === 'ar' ? 'مقالات تجريبية عن تخطيط المطابخ.' : 'Demo notes about planning kitchens.', '/blog') : {}; }
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <BlogPage locale={locale} content={mockContentRepository.getCopy(locale)} />; }
