export const productKinds = ['complete-kitchen', 'package', 'unit', 'custom'] as const;

export type ProductKind = (typeof productKinds)[number];
