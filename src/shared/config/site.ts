export const siteConfig = {
  name: 'Alumi',
  nameArabic: 'ألومِي',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://alumi-demo.example',
  demo: process.env.NEXT_PUBLIC_DEMO !== 'false',
} as const;
