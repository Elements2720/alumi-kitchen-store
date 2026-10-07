'use client';

import { useState } from 'react';
import type { Locale } from '@/shared/i18n/locales';

export function DemoSubscribe({ locale }: { locale: Locale }) {
  const [submitted, setSubmitted] = useState(false);
  const ar = locale === 'ar';
  if (submitted) return <p className="form-success" role="status">{ar ? 'تمت المحاكاة فقط — لم يتم حفظ البريد.' : 'Simulation complete — the email was not saved.'}</p>;
  return <form className="footer-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label htmlFor="footer-email">{ar ? 'النشرة التجريبية' : 'Demo newsletter'}</label><div><input id="footer-email" type="email" placeholder={ar ? 'البريد الإلكتروني' : 'Email address'} aria-label={ar ? 'البريد الإلكتروني' : 'Email address'} required /><button className="button button-light" type="submit">{ar ? 'اشتراك' : 'Subscribe'}</button></div><small>{ar ? 'تجربة فقط — لا يتم الحفظ أو الإرسال.' : 'Demo only — nothing is saved or sent.'}</small></form>;
}
