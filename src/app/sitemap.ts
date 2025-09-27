import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://alhayatsmart.com';
  
  const routes = [
    '',
    '/products',
    '/smart-home',
    '/about',
    '/contact',
    '/login',
    '/signup'
  ];

  const locales = ['en', 'ar'];
  
  const sitemap: MetadataRoute.Sitemap = [];

  // Add routes for each locale
  locales.forEach(locale => {
    routes.forEach(route => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            ar: `${baseUrl}/ar${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}