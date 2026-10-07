'use client';

import { createContext, useContext, useMemo, useState } from 'react';
import type { CartItem } from '@/domain/cart/cart-item';
import { addItem, clearCart, getCartTotal, removeItem, setQuantity } from '@/domain/cart/cart-rules';

type CartContextValue = { items: CartItem[]; total: number; add: (item: CartItem) => void; remove: (id: string) => void; setQuantity: (id: string, quantity: number) => void; clear: () => void };
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [items, setItems] = useState<CartItem[]>([]);
  const value = useMemo<CartContextValue>(() => ({ items, total: getCartTotal(items), add: (item) => setItems((current) => addItem(current, item)), remove: (id) => setItems((current) => removeItem(current, id)), setQuantity: (id, quantity) => setItems((current) => setQuantity(current, id, quantity)), clear: () => setItems(clearCart()) }), [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
