'use client';

import { useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';

export function SupportForm({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const ar = locale === 'ar';
  if (submitted) return <p className="form-success" role="status">{ar ? 'تمت المحاكاة فقط — لم يتم إرسال أو حفظ الرسالة.' : 'Simulation complete — no message was sent or saved.'}</p>;
  return <form className="form-grid" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>{ar ? 'الاسم' : 'Name'}<input required /></label><label>{ar ? 'الهاتف' : 'Phone'}<input required type="tel" /></label><label>{ar ? 'الموضوع' : 'Topic'}<select><option>{ar ? 'استفسار عن تصميم' : 'Design enquiry'}</option><option>{ar ? 'استفسار عن منتج' : 'Product enquiry'}</option></select></label><label>{ar ? 'رقم الطلب (اختياري)' : 'Order number (optional)'}<input /></label><label className="full-field">{ar ? 'الرسالة' : 'Message'}<textarea required rows={5} /></label><button className="button button-dark" type="submit">{ar ? 'محاكاة الإرسال' : 'Simulate send'}</button><p className="demo-note">{ar ? 'تجربة فقط — لم يتم إرسال أو حفظ أي شيء.' : 'Demo only — nothing is sent or saved.'}</p></form>;
}
