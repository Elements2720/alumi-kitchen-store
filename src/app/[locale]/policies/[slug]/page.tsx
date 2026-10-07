import { notFound } from 'next/navigation';
import { mockContentRepository } from '@/data/content/mock-content-repository';
import { PolicyPage } from '@/presentation/sections/info-pages';
import { isLocale } from '@/shared/i18n/locale-utils';
export async function generateStaticParams() { return (['ar', 'en'] as const).flatMap((locale) => Object.keys(mockContentRepository.getCopy(locale).policies).map((slug) => ({ locale, slug }))); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale: value, slug } = await params; if (!isLocale(value)) notFound(); const title = mockContentRepository.getCopy(value).policies[slug]; if (!title) notFound(); return <PolicyPage locale={value} title={title[value]} />; }
