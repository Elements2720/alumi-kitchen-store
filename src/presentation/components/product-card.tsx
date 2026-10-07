'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { formatEgp } from '@/shared/formatters/currency';
import { AddToCartButton } from './product-actions';

export function ProductCard({ product, locale }: { product: Product; locale: Locale }) {
  const ar = locale === 'ar';
  const price = product.price ?? product.startingPrice;
  return <article className="product-card"><Link href={`/${locale}/shop/${product.slug}`} className="product-media" aria-label={`${product.title[locale]} — ${ar ? 'التفاصيل' : 'Details'}`}><Image src={product.images[0].src} alt={product.images[0].alt[locale]} fill sizes="(max-width: 900px) 100vw, 25vw" loading="lazy" /><span className="product-badge">{ar ? kindLabel(product.kind, true) : kindLabel(product.kind, false)}</span></Link><div className="product-card-copy"><h3><Link href={`/${locale}/shop/${product.slug}`}>{product.title[locale]}</Link></h3><p>{price ? `${formatEgp(price, locale)} ` : ''}<small>{product.price ? (ar ? '· سعر تجريبي' : '· demo price') : (ar ? '· يبدأ من' : '· starting from')}</small></p>{product.kind === 'custom' ? <Link className="text-link" href={`/${locale}/shop/${product.slug}#quote`}>{ar ? 'اطلب عرض سعر' : 'Request a quote'} →</Link> : <AddToCartButton product={product} locale={locale} />}</div></article>;
}

function kindLabel(kind: Product['kind'], arabic: boolean): string {
  const labels = { 'complete-kitchen': ['مطبخ كامل', 'Complete kitchen'], package: ['باكدج', 'Package'], unit: ['وحدة', 'Unit'], custom: ['مخصص', 'Custom'] } as const;
  return labels[kind][arabic ? 0 : 1];
}
