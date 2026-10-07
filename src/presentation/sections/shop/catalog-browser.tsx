'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/domain/catalog/entities/product';
import type { ProductKind } from '@/domain/catalog/value-objects/product-kind';
import type { Locale } from '@/shared/i18n/locales';
import { filterProducts } from '@/domain/catalog/catalog-rules';
import { ProductCard } from '@/presentation/components/product-card';

export function CatalogBrowser({ locale, products }: { locale: Locale; products: Product[] }) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<ProductKind | undefined>();
  const [tag, setTag] = useState<string | undefined>();
  const ar = locale === 'ar';
  const visible = useMemo(() => filterProducts(products, { query, kind, tag }), [products, query, kind, tag]);
  const clear = () => { setQuery(''); setKind(undefined); setTag(undefined); };
  return <div className="shop-layout"><aside className="filter-rail"><label>{ar ? 'بحث' : 'Search'}<input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={ar ? 'ابحث في المنتجات' : 'Search products'} /></label><label>{ar ? 'نوع المنتج' : 'Product type'}<select value={kind ?? ''} onChange={(event) => setKind((event.target.value || undefined) as ProductKind | undefined)}><option value="">{ar ? 'كل المنتجات' : 'All products'}</option><option value="complete-kitchen">{ar ? 'مطابخ كاملة' : 'Complete kitchens'}</option><option value="package">{ar ? 'باكدجات' : 'Packages'}</option><option value="unit">{ar ? 'وحدات' : 'Units'}</option><option value="custom">{ar ? 'تصاميم مخصصة' : 'Custom designs'}</option></select></label><label>{ar ? 'المجموعة' : 'Collection'}<select value={tag ?? ''} onChange={(event) => setTag(event.target.value || undefined)}><option value="">{ar ? 'كل المجموعات' : 'All collections'}</option>{['modern', 'classic', 'upper', 'base', 'sink', 'l-shape'].map((option) => <option key={option} value={option}>{option}</option>)}</select></label><button className="button button-ghost" type="button" onClick={clear}>{ar ? 'مسح الفلاتر' : 'Clear all'}</button></aside><section className="shop-results" aria-live="polite"><h2 className="sr-only">{ar ? 'نتائج المنتجات' : 'Product results'}</h2><div className="results-heading"><span>{visible.length} {ar ? 'منتجات' : 'products'}</span></div>{visible.length ? <div className="shop-grid">{visible.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div> : <div className="empty-state shop-empty"><h2>{ar ? 'لا توجد نتائج' : 'No results'}</h2><p>{ar ? 'جرب كلمة بحث أو فلترًا مختلفًا.' : 'Try another search or filter.'}</p><button className="button button-dark" type="button" onClick={clear}>{ar ? 'عرض كل المنتجات' : 'Show all products'}</button></div>}</section></div>;
}
