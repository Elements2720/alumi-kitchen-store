'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import type { Locale } from '@/shared/i18n/locales';

const scenes = [{ title: { ar: 'مصمم للاستخدام اليومي', en: 'Made for daily living' }, body: { ar: 'تكوينات علوية وسفلية بمواصفات تجريبية واضحة.', en: 'Upper and lower configurations with clear sample specifications.' } }, { title: { ar: 'تفاصيل مرتبة', en: 'A considered rhythm' }, body: { ar: 'تفاصيل الأبواب والتشطيبات تظهر عندما تتوفر الصور المعتمدة.', en: 'Doors and finishes will be shown when approved imagery is supplied.' } }, { title: { ar: 'من المساحة إلى التصميم', en: 'From space to design' }, body: { ar: 'اختيارات مخصصة حسب احتياج كل مطبخ.', en: 'Custom choices shaped around each kitchen.' } }];

export function StickyCollections({ locale }: { locale: Locale }) {
  return <section className="collections" aria-label={locale === 'ar' ? 'مجموعات المطابخ' : 'Kitchen collections'}>{scenes.map((scene, index) => <StickyScene key={scene.title.en} scene={scene} index={index} locale={locale} />)}</section>;
}

function StickyScene({ scene, index, locale }: { scene: typeof scenes[number]; index: number; locale: Locale }) {
  const track = useRef<HTMLElement>(null);
  useEffect(() => { const element = track.current; if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; let frame = 0; const update = () => { frame = 0; const bounds = element.getBoundingClientRect(); const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - window.innerHeight))); element.style.setProperty('--progress', String(progress)); }; const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); }; update(); window.addEventListener('scroll', onScroll, { passive: true }); return () => { window.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); }; }, []);
  const ar = locale === 'ar';
  return <article className="collection-track" ref={track}><div className="collection-stage"><Image src={index % 2 ? '/assets/cabinet-detail.svg' : '/assets/cabinet-placeholder.svg'} alt={ar ? 'صورة مؤقتة لمجموعة دواليب ألوميتال' : 'Placeholder kitchen collection image'} fill sizes="100vw" /><span className="asset-label">{ar ? 'صورة مؤقتة · مشهد مجموعة' : 'PLACEHOLDER · COLLECTION SCENE'}</span><div className="collection-caption"><div className="caption-image"><Image src="/assets/cabinet-detail.svg" alt="" fill sizes="240px" /></div><div><span className="eyebrow">0{index + 1} / 03</span><h2>{scene.title[locale]}</h2><p>{scene.body[locale]}</p><Link className="button button-dark" href={`/${locale}/shop`}>{ar ? 'تصفح المجموعة' : 'Explore collection'}</Link></div></div></div></article>;
}
