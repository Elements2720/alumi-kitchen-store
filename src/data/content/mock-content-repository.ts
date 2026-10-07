import type { ContentRepository } from '@/domain/content/content-repository';
import { arContent } from './ar';
import { enContent } from './en';

export const mockContentRepository: ContentRepository = { getCopy: (locale) => locale === 'ar' ? arContent : enContent };
