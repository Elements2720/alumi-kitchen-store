import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { ProductCard } from '@/presentation/components/product-card';
import { ShoppableImage } from '@/presentation/components/shoppable-image';
import { CollectionTabs } from './tabs';
import { Hero } from './hero';
import { StickyCollections } from './collections';

export function HomePage({ locale, products }: { locale: Locale; products: Product[] }) {
  const ar = locale === 'ar';
  const featured = products.filter((product) => product.featured).slice(0, 4);
  return <main id="main"><Hero locale={locale} /><section className="products-section rail"><div className="section-heading"><h2>{ar ? 'منتجات مختارة' : 'Hand-picked kitchens'}</h2><Link className="text-link" href={`/${locale}/shop`}>{ar ? 'عرض الكل' : 'View all'} →</Link></div><div className="product-grid">{featured.map((product) => <ProductCard key={product.id} product={product} locale={locale} />)}</div><p className="demo-note">{ar ? 'الأسعار والمواصفات المعروضة أمثلة تجريبية.' : 'Displayed prices and specifications are demo samples.'}</p></section><StickyCollections locale={locale} /><Benefits locale={locale} /><CollectionTabs locale={locale} products={products} /><Lookbook locale={locale} /><ShoppableImage locale={locale} products={products} /><Contact locale={locale} /><InspirationGallery locale={locale} /></main>;
}

function Benefits({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  const benefits = ar ? [['نظام ألوميتال', 'وحدات علوية وسفلية للتخزين.'], ['باكدجات واضحة', 'تكوينات نموذجية بمكونات محددة.'], ['تصميم مخصص', 'تعديل التصميم حسب المساحة.'], ['تفاصيل الوحدات', 'أبواب وتشطيبات ومكونات ظاهرة.']] : [['Aluminum systems', 'Upper and lower units for storage.'], ['Clear packages', 'Sample configurations with defined units.'], ['Custom design', 'Adapt a design to the available space.'], ['Unit details', 'Doors, finishes, and included units.']];
  return <section className="benefits-section rail"><div className="rule-row"><span>{ar ? 'نظام مطبخ متكامل' : 'One considered kitchen system'}</span><Link href={`/${locale}/support`}>{ar ? 'تواصل معنا' : 'Talk to us'} →</Link></div><h2 className="centered-heading">{ar ? 'اختيارات واضحة لمطبخك' : 'A clear way to shape your kitchen'}</h2><div className="benefit-grid">{benefits.map(([title, body], index) => <article key={title}><span className="benefit-index">0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>;
}

function Lookbook({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return <section className="lookbook rail"><div className="lookbook-grid"><div className="lookbook-image large"><Image src="/assets/cabinet-placeholder.svg" alt={ar ? 'صورة مؤقتة لتجهيز مطبخ' : 'Placeholder kitchen installation'} fill sizes="(max-width: 900px) 100vw, 55vw" /><span className="asset-label">{ar ? 'صورة مؤقتة · مشروع مطبخ' : 'PLACEHOLDER · KITCHEN PROJECT'}</span></div><div className="lookbook-copy"><span className="eyebrow">{ar ? 'دليل الإلهام' : 'Kitchen lookbook'}</span><h2>{ar ? 'صمم مطبخك حسب مساحتك' : 'Design your kitchen around your space'}</h2><p>{ar ? 'استخدم التصاميم التجريبية كنقطة بداية، ثم اطلب تصورًا مخصصًا.' : 'Use sample designs as a starting point, then request a tailored direction.'}</p><Link className="button button-dark" href={`/${locale}/shop/custom-l-shaped-design#quote`}>{ar ? 'اطلب تصميمًا مخصصًا' : 'Request a custom design'}</Link></div><div className="lookbook-image small"><Image src="/assets/cabinet-detail.svg" alt={ar ? 'صورة مؤقتة لتفاصيل وحدة' : 'Placeholder cabinet detail'} fill sizes="(max-width: 900px) 50vw, 25vw" /><span className="asset-label">{ar ? 'تفصيل مؤقت' : 'PLACEHOLDER DETAIL'}</span></div><div className="lookbook-dark"><span>{ar ? 'خامات · وحدات · مساحة' : 'Finishes · units · space'}</span></div></div></section>;
}

function Contact({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return <section className="contact-section rail"><div className="contact-grid"><div><span className="eyebrow">{ar ? 'تواصل' : 'Contact'}</span><h2>{ar ? 'لنتحدث عن مساحة مطبخك' : 'Let’s talk about your kitchen space'}</h2><p>{ar ? 'بيانات الموقع والهاتف النهائية غير متوفرة بعد. استخدم الدعم أو نموذج عرض السعر في هذه النسخة التجريبية.' : 'Final location and phone details are not supplied yet. Use Support or the quote form in this demo.'}</p><Link className="text-link" href={`/${locale}/support`}>{ar ? 'اذهب إلى الدعم' : 'Go to support'} →</Link></div><div className="contact-media"><Image src="/assets/cabinet-detail.svg" alt={ar ? 'صورة مؤقتة لمشهد مطبخ' : 'Placeholder kitchen scene'} fill sizes="(max-width: 900px) 100vw, 55vw" /><span className="asset-label">{ar ? 'بيانات الموقع مؤقتة' : 'DEMO LOCATION ROLE'}</span></div></div></section>;
}

function InspirationGallery({ locale }: { locale: Locale }) {
  const ar = locale === 'ar';
  return <section className="gallery-section rail"><div className="section-center"><span className="eyebrow">{ar ? 'إلهام ثابت' : 'Static inspiration'}</span><h2>{ar ? 'أفكار لوحدات مطبخك' : 'Ideas for your kitchen units'}</h2><p className="demo-note">{ar ? 'معرض تجريبي — لا يوجد اتصال بخلاصة اجتماعية مباشرة.' : 'Demo gallery — no live social feed is connected.'}</p></div><div className="gallery-grid">{['/assets/cabinet-placeholder.svg', '/assets/cabinet-detail.svg', '/assets/cabinet-placeholder.svg', '/assets/cabinet-detail.svg'].map((src, index) => <div className={`gallery-image gallery-${index + 1}`} key={`${src}-${index}`}><Image src={src} alt={ar ? 'صورة مؤقتة لإلهام دواليب ألوميتال' : 'Placeholder aluminum cabinet inspiration'} fill sizes="(max-width: 900px) 50vw, 25vw" /></div>)}</div></section>;
}
