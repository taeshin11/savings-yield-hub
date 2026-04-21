import { MetadataRoute } from 'next';
import { getAllBanks } from '@/lib/banks';

const BASE_URL = 'https://savings-yield-hub.vercel.app';
const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const cdTerms = ['3-month', '6-month', '1-year', '2-year', '5-year'];

const staticRoutes = [
  '',
  '/banks',
  '/products',
  '/products/hysa',
  '/products/cd',
  '/products/money-market',
  '/calculator',
  '/compare',
];

const contentRoutes = [
  '/about',
  '/how-to-use',
  '/privacy',
  '/terms',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const banks = await getAllBanks();
  const entries: MetadataRoute.Sitemap = [];

  // Static routes × locales
  for (const locale of locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
    // Content pages
    for (const route of contentRoutes) {
      entries.push({
        url: `${BASE_URL}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
    // CD term pages
    for (const term of cdTerms) {
      entries.push({
        url: `${BASE_URL}/${locale}/products/cd/${term}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.7,
      });
    }
    // Bank detail pages
    for (const bank of banks) {
      entries.push({
        url: `${BASE_URL}/${locale}/banks/${bank.slug}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.6,
      });
    }
  }

  return entries;
}
