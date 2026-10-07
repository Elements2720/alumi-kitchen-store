import type { LocalizedText } from '../catalog/value-objects/locale';

export type CartItem = {
  productId: string;
  title: LocalizedText;
  price: number;
  quantity: number;
};
