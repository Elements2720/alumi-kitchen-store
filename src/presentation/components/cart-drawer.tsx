'use client';

import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';
import { formatEgp } from '@/shared/formatters/currency';
import { useCart } from '@/presentation/state/cart-provider';

export function CartDrawer({ locale, open, onClose }: { locale: Locale; open: boolean; onClose: () => void }) {
  const { items, total, remove, setQuantity, clear } = useCart();
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (open) closeRef.current?.focus(); }, [open]);
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); if (open) document.addEventListener('keydown', closeOnEscape); return () => document.removeEventListener('keydown', closeOnEscape); }, [open, onClose]);
  if (!open) return null;
  const ar = locale === 'ar';
  return <div className="drawer-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <div className="drawer-heading"><div><span className="eyebrow">{ar ? 'تجربة محلية' : 'Local prototype'}</span><h2 id="cart-title">{ar ? 'السلة التجريبية' : 'Demo cart'}</h2></div><button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label={ar ? 'إغلاق السلة' : 'Close cart'}>×</button></div>
      <p className="demo-note">{ar ? 'تجربة فقط — لم يتم إرسال أو حفظ أي شيء.' : 'Demo only — nothing was sent or saved.'}</p>
      {items.length === 0 ? <div className="empty-state"><p>{ar ? 'السلة فارغة.' : 'Your cart is empty.'}</p><button className="button button-outline" type="button" onClick={onClose}>{ar ? 'متابعة التصفح' : 'Continue browsing'}</button></div> : <>
        <div className="cart-items">{items.map((item) => <div className="cart-item" key={item.productId}><div><strong>{item.title[locale]}</strong><span>{formatEgp(item.price, locale)}</span></div><div className="quantity-control"><button type="button" onClick={() => setQuantity(item.productId, item.quantity - 1)} aria-label={ar ? 'تقليل الكمية' : 'Decrease quantity'}>−</button><span>{item.quantity}</span><button type="button" onClick={() => setQuantity(item.productId, item.quantity + 1)} aria-label={ar ? 'زيادة الكمية' : 'Increase quantity'}>+</button><button type="button" className="remove-link" onClick={() => remove(item.productId)}>{ar ? 'حذف' : 'Remove'}</button></div></div>)}</div>
        <div className="cart-total"><span>{ar ? 'الإجمالي التجريبي' : 'Demo total'}</span><strong>{formatEgp(total, locale)}</strong></div><DemoOrderForm locale={locale} /><button type="button" className="button button-ghost" onClick={clear}>{ar ? 'مسح السلة' : 'Clear cart'}</button>
      </>}
    </aside>
  </div>;
}

function DemoOrderForm({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const ar = locale === 'ar';
  return submitted ? <p className="form-success" role="status">{ar ? 'تمت المحاكاة فقط — لم يتم إرسال أو حفظ الطلب.' : 'Simulation complete — no order was sent or saved.'}</p> : <form className="mini-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><h3>{ar ? 'بيانات طلب تجريبي' : 'Demo order details'}</h3><label>{ar ? 'الاسم' : 'Name'}<input required name="name" /></label><label>{ar ? 'الهاتف' : 'Phone'}<input required name="phone" type="tel" /></label><label>{ar ? 'المنطقة / العنوان' : 'Area / address'}<input required name="area" /></label><label>{ar ? 'ملاحظات' : 'Notes'}<textarea name="notes" rows={2} /></label><button className="button button-dark" type="submit">{ar ? 'محاكاة الطلب' : 'Simulate order'}</button><p className="demo-note">{ar ? 'تجربة فقط — لم يتم إرسال أو حفظ أي شيء.' : 'Demo only — nothing is sent or saved.'}</p></form>;
}
