import { notFound } from 'next/navigation';
import { isLocale } from '@/shared/i18n/locale-utils';
import { mockCatalogRepository } from '@/data/catalog/mock-catalog-repository';
import { HomePage } from '@/presentation/sections/home/home-page';

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <HomePage locale={locale} products={mockCatalogRepository.getFeaturedProducts()} />;
}
