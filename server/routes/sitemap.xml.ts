import productsData from '../../content/data/products.json';
import videosData from '../../content/data/videos.json';

export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml');

  const baseUrl = 'https://sidawigarage.com';
  const currentDate = new Date().toISOString().split('T')[0];

  // Static high-level routes
  const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/products', priority: '0.9', changefreq: 'daily' },
    { loc: '/videos', priority: '0.8', changefreq: 'weekly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  // Dynamic product routes from static JSON
  const productRoutes = productsData.map((product) => ({
    loc: `/products/${product.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  const allUrls = [...staticRoutes, ...productRoutes];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `  <url>
    <loc>${baseUrl}${item.loc}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return xml;
});
