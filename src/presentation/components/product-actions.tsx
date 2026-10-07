'use client';

import { useRef, useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { useCart } from '@/presentation/state/cart-provider';
import { QuoteForm } from './quote-form';

export function AddToCartButton({ product, locale }: { product: Product; locale: Locale }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const ar = locale === 'ar';
  return <button className="button button-outline product-action" type="button" onClick={() => { add({ productId: product.id, title: product.title, price: product.price ?? 0, quantity: 1 }); setAdded(true); }}>{added ? (ar ? 'تمت الإضافة ✓' : 'Added ✓') : (ar ? 'أضف للسلة' : 'Add to cart')}</button>;
}

export function ProductActions({ product, locale }: { product: Product; locale: Locale }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const requestTrigger = useRef<HTMLButtonElement>(null);
  const customizeTrigger = useRef<HTMLButtonElement>(null);
  const activeTrigger = useRef<HTMLButtonElement>(null);
  const ar = locale === 'ar';
  return <div className="product-actions"><div className="action-row">{product.kind === 'custom' ? <button className="button button-dark" ref={requestTrigger} type="button" onClick={() => { activeTrigger.current = requestTrigger.current; setQuoteOpen(true); }}>{ar ? 'اطلب عرض سعر' : 'Request a quote'}</button> : <button className="button button-dark" type="button" onClick={() => { add({ productId: product.id, title: product.title, price: product.price ?? 0, quantity: 1 }); setAdded(true); }}>{added ? (ar ? 'تمت الإضافة ✓' : 'Added ✓') : (ar ? 'أضف للسلة' : 'Add to cart')}</button>}<button className="button button-outline" ref={customizeTrigger} type="button" onClick={() => { activeTrigger.current = customizeTrigger.current; setQuoteOpen(true); }}>{ar ? 'خصص هذا التصميم' : 'Customize this design'}</button></div>{quoteOpen && <QuoteForm locale={locale} product={product} onClose={() => { setQuoteOpen(false); activeTrigger.current?.focus(); }} />}</div>;
}
