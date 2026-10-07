'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { formatEgp } from '@/shared/formatters/currency';

export function ShoppableImage({ locale, products }: { locale: Locale; products: Product[] }) {
  const [active, setActive] = useState<number | null>(0);
  const triggers = useRef<Array<HTMLButtonElement | null>>([]);
  const ar = locale === 'ar';
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === 'Escape' && setActive(null); document.addEventListener('keydown', close); return () => document.removeEventListener('keydown', close); }, []);
  const hotspotProducts = [products.find((product) => product.id === 'upper-package'), products.find((product) => product.id === 'base-cabinet'), products.find((product) => product.id === 'sink-unit')].filter(Boolean) as Product[];
  return <section className="hotspot-section rail"><div className="section-center"><span className="eyebrow">{ar ? 'تسوق من المشهد' : 'Shop the scene'}</span><h2>{ar ? 'كل وحدة لها مكان' : 'Every unit has its place'}</h2></div><div className="hotspot-scene"><Image src="/assets/cabinet-placeholder.svg" alt={ar ? 'صورة مؤقتة لمشهد تركيب دواليب ألوميتال' : 'Placeholder aluminum cabinet installation'} fill sizes="(max-width: 900px) 100vw, 94vw" /><span className="asset-label">{ar ? 'صورة مؤقتة · نقاط المنتجات ستتطابق مع صورة حقيقية' : 'PLACEHOLDER · HOTSPOTS MAP TO FINAL INSTALLATION IMAGE'}</span>{hotspotProducts.map((product, index) => <button key={product.id} ref={(element) => { triggers.current[index] = element; }} className={`hotspot hotspot-${index + 1}`} type="button" aria-label={`${ar ? 'عرض' : 'Show'} ${product.title[locale]}`} aria-expanded={active === index} aria-controls="hotspot-popover" onClick={() => setActive(active === index ? null : index)}>{active === index ? '×' : '+'}</button>)}{active !== null && <div className="hotspot-popover" id="hotspot-popover" role="dialog" aria-labelledby="hotspot-title"><strong id="hotspot-title">{hotspotProducts[active].title[locale]}</strong><p>{formatEgp(hotspotProducts[active].price ?? hotspotProducts[active].startingPrice ?? 0, locale)} · {ar ? 'سعر تجريبي' : 'demo price'}</p><Link href={`/${locale}/shop/${hotspotProducts[active].slug}`}>{ar ? 'عرض المنتج' : 'View product'} →</Link></div>}</div></section>;
}
