import type { Product } from './entities/product';
import type { ProductFilters } from './repositories/catalog-repository';
import type { Locale, LocalizedText } from './value-objects/locale';

export function selectLocalizedText(text: LocalizedText, locale: Locale): string {
  return text[locale];
}

export function filterProducts(products: Product[], filters: ProductFilters = {}): Product[] {
  const query = filters.query?.trim().toLocaleLowerCase();
  return products.filter((product) => {
    const matchesKind = !filters.kind || product.kind === filters.kind;
    const matchesTag = !filters.tag || product.tags.includes(filters.tag);
    const searchable = [product.title.en, product.title.ar, product.description.en, product.description.ar].join(' ').toLocaleLowerCase();
    return matchesKind && matchesTag && (!query || searchable.includes(query));
  });
}
