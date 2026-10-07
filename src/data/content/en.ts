import type { PageCopy } from '@/domain/content/content-repository';

export const enContent: PageCopy = {
  nav: { home: 'Home', shop: 'Shop', about: 'About', support: 'Support', blog: 'Journal' },
  articles: [
    { slug: 'planning-a-kitchen-that-fits', title: { ar: 'تصميم مطبخ يناسب المساحة', en: 'Planning a kitchen that fits' }, excerpt: { ar: 'خطوات أولية لتخطيط الوحدات.', en: 'A few first steps for planning cabinet units.' }, body: { ar: 'هذا مقال تجريبي عن ترتيب الوحدات، المقاسات، واختيار التشطيب. المحتوى النهائي سيُكتب بعد اعتماد معلومات المتجر.', en: 'This demo article looks at unit placement, dimensions, and finish selection. Final editorial content will be added after store information is approved.' }, image: '/assets/cabinet-placeholder.svg' },
    { slug: 'upper-cabinet-dimensions', title: { ar: 'كيف تختار مقاسات الدواليب العلوية', en: 'Choosing upper cabinet dimensions' }, excerpt: { ar: 'مرجع تجريبي للتخزين العلوي.', en: 'A sample guide to upper storage.' }, body: { ar: 'اختيار المقاسات يعتمد على الحائط والمساحة المتاحة. هذه صفحة نموذجية وليست إرشادًا نهائيًا.', en: 'Dimensions depend on the wall and available space. This is sample content, not final technical guidance.' }, image: '/assets/cabinet-detail.svg' },
    { slug: 'aluminum-kitchen-finishes', title: { ar: 'التشطيبات والألوان في المطابخ', en: 'Finishes and colours in kitchens' }, excerpt: { ar: 'تجربة بصرية للتشطيبات.', en: 'A visual exploration of finishes.' }, body: { ar: 'هذه المساحة مخصصة لمحتوى العناية بالخامات والتشطيبات بعد توفير البيانات المعتمدة.', en: 'This space is reserved for approved material and finish care information.' }, image: '/assets/cabinet-placeholder.svg' },
  ],
  policies: {
    'shipping-returns': { ar: 'سياسة الشحن والاسترجاع — مسودة تجريبية', en: 'Shipping & returns — demo draft' },
    'terms-conditions': { ar: 'الشروط والأحكام — مسودة تجريبية', en: 'Terms & conditions — demo draft' },
    'privacy-policy': { ar: 'سياسة الخصوصية — مسودة تجريبية', en: 'Privacy policy — demo draft' },
  },
};
