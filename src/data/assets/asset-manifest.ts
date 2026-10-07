import type { ProductImage } from '@/domain/catalog/entities/product';

export const assetManifest = {
  placeholder: {
    source: 'Local generated placeholder; approved aluminum imagery not supplied.',
    rights: 'Internal demo placeholder',
    width: 1200,
    height: 800,
    desktopFocalPoint: 'center',
    mobileFocalPoint: 'center',
  },
  hero: ['/assets/cabinet-placeholder.svg', '/assets/cabinet-detail.svg'],
} as const;

export function placeholderImage(id: string, role: ProductImage['role'] = 'gallery'): ProductImage {
  return {
    id,
    src: role === 'hero' ? assetManifest.hero[0] : '/assets/cabinet-detail.svg',
    alt: { ar: 'صورة مؤقتة — صور دواليب الألوميتال المعتمدة غير متوفرة', en: 'Placeholder — approved aluminum cabinet image pending' },
    width: role === 'hero' ? 1200 : 800,
    height: role === 'hero' ? 800 : 800,
    role,
  };
}
