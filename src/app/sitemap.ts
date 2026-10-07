import type { MetadataRoute } from 'next';
import { mockCatalogRepository } from '@/data/catalog/mock-catalog-repository';
import { mockContentRepository } from '@/data/content/mock-content-repository';
import { siteConfig } from '@/shared/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/shop', '/about', '/support', '/blog', ...mockCatalogRepository.listProducts().map((product) => `/shop/${product.slug}`), ...mockContentRepository.getCopy('en').articles.map((article) => `/blog/${article.slug}`), ...Object.keys(mockContentRepository.getCopy('en').policies).map((slug) => `/policies/${slug}`)];
  return ['ar', 'en'].flatMap((locale) => paths.map((path) => ({ url: `${siteConfig.url}/${locale}${path}`, lastModified: new Date('2026-10-07') })));
}
