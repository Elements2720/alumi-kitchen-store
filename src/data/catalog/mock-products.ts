import type { Product } from '@/domain/catalog/entities/product';
import { placeholderImage } from '@/data/assets/asset-manifest';

const text = (ar: string, en: string) => ({ ar, en });

export const mockProducts: Product[] = [
  {
    id: 'complete-modern', slug: 'modern-standard-kitchen', kind: 'complete-kitchen', featured: true, price: 18500, currency: 'EGP',
    title: text('مطبخ مودرن قياسي', 'Modern standard kitchen'), description: text('تكوين تجريبي كامل يضم وحدات علوية وسفلية.', 'A sample complete configuration with upper and lower units.'), category: text('مطابخ كاملة', 'Complete kitchens'), shape: text('خطي', 'Linear'), images: [placeholderImage('modern-hero', 'hero'), placeholderImage('modern-detail')], dimensions: text('240 × 60 × 220 سم', '240 × 60 × 220 cm'), finish: text('ألواح ألوميتال رمادي — نموذج', 'Grey aluminum panels — sample'), includedUnits: [text('3 وحدات علوية', '3 upper units'), text('3 وحدات سفلية', '3 base units')], tags: ['modern', 'complete'],
  },
  {
    id: 'upper-package', slug: 'upper-cabinet-package', kind: 'package', featured: true, price: 2400, currency: 'EGP',
    title: text('باكدج دواليب علوية', 'Upper cabinet package'), description: text('مجموعة علوية تجريبية للتخزين اليومي.', 'A sample upper-unit set for everyday storage.'), category: text('باكدجات', 'Packages'), images: [placeholderImage('upper'), placeholderImage('upper-detail')], dimensions: text('120 × 35 × 70 سم', '120 × 35 × 70 cm'), finish: text('رمادي مطفي — نموذج', 'Matte grey — sample'), includedUnits: [text('وحدتان علويتان', 'Two upper units')], tags: ['package', 'upper'],
  },
  {
    id: 'base-cabinet', slug: 'base-cabinet-unit', kind: 'unit', featured: true, price: 3200, currency: 'EGP',
    title: text('وحدة دولاب سفلية', 'Base cabinet unit'), description: text('وحدة سفلية منفردة بتكوين تجريبي.', 'A single base cabinet in a sample configuration.'), category: text('وحدات', 'Units'), images: [placeholderImage('base'), placeholderImage('base-detail')], dimensions: text('60 × 60 × 85 سم', '60 × 60 × 85 cm'), finish: text('أبيض — نموذج', 'White — sample'), includedUnits: [text('وحدة سفلية واحدة', 'One base unit')], tags: ['unit', 'base'],
  },
  {
    id: 'sink-unit', slug: 'sink-cabinet-unit', kind: 'unit', featured: true, price: 4500, currency: 'EGP',
    title: text('وحدة حوض', 'Sink cabinet unit'), description: text('وحدة حوض منفردة للتوضيح فقط.', 'A single sink unit shown for demonstration.'), category: text('وحدات', 'Units'), images: [placeholderImage('sink'), placeholderImage('sink-detail')], dimensions: text('80 × 60 × 85 سم', '80 × 60 × 85 cm'), finish: text('رمادي — نموذج', 'Grey — sample'), includedUnits: [text('وحدة حوض واحدة', 'One sink unit')], tags: ['unit', 'sink'],
  },
  {
    id: 'classic-package', slug: 'classic-upper-lower-package', kind: 'package', featured: false, price: 9600, currency: 'EGP',
    title: text('باكدج علوي وسفلي', 'Upper and lower package'), description: text('تكوين مزدوج بمواصفات تجريبية.', 'A paired configuration with sample specifications.'), category: text('باكدجات', 'Packages'), images: [placeholderImage('classic'), placeholderImage('classic-detail')], dimensions: text('180 × 60 × 220 سم', '180 × 60 × 220 cm'), finish: text('فحمي — نموذج', 'Charcoal — sample'), includedUnits: [text('وحدتان علويتان ووحدتان سفليتان', 'Two upper and two base units')], tags: ['package', 'classic'],
  },
  {
    id: 'custom-l-shape', slug: 'custom-l-shaped-design', kind: 'custom', featured: true, startingPrice: 22000, currency: 'EGP',
    title: text('تصميم مخصص على شكل L', 'Custom L-shaped design'), description: text('مرجع تصميم قابل للتعديل حسب مساحة المطبخ.', 'A design reference to adapt to your kitchen space.'), category: text('تصاميم مخصصة', 'Custom designs'), images: [placeholderImage('custom-hero', 'hero'), placeholderImage('custom-detail')], dimensions: text('حسب المساحة', 'By space'), finish: text('يحدد لاحقًا — نموذج', 'To be selected — sample'), includedUnits: [text('تحدد مع التصميم', 'Defined with the design')], tags: ['custom', 'l-shape'],
  },
];
