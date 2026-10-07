import { describe, expect, it } from 'vitest';
import { filterProducts, selectLocalizedText } from './catalog/catalog-rules';
import type { Product } from './catalog/entities/product';
import { addItem, clearCart, getCartTotal, setQuantity } from './cart/cart-rules';
import type { CartItem } from './cart/cart-item';
import { validateQuoteRequest } from './quote/quote-request';
import { getAlternateLocale, getDirection, isLocale, switchLocalePath } from '@/shared/i18n/locale-utils';

const products: Product[] = [
  {
    id: 'complete', slug: 'complete', kind: 'complete-kitchen', title: { ar: 'مطبخ', en: 'Kitchen' }, description: { ar: '', en: '' }, category: { ar: 'مطابخ', en: 'Kitchens' }, price: 18500, currency: 'EGP', images: [], dimensions: { ar: '', en: '' }, finish: { ar: '', en: '' }, includedUnits: [], tags: ['modern'], featured: true,
  },
  {
    id: 'custom', slug: 'custom', kind: 'custom', title: { ar: 'تصميم', en: 'Design' }, description: { ar: '', en: '' }, category: { ar: 'تصميم', en: 'Design' }, startingPrice: 22000, currency: 'EGP', images: [], dimensions: { ar: '', en: '' }, finish: { ar: '', en: '' }, includedUnits: [], tags: ['modern'], featured: false,
  },
];

describe('catalog rules', () => {
  it('selects localized text and filters by kind, tag, query, and no-result', () => {
    expect(selectLocalizedText({ ar: 'عربي', en: 'English' }, 'ar')).toBe('عربي');
    expect(filterProducts(products, { kind: 'custom' })).toHaveLength(1);
    expect(filterProducts(products, { tag: 'modern', query: 'kitchen' })).toHaveLength(1);
    expect(filterProducts(products, { query: 'missing' })).toEqual([]);
  });
});

describe('cart rules', () => {
  it('merges the same product, clamps quantity to one, totals, and clears', () => {
    const first: CartItem = { productId: 'complete', title: products[0].title, price: 18500, quantity: 1 };
    const merged = addItem(addItem([], first), first);
    expect(merged[0].quantity).toBe(2);
    expect(setQuantity(merged, 'complete', 0)[0].quantity).toBe(1);
    expect(getCartTotal(merged)).toBe(37000);
    expect(clearCart()).toEqual([]);
  });
});

describe('quote rules', () => {
  it('requires name, phone, and area while accepting a complete request', () => {
    expect(validateQuoteRequest({ name: '', phone: '', area: '' })).toEqual({ name: 'required', phone: 'required', area: 'required' });
    expect(validateQuoteRequest({ name: 'Mona', phone: '01000000000', area: 'Nasr City' })).toEqual({});
  });
});

describe('locale routing rules', () => {
  it('keeps direction and equivalent route while switching locale', () => {
    expect(isLocale('ar')).toBe(true);
    expect(isLocale('fr')).toBe(false);
    expect(getDirection('ar')).toBe('rtl');
    expect(getDirection('en')).toBe('ltr');
    expect(getAlternateLocale('ar')).toBe('en');
    expect(switchLocalePath('/ar/shop/base-cabinet-unit', 'en')).toBe('/en/shop/base-cabinet-unit');
  });
});
