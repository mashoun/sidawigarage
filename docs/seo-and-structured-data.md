# SEO & Structured Data Guide

This document describes the search engine optimization (SEO), Open Graph metadata, Schema.org JSON-LD structured data, and automated sitemap architecture in **Sidawi Garage**.

---

## 🔍 SEO Strategy & Objectives

The primary goal of the SEO implementation is to establish **Sidawi Garage** and **Mahmoud Sidawi** as the authority for **certified engine oil and transmission fluid servicing in Lebanon**, targeting high-intent keywords:
- `Liqui Moly Lebanon reseller`
- `Addinol high-performance motor oil Beirut`
- `Castrol EDGE certified oil service Lebanon`
- `BMW ZF 8HP transmission oil change Lebanon`
- `DSG gearbox oil flush Beirut`

---

## 🏷️ Meta Tags & Open Graph Specifications

### 1. Global Head Defaults (`nuxt.config.ts`)
Configured to enforce site-wide metadata consistency:

```typescript
app: {
  head: {
    htmlAttrs: { lang: 'en', class: 'dark' },
    title: 'Sidawi Garage | Precision Lubrication & Automotive Fluid Dynamics',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in high-performance motor oil and transmission gear oil servicing by Mahmoud Sidawi.' },
      { name: 'theme-color', content: '#08090C' },
      { property: 'og:site_name', content: 'Sidawi Garage' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://sidawigarage.com' },
      { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    ],
  },
}
```

### 2. Page-Level Dynamic SEO (`useHead`)
Dynamic pages like `app/pages/products/[slug].vue` generate contextual metadata:
- **Title**: `[Product Name] ([Viscosity]) | Sidawi Garage`
- **Description**: Excerpt of chemical properties, OEM approvals, and workshop availability.
- **OG Image**: Direct product bottle image or default gold emblem banner.
- **Canonical URL**: Exact canonical URL preventing duplicate indexing across query parameters.

---

## 📜 Schema.org JSON-LD Structured Data (`useJsonLd.ts`)

Structured data is rendered as `<script type="application/ld+json">` during Nitro's build-time static prerendering.

### 1. `AutoRepair` (LocalBusiness)
Applied on the Homepage and Contact page:
- **`@type`**: `AutoRepair`
- **`name`**: `Sidawi Garage`
- **`telephone`**: `+961 76 850 301`
- **`address`**: Postal address in Beirut, Lebanon (`Sayyed Hadi Highway, Musharrafieh`)
- **`geo`**: Latitude `33.855`, Longitude `35.512`
- **`openingHoursSpecification`**: Weekly schedule including Saturday hours
- **`brand`**: Accredited manufacturer brands (`Liqui Moly`, `Addinol`, `Castrol`)
- **`knowsAbout`**: Specific specialties (e.g., `ZF 8HP Transmission Fluid Flush`, `DSG Fluid Service`)

### 2. `Product` & `Offer`
Rendered on each dynamic product detail page (`/products/[slug]`):
- **`@type`**: `Product`
- **`name`**: Full commercial oil name
- **`sku`**: Product ID
- **`brand`**: Manufacturer Brand object
- **`category`**: Engine Oil vs Transmission Fluid
- **`offers`**: Direct link, availability state (`InStock` vs `OutOfStock`), and seller profile

### 3. `VideoObject`
Rendered on the Video Reels page (`/videos`):
- **`@type`**: `VideoObject`
- **`name`**: Reel title (e.g., `BMW M340i G20 — ZF 8HP Automatic Transmission Flush`)
- **`thumbnailUrl`**: Preview thumbnail
- **`contentUrl`**: Instagram / YouTube / Direct stream URL
- **`uploadDate`**: Service documentation date

### 4. `BreadcrumbList`
Rendered on all subpages to produce hierarchical breadcrumb paths in Google search results:
- Home → Oil Catalog → Product Name
- Home → Client Video Reels
- Home → About Mahmoud Sidawi
- Home → Contact & Directions

---

## 🗺️ Automated XML Sitemap (`server/routes/sitemap.xml.ts`)

A dedicated server route automatically generates an XML sitemap at `/sitemap.xml`:

```typescript
export default defineEventHandler((event) => {
  setHeader(event, 'content-type', 'application/xml');

  const baseUrl = 'https://sidawigarage.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/products', priority: '0.9', changefreq: 'daily' },
    { loc: '/videos', priority: '0.8', changefreq: 'weekly' },
    { loc: '/about', priority: '0.7', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.7', changefreq: 'monthly' },
  ];

  const productRoutes = productsData.map((product) => ({
    loc: `/products/${product.slug}`,
    priority: '0.8',
    changefreq: 'weekly',
  }));

  // Compiles XML standard payload...
});
```

Because `nuxt.config.ts` includes `/sitemap.xml` in `nitro.prerender.routes`, the sitemap is saved directly as a static file in `.output/public/sitemap.xml` at build time.

---

## 🤖 Robots.txt Configuration (`public/robots.txt`)

```
User-agent: *
Allow: /

Sitemap: https://sidawigarage.com/sitemap.xml
```
