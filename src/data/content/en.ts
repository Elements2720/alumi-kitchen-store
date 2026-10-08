import type { PageCopy } from '@/domain/content/content-repository';
import { assetManifest } from '@/data/assets/asset-manifest';

export const enContent: PageCopy = {
  nav: { home: 'Home', shop: 'Shop', about: 'About', support: 'Support', blog: 'Journal' },
  articles: [
    { slug: 'planning-a-kitchen-that-fits', title: { ar: 'العناية بدواليب المطبخ', en: 'Caring for kitchen cabinets' }, excerpt: { ar: 'خطوات أولية للحفاظ على الوحدات.', en: 'Simple steps for caring for cabinet units.' }, body: { ar: 'تعرف على خطوات العناية اليومية بالأبواب والأسطح والتشطيبات.', en: 'Explore simple daily care for cabinet doors, surfaces, and finishes.' }, image: assetManifest.blog.care },
    { slug: 'upper-cabinet-dimensions', title: { ar: 'تخطيط مطبخ يناسب المساحة', en: 'Planning a kitchen layout' }, excerpt: { ar: 'مرجع عملي لتوزيع الوحدات.', en: 'A practical guide to arranging units.' }, body: { ar: 'اختيار التوزيع يعتمد على الحائط والمساحة المتاحة وحركة الاستخدام اليومية.', en: 'A useful layout balances the wall, available space, and everyday movement.' }, image: assetManifest.blog.layout },
    { slug: 'aluminum-kitchen-finishes', title: { ar: 'التشطيبات والألوان في المطابخ', en: 'Finishes and colours in kitchens' }, excerpt: { ar: 'تجربة بصرية للتشطيبات.', en: 'A visual exploration of finishes.' }, body: { ar: 'تعرف على علاقة الألوان والتشطيبات بمظهر وحدات المطبخ.', en: 'Explore how colours and finishes shape the look of kitchen units.' }, image: assetManifest.blog.finishes },
  ],
  policies: {
    'shipping-returns': { ar: 'سياسة الشحن والاسترجاع — مسودة تجريبية', en: 'Shipping & returns — demo draft' },
    'terms-conditions': { ar: 'الشروط والأحكام — مسودة تجريبية', en: 'Terms & conditions — demo draft' },
    'privacy-policy': { ar: 'سياسة الخصوصية — مسودة تجريبية', en: 'Privacy policy — demo draft' },
  },
};
