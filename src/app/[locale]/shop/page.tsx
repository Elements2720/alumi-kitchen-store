import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { mockCatalogRepository } from '@/data/catalog/mock-catalog-repository';
import { CatalogBrowser } from '@/presentation/sections/shop/catalog-browser';
import { pageMetadata } from '@/shared/config/metadata';
import { isLocale } from '@/shared/i18n/locale-utils';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale, locale === 'ar' ? 'المتجر' : 'Shop', locale === 'ar' ? 'تصفح المطابخ والباكدجات والوحدات والتصاميم التجريبية.' : 'Browse complete kitchens, packages, units, and custom demo designs.', '/shop') : {}; }
export default async function ShopPage({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); const ar = locale === 'ar'; return <main className="page-shell" id="main"><div className="page-intro"><span className="eyebrow">{ar ? 'المجموعة' : 'The collection'}</span><h1>{ar ? 'كل ما تحتاجه لمطبخك' : 'Everything for your kitchen'}</h1><p>{ar ? 'تصفح منتجات تجريبية بأسعار EGP ثابتة أو ابدأ تصميمًا مخصصًا.' : 'Browse demo products with fixed EGP prices, or start a custom design.'}</p></div><CatalogBrowser locale={locale} products={mockCatalogRepository.listProducts()} /></main>; }
