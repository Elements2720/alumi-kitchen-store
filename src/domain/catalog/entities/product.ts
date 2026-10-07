import type { LocalizedText } from '../value-objects/locale';
import type { ProductKind } from '../value-objects/product-kind';

export type ProductImage = {
  id: string;
  src: string;
  alt: LocalizedText;
  width: number;
  height: number;
  role: 'hero' | 'gallery' | 'thumbnail';
};

export type Product = {
  id: string;
  slug: string;
  kind: ProductKind;
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  shape?: LocalizedText;
  price?: number;
  startingPrice?: number;
  currency: 'EGP';
  images: ProductImage[];
  dimensions: LocalizedText;
  finish: LocalizedText;
  includedUnits: LocalizedText[];
  tags: string[];
  featured: boolean;
};
