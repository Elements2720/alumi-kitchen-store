'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { Locale } from '@/shared/i18n/locales';
import type { Product } from '@/domain/catalog/entities/product';
import { validateQuoteRequest } from '@/domain/quote/quote-request';

export function QuoteForm({ locale, product, onClose }: { locale: Locale; product?: Product; onClose?: () => void }) {
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string | null>(null);
  const ar = locale === 'ar';
  useEffect(() => { const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && onClose?.(); document.addEventListener('keydown', closeOnEscape); return () => document.removeEventListener('keydown', closeOnEscape); }, [onClose]);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  return <div className="quote-panel" id="quote" role="dialog" aria-modal="true" aria-labelledby="quote-title"><div className="drawer-heading"><div><span className="eyebrow">{ar ? 'طلب تصميم' : 'Design request'}</span><h2 id="quote-title">{ar ? 'صمم مطبخك حسب مساحتك' : 'Design your kitchen for your space'}</h2></div>{onClose && <button type="button" className="icon-button" onClick={onClose} aria-label={ar ? 'إغلاق' : 'Close'}>×</button>}</div>{product && <p className="selected-design">{ar ? 'التصميم المحدد:' : 'Selected design:'} <strong>{product.title[locale]}</strong></p>}{sent ? <p className="form-success" role="status">{ar ? 'تمت محاكاة الطلب فقط — لم يتم إرسال أو حفظ أي طلب.' : 'Simulation complete — no request was sent or saved.'}</p> : <form className="form-grid" onSubmit={(event) => { event.preventDefault(); const form = new FormData(event.currentTarget); const nextErrors = validateQuoteRequest({ name: String(form.get('name') ?? ''), phone: String(form.get('phone') ?? ''), area: String(form.get('area') ?? ''), productId: product?.id }); setErrors(nextErrors); if (!Object.keys(nextErrors).length) setSent(true); }}><Field label={ar ? 'الاسم' : 'Name'} name="name" error={errors.name} required /><Field label={ar ? 'الهاتف' : 'Phone'} name="phone" type="tel" error={errors.phone} required /><Field label={ar ? 'المنطقة / العنوان' : 'Area / address'} name="area" error={errors.area} required /><Field label={ar ? 'المقاسات (اختياري)' : 'Dimensions (optional)'} name="dimensions" /><Field label={ar ? 'تفضيلات الخامات' : 'Cabinet preferences'} name="preferences" /><Field label={ar ? 'ملاحظات' : 'Notes'} name="notes" textarea /><label>{ar ? 'صورة مرجعية (اختياري، محلي فقط)' : 'Reference image (optional, local only)'}<input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; setPreview((current) => { if (current) URL.revokeObjectURL(current); return file ? URL.createObjectURL(file) : null; }); }} />{preview && <Image className="local-preview" src={preview} width={120} height={80} unoptimized alt={ar ? 'معاينة محلية للصورة المختارة' : 'Local preview of selected image'} />}</label><button className="button button-dark" type="submit">{ar ? 'محاكاة طلب عرض السعر' : 'Simulate quote request'}</button><p className="demo-note">{ar ? 'تجربة فقط — لا يتم رفع الصورة أو إرسال أو حفظ البيانات.' : 'Demo only — the image is not uploaded and nothing is sent or saved.'}</p></form>}</div>;
}

function Field({ label, name, type = 'text', error, required = false, textarea = false }: { label: string; name: string; type?: string; error?: string; required?: boolean; textarea?: boolean }) {
  return <label>{label}{textarea ? <textarea name={name} rows={3} aria-required={required} /> : <input name={name} type={type} aria-required={required} />}{error && <small className="field-error">Required</small>}</label>;
}
