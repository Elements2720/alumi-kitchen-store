import { notFound } from 'next/navigation';
import { mockContentRepository } from '@/data/content/mock-content-repository';
import { ArticlePage } from '@/presentation/sections/info-pages';
import { isLocale } from '@/shared/i18n/locale-utils';
export async function generateStaticParams() { return (['ar', 'en'] as const).flatMap((locale) => mockContentRepository.getCopy(locale).articles.map((article) => ({ locale, slug: article.slug }))); }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale: value, slug } = await params; if (!isLocale(value)) notFound(); const article = mockContentRepository.getCopy(value).articles.find((item) => item.slug === slug); if (!article) notFound(); return <ArticlePage locale={value} article={article} />; }
