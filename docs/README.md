# Sidawi Garage — Documentation

Welcome to the comprehensive documentation for **Sidawi Garage**, an ultra-performance web application built for Mahmoud Sidawi's specialized automotive lubrication and fluid dynamics workshop in Beirut, Lebanon.

---

## 📑 Documentation Index

| Document | Description |
| :--- | :--- |
| **[Architecture Guide](./architecture.md)** | Clean Architecture layer separation, SSG rendering pipeline, and state management. |
| **[Data Layer & Schemas](./data-layer.md)** | Domain models, repository patterns, Zod validation schemas, and JSON data structures. |
| **[Components & UI System](./components-and-ui.md)** | Nuxt UI v4, Tailwind CSS v4, Three.js WebGL fluid shaders, and component directory. |
| **[Composables & Plugins](./composables-and-plugins.md)** | Reactive state composables (`useCatalog`, `useJsonLd`, `useVideoReels`) and `v-reveal` plugin. |
| **[SEO & Structured Data](./seo-and-structured-data.md)** | Schema.org JSON-LD, Open Graph tags, XML sitemap generation, and search indexing. |
| **[Testing Suite](./testing.md)** | Vitest test architecture, domain unit tests, schema validation, and utilities testing. |
| **[Tooling & Scripts](./tooling-and-scripts.md)** | Automation scripts for Instagram Reels scraping, OG image generation, and headless Chrome visual audits. |
| **[Deployment & Operations](./deployment-and-operations.md)** | Development guide, environment setup, Firebase Hosting deployment, and routine maintenance. |

---

## 🏎️ Project Summary

**Sidawi Garage** represents the digital presence and technical catalog for Mahmoud Sidawi, a certified reseller of world-class automotive lubricants (**Liqui Moly**, **Addinol**, **Castrol**). 

Unlike conventional automotive repair websites, Sidawi Garage is designed with an **engineering-first, dark luxury aesthetic** (combining Apple and Porsche design philosophies) emphasizing:
- **Zero Counterfeit Lubricants**: Official accreditation certificates verifiable on-screen.
- **Tribological Precision**: Detailed oil chemical properties (viscosity indices, flash points, pour points, OEM approvals like BMW LL-04, MB 229.52, Porsche C30).
- **Process Transparency**: Documented video reels demonstrating closed-loop automatic transmission fluid flushes (ZF 8HP, DSG/DCT) and digital torque calibration.
- **Frictionless Conversion**: Deep-linked WhatsApp booking integrations with pre-filled technical inquiry specifications.

---

## 🛠️ Technology Stack Matrix

```
┌────────────────────────────────────────────────────────┐
│                    SIDAWI GARAGE                       │
├──────────────────────────┬─────────────────────────────┤
│ Framework                │ Nuxt 4 (Vue 3.5+, SSR & SSG)│
│ Component System         │ Nuxt UI v4 (@nuxt/ui)       │
│ Styling & Design Tokens  │ Tailwind CSS v4             │
│ Interactive 3D WebGL     │ Three.js Shaders (GLSL)     │
│ Data Validation          │ Zod v4                      │
│ Test Framework           │ Vitest                      │
│ Static Engine            │ Nitro Engine (Prerendered)  │
│ Hosting & Edge CDN       │ Google Firebase Hosting     │
│ Asset Processing         │ Sharp (OG image generator)  │
└──────────────────────────┴─────────────────────────────┘
```

---

## 📂 Project Directory Structure

```
sidawi/
├── app/                              # Nuxt 4 Application Source
│   ├── app.config.ts                 # Nuxt UI theme configuration
│   ├── app.vue                       # Root application entry
│   ├── error.vue                     # 404 & error page
│   ├── assets/
│   │   └── css/main.css              # Tailwind v4 styles & animation keyframes
│   ├── components/
│   │   ├── brand/                    # Logos, partner badges, certificate modal
│   │   ├── catalog/                  # Product cards, filter bar, spec badges
│   │   ├── common/                   # Expandable text, scroll progress bar
│   │   ├── garage/                   # About Mahmoud, Contact hub, Service bento
│   │   ├── hero/                     # Hero section & Three.js WebGL canvas
│   │   ├── layout/                   # AppHeader, AppFooter
│   │   ├── testimonials/             # Client feedback cards
│   │   └── video/                    # Video reel cards & modal players
│   ├── composables/                  # Vue Composition API composables
│   ├── layouts/                      # Layout templates (default.vue)
│   ├── pages/                        # Nuxt pages routing
│   │   ├── about.vue                 # Craftsman ethos & accreditation
│   │   ├── contact.vue               # Location, map, phone, social hub
│   │   ├── index.vue                 # Landing page
│   │   ├── videos.vue                # Filterable client reels gallery
│   │   └── products/
│   │       ├── index.vue             # Filterable product catalog
│   │       └── [slug].vue            # Dynamic product detail & specs
│   └── plugins/
│       └── scroll-reveal.ts          # Custom v-reveal intersection directive
├── content/
│   └── data/                         # Static JSON datasets (SSG source of truth)
│       ├── brands.json               # Accredited lubricant manufacturers
│       ├── garage.json               # Business profile, location, hours, socials
│       ├── products.json             # Oils catalog with OEM specs & tribology
│       ├── testimonials.json         # Verified customer reviews
│       └── videos.json               # Client reels & documented workflows
├── docs/                             # Project documentation (Markdown)
├── public/                           # Static public assets
│   ├── images/                       # Brand assets, certificates, products, reels
│   └── videos/                       # Local MP4 video reels
├── scripts/                          # Maintenance & QA automation scripts
│   ├── download-reels.mjs            # Instagram reel downloader
│   ├── generate-og-image.mjs         # Sharp OG banner generator
│   └── verify-all.js                 # Chrome DevTools verification audit
├── server/
│   └── routes/
│       └── sitemap.xml.ts            # Dynamic XML sitemap generator
├── shared/                           # Clean Architecture Core
│   ├── domain/                       # Pure TypeScript business models & contracts
│   ├── infrastructure/               # Static JSON repository implementations
│   ├── schemas/                      # Zod validation schemas
│   └── utils/                        # WhatsApp link builder & video resolvers
├── tests/                            # Vitest automated test suite
├── firebase.json                     # Firebase Hosting configuration
├── nuxt.config.ts                    # Nuxt 4 global configuration
└── package.json                      # Project dependencies & npm scripts
```

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js** v20.x or later
- **npm** or **pnpm**

### 2. Installation
```bash
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Running Tests
```bash
npm test
```
Runs 23 automated Vitest tests across catalog repositories, Zod schemas, utilities, and JSON-LD builders.

### 5. Production Static Generation
```bash
npm run generate
```
Builds and prerenders all pages and dynamic product routes into `.output/public`.

### 6. Firebase Hosting Deployment
```bash
npm run deploy:hosting
```
Deploys the static `.output/public` bundle directly to Google Firebase Hosting.
