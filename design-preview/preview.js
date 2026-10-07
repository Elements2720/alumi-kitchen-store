// Design-review interactions only. No application scaffold, API or persistence.
const translations = {
  en: { brand: 'Alumi', home: 'Home', shop: 'Shop', about: 'About', support: 'Support', blog: 'Blog', heroLine1: 'Designed for', heroLine2: 'your kitchen', heroCopy: 'Aluminum cabinets and kitchen units, thoughtfully arranged for your home and everyday storage.', shopNow: 'Shop now', picked: 'Hand-picked units', viewAll: 'View All', sample: 'Sample', upper: 'Upper cabinet package', lower: 'Base cabinet unit', sink: 'Sink unit', complete: 'Standard kitchen set', demoPrice: '· demo price', addSample: 'Add sample to cart', productNote: 'PLACEHOLDER: square framing is retained; furniture cutouts will be replaced with actual cabinet/unit photos.', collectionTitle: 'Made for daily living', collectionCopy: 'A collection of upper and lower aluminum cabinets. Final product photos and material details are required.', benefitEyebrow: 'One considered kitchen system', why: 'Why choose us?', benefit1: 'Aluminum cabinet systems', benefit1Copy: 'Upper and lower units for organized storage.', benefit2: 'Standard packages', benefit2Copy: 'Explore clearly defined sample configurations.', benefit3: 'Custom design', benefit3Copy: 'Adapt a design to the available kitchen space.', benefit4: 'Cabinet details', benefit4Copy: 'See doors, finishes, and included units.', viewProduct: 'View product', faqTitle: 'Frequently Asked Questions', faqQuestion: 'Does this preview send orders?', faqAnswer: 'No. V1 is a frontend demo. Order requests, staff confirmation, WhatsApp, and the admin dashboard are future capabilities.', footerCopy: 'Explore kitchen units crafted for your space', footerNote: 'Final contact information, locations, policies and social profiles are not yet supplied.', cartTitle: 'Sample cart', cartNotice: 'PROPOSED STATE: the reference cart panel was not confirmed. Demo only; no order is submitted.', clearCart: 'Clear samples' },
  ar: { brand: 'ألومِي', home: 'الرئيسية', shop: 'المتجر', about: 'من نحن', support: 'تواصل معنا', blog: 'المدونة', heroLine1: 'تصميم يناسب', heroLine2: 'مطبخك', heroCopy: 'دواليب ووحدات مطبخ ألوميتال، بتوزيع يناسب بيتك واحتياجات التخزين اليومية.', shopNow: 'تصفح الآن', picked: 'وحدات مختارة', viewAll: 'عرض الكل', sample: 'نموذج', upper: 'باكدج دواليب علوية', lower: 'وحدة سفلية', sink: 'وحدة حوض', complete: 'مطبخ كامل قياسي', demoPrice: '· سعر تجريبي', addSample: 'إضافة نموذج للسلة', productNote: 'صور مؤقتة: نحافظ على الكادر المربع، وستُستبدل صور الأثاث بصور حقيقية لوحدات الألوميتال.', collectionTitle: 'تفاصيل تناسب يومك', collectionCopy: 'مجموعة دواليب ألوميتال علوية وسفلية. نحتاج صور المنتجات الحقيقية وتفاصيل خاماتها.', benefitEyebrow: 'وحدات بتوزيع متكامل', why: 'ليه تختارنا؟', benefit1: 'وحدات ألوميتال', benefit1Copy: 'دواليب علوية وسفلية لتنظيم التخزين.', benefit2: 'باكدجات قياسية', benefit2Copy: 'تصفح تشكيلات نموذجية بمكونات محددة.', benefit3: 'تصميم حسب المقاس', benefit3Copy: 'تخصيص التصميم حسب مساحة مطبخك.', benefit4: 'تفاصيل الوحدات', benefit4Copy: 'تعرف على الأبواب والتشطيبات والمكونات.', viewProduct: 'عرض المنتج', faqTitle: 'الأسئلة الشائعة', faqQuestion: 'هل المعاينة بتبعت طلبات فعلية؟', faqAnswer: 'لا، الإصدار الأول تجربة واجهة فقط. إرسال الطلبات وتأكيدها وواتساب ولوحة التحكم مميزات هتتفعل لاحقًا.', footerCopy: 'اكتشف وحدات مطبخ تناسب مساحتك', footerNote: 'بيانات التواصل والفروع والسياسات والحسابات النهائية لسه مش متوفرة.', cartTitle: 'سلة تجريبية', cartNotice: 'حالة مقترحة: لوحة السلة في المرجع لم تُتحقق. تجربة فقط، لا يتم إرسال طلب.', clearCart: 'مسح النماذج' }
};
let locale = new URLSearchParams(location.search).get('lang') === 'ar' ? 'ar' : 'en';
let sampleCount = 0;
const root = document.documentElement;
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
let reduceMotion = motionPreference.matches;
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
const cartDialog = document.querySelector('#cart-dialog');
const collectionTrack = document.querySelector('.collection-track');
const popover = document.querySelector('#hotspot-popover');
const hotspots = [...document.querySelectorAll('.hotspot')];

root.dataset.canvas = String(new URLSearchParams(location.search).get('canvas') === '1');

function updateCart() {
  document.querySelector('.cart-count').textContent = String(sampleCount);
  document.querySelector('#cart-status').textContent = locale === 'ar' ? `عدد النماذج: ${sampleCount}` : `${sampleCount} sample item(s).`;
}

function setLanguage() {
  root.lang = locale;
  root.dir = locale === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(element => { element.textContent = translations[locale][element.dataset.i18n]; });
  document.querySelector('#language-toggle').textContent = locale === 'ar' ? 'English / LTR' : 'العربية / RTL';
  updateCart();
}

function setMenu(open) {
  mobileNav.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
}

function setReducedMotion() {
  root.dataset.reduced = String(reduceMotion || motionPreference.matches);
  document.querySelector('#motion-toggle').setAttribute('aria-pressed', root.dataset.reduced);
  updateCollection();
}

function updateCollection() {
  const bounds = collectionTrack.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
  collectionTrack.style.setProperty('--progress', root.dataset.reduced === 'true' ? '1' : String(progress));
}

function updateScrollLayout() {
  const inset = innerWidth > 900 ? 16 : 10;
  root.style.setProperty('--header-top', `${Math.max(inset, document.querySelector('.hero').getBoundingClientRect().top + inset)}px`);
  updateCollection();
}

document.querySelector('#language-toggle').addEventListener('click', () => { locale = locale === 'en' ? 'ar' : 'en'; setLanguage(); });
document.querySelector('#motion-toggle').addEventListener('click', () => { reduceMotion = !reduceMotion; setReducedMotion(); });
motionPreference.addEventListener('change', setReducedMotion);
menuToggle.addEventListener('click', () => setMenu(mobileNav.hidden));
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.querySelectorAll('[data-slide]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('.hero-photo').src = `assets/reference-hero-${button.dataset.slide}.png`;
  document.querySelectorAll('[data-slide]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
}));
document.querySelectorAll('.add-sample').forEach(button => button.addEventListener('click', () => { sampleCount += 1; updateCart(); }));
document.querySelector('.cart-toggle').addEventListener('click', () => cartDialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => cartDialog.close());
document.querySelector('#clear-cart').addEventListener('click', () => { sampleCount = 0; updateCart(); });
hotspots.forEach((button, index) => button.addEventListener('click', () => {
  const open = button.getAttribute('aria-expanded') !== 'true';
  hotspots.forEach(other => { other.setAttribute('aria-expanded', String(open && other === button)); other.textContent = open && other === button ? '×' : '+'; });
  popover.hidden = !open;
  popover.querySelector('strong').textContent = translations[locale][['upper', 'lower', 'sink'][index]];
}));
document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  if (!mobileNav.hidden) { setMenu(false); menuToggle.focus(); }
  const activeHotspot = hotspots.find(button => button.getAttribute('aria-expanded') === 'true');
  if (activeHotspot) { popover.hidden = true; activeHotspot.setAttribute('aria-expanded', 'false'); activeHotspot.textContent = '+'; activeHotspot.focus(); }
});
let framePending = false;
addEventListener('scroll', () => {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => { updateScrollLayout(); framePending = false; });
}, { passive: true });
addEventListener('resize', updateScrollLayout);
setLanguage();
setReducedMotion();
updateScrollLayout();
