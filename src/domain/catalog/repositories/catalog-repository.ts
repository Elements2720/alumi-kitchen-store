import type { Product } from '../entities/product';
import type { ProductKind } from '../value-objects/product-kind';

export type ProductFilters = { kind?: ProductKind; tag?: string; query?: string };

export interface CatalogRepository {
  listProducts(filters?: ProductFilters): Product[];
  getProductBySlug(slug: string): Product | undefined;
  getFeaturedProducts(): Product[];
}
