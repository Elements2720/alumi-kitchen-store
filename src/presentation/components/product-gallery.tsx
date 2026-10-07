'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';

export function ProductGallery({ product, locale }: { product: Product; locale: Locale }) {
  const [active, setActive] = useState(0);
  return <div className="product-gallery"><div className="product-main-image"><Image src={product.images[active].src} alt={product.images[active].alt[locale]} fill priority sizes="(max-width: 900px) 100vw, 55vw" /></div><div className="product-thumbnails" role="group" aria-label={locale === 'ar' ? 'صور المنتج' : 'Product images'}>{product.images.map((image, index) => <button key={image.id} type="button" aria-label={`${locale === 'ar' ? 'عرض الصورة' : 'Show image'} ${index + 1}`} aria-pressed={index === active} onClick={() => setActive(index)}><Image src={image.src} alt="" fill sizes="100px" /></button>)}</div></div>;
}
