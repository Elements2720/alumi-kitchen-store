import type { ProductImage } from '@/domain/catalog/entities/product';

const kitchenAsset = (filename: string) => `/assets/kitchen/${filename}`;

export const assetManifest = {
  hero: {
    primary: kitchenAsset('hero-kitchen-01.jpg'),
    alternate: kitchenAsset('hero-kitchen-02.jpg'),
  },
  collections: {
    modern: kitchenAsset('collection-modern.jpg'),
    classic: kitchenAsset('collection-classic.jpg'),
    upperCabinets: kitchenAsset('collection-upper-cabinets.jpg'),
  },
  products: {
    modernKitchen: kitchenAsset('product-modern-kitchen.jpg'),
    upperPackage: kitchenAsset('product-upper-package.jpg'),
    baseUnit: kitchenAsset('product-base-unit.jpg'),
    sinkUnit: kitchenAsset('product-sink-unit.jpg'),
    lShaped: kitchenAsset('product-l-shaped.jpg'),
  },
  details: {
    doorHandle: kitchenAsset('detail-door-handle.jpg'),
    aluminumFinish: kitchenAsset('detail-aluminum-finish.jpg'),
  },
  lookbook: {
    project: kitchenAsset('lookbook-project.jpg'),
    customDesign: kitchenAsset('lookbook-custom-design.jpg'),
  },
  hotspot: kitchenAsset('hotspot-kitchen.jpg'),
  blog: {
    care: kitchenAsset('blog-care.jpg'),
    layout: kitchenAsset('blog-layout.jpg'),
    finishes: kitchenAsset('blog-finishes.jpg'),
  },
} as const;

export function productImage(
  id: string,
  src: string,
  alt: ProductImage['alt'],
  role: ProductImage['role'] = 'gallery',
): ProductImage {
  const squareImage = src.includes('/product-') || src.includes('/detail-');
  return { id, src, alt, width: squareImage ? 2048 : 2528, height: squareImage ? 2048 : 1696, role };
}
