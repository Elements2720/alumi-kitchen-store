'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';
import { getAlternateLocale, switchLocalePath } from '@/shared/i18n/locale-utils';
import { useCart } from '@/presentation/state/cart-provider';
import { CartDrawer } from './cart-drawer';

type HeaderProps = { locale: Locale; labels: Record<'home' | 'shop' | 'about' | 'support' | 'blog', string> };

export function SiteHeader({ locale, labels }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const cartButton = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { items } = useCart();
  const alternate = getAlternateLocale(locale);
  const links = [{ key: 'home', href: `/${locale}` }, { key: 'shop', href: `/${locale}/shop` }, { key: 'about', href: `/${locale}/about` }, { key: 'support', href: `/${locale}/support` }, { key: 'blog', href: `/${locale}/blog` }] as const;
  const closeMenu = () => { setMenuOpen(false); menuButton.current?.focus(); };
  return <>
    <header className="site-header">
      <Link className="wordmark" href={`/${locale}`} aria-label={locale === 'ar' ? 'ألومِي — الرئيسية' : 'Alumi — Home'}>{locale === 'ar' ? 'ألومِي' : 'Alumi'}</Link>
      <nav className="desktop-nav" aria-label={locale === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}>{links.slice(1).map((link) => <Link key={link.key} href={link.href}>{labels[link.key]}</Link>)}</nav>
      <div className="nav-controls"><Link className="locale-link" href={switchLocalePath(pathname, alternate)}>{alternate === 'ar' ? 'العربية' : 'English'}</Link><button ref={menuButton} className="menu-toggle icon-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-nav" aria-label={menuOpen ? (locale === 'ar' ? 'إغلاق القائمة' : 'Close navigation') : (locale === 'ar' ? 'فتح القائمة' : 'Open navigation')} onClick={() => menuOpen ? closeMenu() : setMenuOpen(true)}>{menuOpen ? <span className="close-glyph" aria-hidden="true">×</span> : <span className="menu-glyph" aria-hidden="true"><i /><i /><i /></span>}</button><button ref={cartButton} className="cart-toggle icon-button" type="button" onClick={() => setCartOpen(true)} aria-label={locale === 'ar' ? 'فتح السلة' : 'Open cart'}><span className="cart-glyph" aria-hidden="true" /><span className="cart-count">{items.reduce((count, item) => count + item.quantity, 0)}</span></button></div>
      <nav id="mobile-nav" className="mobile-nav" aria-label={locale === 'ar' ? 'تنقل الهاتف' : 'Mobile navigation'} hidden={!menuOpen}>{links.map((link) => <Link key={link.key} href={link.href} onClick={closeMenu}>{labels[link.key]}</Link>)}<Link href={switchLocalePath(pathname, alternate)} onClick={closeMenu}>{alternate === 'ar' ? 'العربية / RTL' : 'English / LTR'}</Link></nav>
    </header>
    <CartDrawer locale={locale} open={cartOpen} onClose={() => { setCartOpen(false); cartButton.current?.focus(); }} />
  </>;
}
