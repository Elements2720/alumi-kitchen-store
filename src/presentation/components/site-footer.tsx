import Link from 'next/link';
import type { Locale } from '@/shared/i18n/locales';
import { DemoSubscribe } from './demo-subscribe';

export function SiteFooter({ locale, labels }: { locale: Locale; labels: Record<'home' | 'shop' | 'about' | 'support' | 'blog', string> }) {
  const ar = locale === 'ar';
  return <footer className="site-footer rail"><div className="footer-top"><div><span className="eyebrow">{ar ? 'بيانات تجريبية' : 'Demo content'}</span><h2>{ar ? 'مطبخ مصمم لمساحتك.' : 'A kitchen designed for your space.'}</h2><p className="demo-note">{ar ? 'الاسم والأسعار وبيانات التواصل في هذه النسخة أمثلة قابلة للاستبدال.' : 'Name, prices, and contact details in this version are replaceable samples.'}</p></div><DemoSubscribe locale={locale} /></div><div className="footer-wordmark">{ar ? 'ألومِي' : 'Alumi'}</div><div className="footer-bottom"><nav aria-label={ar ? 'روابط الصفحات' : 'Page links'}>{Object.entries(labels).map(([key, label]) => <Link key={key} href={`/${locale}/${key === 'home' ? '' : key}`}>{label}</Link>)}</nav><nav aria-label={ar ? 'السياسات' : 'Policies'}><Link href={`/${locale}/policies/shipping-returns`}>{ar ? 'الشحن والاسترجاع' : 'Shipping & returns'}</Link><Link href={`/${locale}/policies/terms-conditions`}>{ar ? 'الشروط' : 'Terms'}</Link><Link href={`/${locale}/policies/privacy-policy`}>{ar ? 'الخصوصية' : 'Privacy'}</Link></nav><span>{ar ? 'الموقع ووسائل التواصل — بيانات تجريبية' : 'Location and social roles — demo data'}</span></div></footer>;
}
