import type { CartItem } from './cart-item';

export function addItem(items: CartItem[], item: CartItem): CartItem[] {
  const existing = items.find((cartItem) => cartItem.productId === item.productId);
  if (existing) return items.map((cartItem) => cartItem.productId === item.productId ? { ...cartItem, quantity: cartItem.quantity + item.quantity } : cartItem);
  return [...items, { ...item, quantity: Math.max(1, item.quantity) }];
}

export function setQuantity(items: CartItem[], productId: string, quantity: number): CartItem[] {
  return items.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item);
}

export function removeItem(items: CartItem[], productId: string): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function clearCart(): CartItem[] {
  return [];
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}
