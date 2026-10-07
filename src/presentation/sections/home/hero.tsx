'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';

const slides = [{ image: '/assets/cabinet-placeholder.svg', en: ['Designed for', 'your kitchen'], ar: ['تصميم يناسب', 'مطبخك'] }, { image: '/assets/cabinet-detail.svg', en: ['Storage with', 'a clear rhythm'], ar: ['تخزين', 'بتوزيع واضح'] }];

export function Hero({ locale }: { locale: Locale }) {
  const [active, setActive] = useState(0);
  const ar = locale === 'ar';
  useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 7000); return () => window.clearInterval(timer); }, []);
  const slide = slides[active];
  return <section className="hero"><Image className="hero-image" src={slide.image} alt={ar ? 'صورة مؤقتة — صور دواليب الألوميتال المعتمدة غير متوفرة' : 'Placeholder — approved aluminum cabinet installation image pending'} fill priority sizes="100vw" /><div className="hero-shade" /><span className="asset-label">{ar ? 'صورة مؤقتة · صور دواليب الألوميتال غير متوفرة' : 'PLACEHOLDER · APPROVED ALUMINUM CABINET IMAGE PENDING'}</span><div className="hero-copy"><h1>{(ar ? slide.ar : slide.en).map((line) => <span key={line}>{line}</span>)}</h1><p>{ar ? 'دواليب ووحدات مطبخ ألوميتال، بتوزيع يناسب بيتك واحتياجات التخزين اليومية.' : 'Aluminum cabinets and kitchen units, thoughtfully arranged for your home and everyday storage.'}</p><Link className="button button-light" href={`/${locale}/shop`}>{ar ? 'تصفح المنتجات' : 'Shop kitchens'}</Link></div><div className="hero-thumbnails" role="group" aria-label={ar ? 'اختيار صورة البطل' : 'Hero image selection'}>{slides.map((item, index) => <button key={item.image} type="button" aria-label={`${ar ? 'عرض الصورة' : 'Show slide'} ${index + 1}`} aria-pressed={active === index} onClick={() => setActive(index)}><Image src={item.image} alt="" fill sizes="144px" /></button>)}</div></section>;
}
