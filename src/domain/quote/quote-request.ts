export type QuoteRequest = {
  name: string;
  phone: string;
  area: string;
  dimensions?: string;
  preferences?: string;
  notes?: string;
  productId?: string;
};

export type QuoteFieldErrors = Partial<Record<'name' | 'phone' | 'area', 'required' | 'invalid'>>;

export function validateQuoteRequest(request: QuoteRequest): QuoteFieldErrors {
  const errors: QuoteFieldErrors = {};
  if (!request.name.trim()) errors.name = 'required';
  if (!request.phone.trim()) errors.phone = 'required';
  if (!request.area.trim()) errors.area = 'required';
  return errors;
}
