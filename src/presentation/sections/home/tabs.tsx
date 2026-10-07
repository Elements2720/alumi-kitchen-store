'use client';

import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { ProductCard } from '@/presentation/components/product-card';
import Image from 'next/image';
import { useState } from 'react';

export function CollectionTabs({ locale, products }: { locale: Locale; products: Product[] }) {
  const [active, setActive] = useState<'complete-kitchen' | 'package' | 'unit'>('complete-kitchen');
  const ar = locale === 'ar';
  const visible = products.filter((product) => product.kind === active).slice(0, 4);
  const labels = { 'complete-kitchen': ar ? 'مطابخ كاملة' : 'Complete', package: ar ? 'باكدجات' : 'Packages', unit: ar ? 'وحدات' : 'Units' };
  return <section className="tabbed-section rail"><div className="section-center"><span className="eyebrow">{ar ? 'تشكيلات مختارة' : 'Selected collection'}</span><h2>{ar ? 'تشكيلات تناسب إيقاع البيت' : 'A collection with a clear rhythm'}</h2><div className="tabs" role="tablist" aria-label={ar ? 'تصفية التشكيلات' : 'Collection filters'}>{Object.entries(labels).map(([key, label]) => <button key={key} type="button" role="tab" aria-selected={active === key} onClick={() => setActive(key as typeof active)}>{label}</button>)}</div></div><div className="tabbed-layout"><div className="editorial-media"><Image src="/assets/cabinet-placeholder.svg" alt={ar ? 'صورة مؤقتة لمطبخ ألوميتال' : 'Placeholder aluminum kitchen image'} fill sizes="(max-width: 900px) 100vw, 50vw" /><span className="asset-label">{ar ? 'صورة مؤقتة · صورة المطبخ المعتمدة غير متوفرة' : 'PLACEHOLDER · APPROVED KITCHEN IMAGE PENDING'}</span></div><div className="tab-products">{visible.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div></div></section>;
}
