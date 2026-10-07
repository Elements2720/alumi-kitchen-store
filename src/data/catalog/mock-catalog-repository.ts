import { filterProducts } from '@/domain/catalog/catalog-rules';
import type { CatalogRepository, ProductFilters } from '@/domain/catalog/repositories/catalog-repository';
import { mockProducts } from './mock-products';

export const mockCatalogRepository: CatalogRepository = {
  listProducts: (filters?: ProductFilters) => filterProducts(mockProducts, filters),
  getProductBySlug: (slug) => mockProducts.find((product) => product.slug === slug),
  getFeaturedProducts: () => mockProducts.filter((product) => product.featured),
};
