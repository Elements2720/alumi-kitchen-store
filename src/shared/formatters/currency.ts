import type { Locale } from '@/shared/i18n/locales';

export function formatEgp(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(locale === 'ar' ? 'ar-EG' : 'en-EG', { style: 'currency', currency: 'EGP', maximumFractionDigits: 0 }).format(amount);
}
