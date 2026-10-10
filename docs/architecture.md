# Architecture Guide

This document describes the software architecture, design principles, and rendering strategies powering **Sidawi Garage**.

---

## 🏛️ High-Level Architectural Pattern

Sidawi Garage uses a **Clean Architecture / Hexagonal** structure combined with a **Jamstack Static-Site Generation (SSG)** paradigm on top of **Nuxt 4**.

```
┌─────────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                         │
│   Nuxt 4 Pages (`app/pages/`) & Vue Components (`app/components/`)│
└───────────────────────────────┬─────────────────────────────────┘
                                │ calls
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      APPLICATION COMPOSABLES                    │
│   `useCatalog` • `useJsonLd` • `useVideoReels` • `useScrollReveal`│
└───────────────────────────────┬─────────────────────────────────┘
                                │ depends on interfaces
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        DOMAIN CONTRACTS                         │
│   `shared/domain/models.ts` & `shared/domain/repositories.ts`   │
└───────────────────────────────▲─────────────────────────────────┘
                                │ implemented by
                                │
┌─────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE LAYER                       │
│   `shared/infrastructure/staticJsonRepositories.ts`              │
│   reads static JSON data from `content/data/*.json`              │
└───────────────────────────────┬─────────────────────────────────┘
                                │ validates against
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       SCHEMA VALIDATION                         │
│   Zod Schemas in `shared/schemas/catalog.schema.ts`             │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Architectural Principles

### 1. Separation of Domain from Presentation
Business logic and data models reside strictly in `shared/domain/`. Vue components never directly import raw JSON files or execute file reading; instead, they interact with composables that consume repository interfaces.

### 2. Dependency Inversion Principle (DIP)
The application layer depends on repository abstractions (`ICatalogRepository`, `IVideoRepository`, `ITestimonialRepository`, `IGarageRepository`). The static JSON implementation (`StaticJsonCatalogRepository`, etc.) implements these interfaces. If Sidawi Garage ever migrates from static JSON to a headless CMS or database (such as Supabase or Firestore), only the infrastructure layer changes—the presentation layer remains untouched.

### 3. Zero-Database, High-Performance SSG
Because automotive oil catalogs, garage business information, and certified partner credentials change periodically rather than by the millisecond, all data is stored as static JSON in `content/data/`.
- **Zero Database Costs**: No SQL/NoSQL cloud database instances needed.
- **Ultra-Fast Edge Delivery**: All pages are prerendered into flat HTML/CSS/JS by Nitro at build time and served through Firebase Hosting's global CDN.
- **Instant TTFB**: Under 50ms time-to-first-byte worldwide.

---

## 🔄 Static Generation & Prerender Pipeline

The prerendering engine is configured in `nuxt.config.ts`:

```typescript
nitro: {
  prerender: {
    crawlLinks: true,
    routes: [
      '/',
      '/products',
      '/videos',
      '/about',
      '/contact',
      '/sitemap.xml',
      ...productRoutes, // Dynamic routes extracted from products.json
    ],
  },
}
```

### Build & Generation Flow:
1. `nuxt.config.ts` reads `content/data/products.json` at build time.
2. It maps every product item's `slug` into a static route (e.g. `/products/addinol-giga-light-0530-ll`).
3. Nitro renders each page with full SEO metadata, Open Graph tags, and Schema.org JSON-LD structured data.
4. The output is placed into `.output/public/`, ready for direct deployment to Firebase Hosting.

---

## ⚡ Client/Server Hydration & Performance Strategy

### 1. Client-Only Heavy 3D Graphics
The 3D interactive hero canvas (`HeroWebGL.client.vue`) utilizes **Three.js** and custom GLSL vertex/fragment shaders.
- Designated with `.client.vue` so Nitro never attempts to run WebGL code on the server or in Node.js.
- Built with an `IntersectionObserver` that pauses the `requestAnimationFrame` loop whenever the canvas scrolls out of viewport, reducing GPU utilization to 0%.
- Respects `prefers-reduced-motion`: renders a single static frame without continuous animation loops.

### 2. SSR-Safe Scroll Reveal System
To prevent Flash of Unstyled Content (FOUC) or hydration mismatches:
- The `scroll-reveal.ts` plugin registers the `v-reveal` directive on both client and server.
- The server registration implements `getSSRProps()` returning an empty object to satisfy Nuxt SSR compilation.
- The HTML root class `.reveal-ready` is only added on client mount, guaranteeing that crawlers and JavaScript-disabled browsers render all content with 100% opacity.

### 3. URL Query Synchronization Without Page Reloads
The catalog page (`app/pages/products/index.vue`) maintains filtering state using Vue 3 reactive variables (`filters = ref<ProductFilters>(...)`).
- When filters change (brand, category, viscosity, search), a `watch` updates the browser URL using `navigateTo({ path: '/products', query }, { replace: true })`.
- This ensures users can copy and share specific filter URLs (e.g., `/products?brand=addinol&viscosity=5W-30`) while maintaining instantaneous client-side filtering without page reloads.

---

## 🛡️ Error Boundary & Fallback Handling

- **`app/error.vue`**: Intercepts 404s (e.g., invalid product slugs) and unhandled errors. Formatted to match the dark luxury design system and offers direct one-click buttons back to the catalog or garage home.
- **Strict Fallback Handling in Dynamic Pages**: If a product slug in `app/pages/products/[slug].vue` is not found, it throws `createError({ statusCode: 404, fatal: true })`, which triggers the unified error layout.
