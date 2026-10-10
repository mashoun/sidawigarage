# Testing Suite & QA Guide

This document describes the automated test architecture, test suites, and execution instructions for **Sidawi Garage**.

---

## 🧪 Test Architecture Overview

Sidawi Garage uses **Vitest** for blazing-fast unit and regression testing. The testing strategy emphasizes:
1. **Domain Logic Integrity**: Verifying catalog queries, filters, search algorithms, and slug resolution.
2. **Schema & Data Sanity**: Enforcing strict Zod validation across all static JSON files in `content/data/` to prevent broken routes, invalid viscosities, or missing images.
3. **Utility Precision**: Ensuring WhatsApp booking message builders and multi-platform social video resolvers function reliably.
4. **Structured Data Compliance**: Verifying Schema.org JSON-LD generators output compliant objects.

```
tests/
├── domain/
│   ├── catalog.spec.ts          # Catalog repository & filter tests
│   └── jsonld.spec.ts           # Schema.org JSON-LD generation tests
├── utils/
│   ├── scrollReveal.spec.ts     # useScrollReveal logic & reduced motion
│   ├── video.spec.ts            # Video URL resolver (YouTube, IG, TikTok, direct)
│   └── whatsapp.spec.ts         # WhatsApp deep link builder & sanitization
└── validation/
    └── datasets.spec.ts         # Zod validation of content/data/*.json
```

---

## 🚀 Running Tests

### Standard Test Run
```bash
npm test
```
*Note for Windows users:* If PowerShell execution policy restricts scripts, run:
```bash
cmd /c npm test
```
or
```bash
npx.cmd vitest run
```

### Watch Mode
For test-driven development:
```bash
npx vitest
```

---

## 🔍 Detailed Test Suites

### 1. Catalog Repository Tests (`tests/domain/catalog.spec.ts`)
- **`retrieves all products and brands`**: Ensures products exist and exactly 3 partner brands are loaded.
- **`filters products correctly by brandId`**: Validates filtering for `'liqui-moly'` and `'addinol'`.
- **`filters products correctly by category`**: Validates separation of `'transmission'` from `'engine'` oils.
- **`filters products by viscosity grade`**: Tests `'5W-30'` exact matching.
- **`searches products by OEM approval keyword`**: Validates case-insensitive keyword searches like `'BMW Longlife-04'`.
- **`finds a single product by unique slug`**: Verifies slug-based retrieval for dynamic routes.

### 2. Dataset Validation Tests (`tests/validation/datasets.spec.ts`)
Validates that every single record in `content/data/` passes its Zod schema:
- **`BrandSchema`**: Validates brand ID, name, logo, country, and certifications summary.
- **`GarageProfileSchema`**: Verifies phone format, email, geocoordinates, operating hours, and socials.
- **`ProductSchema`**:
  - Enforces valid `OilCategory` and `ViscosityGrade`.
  - Enforces **unique product IDs** (no duplicate keys).
  - Enforces **unique product slugs** (no duplicate routes).
  - Verifies **brand integrity** (ensures `product.brandId` maps to an existing brand in `brands.json`).
- **`VideoReelSchema`**: Validates URLs, tags, service types, and vehicles.
- **`TestimonialSchema`**: Validates rating range (1-5 integer) and client information.

### 3. Video Resolver Tests (`tests/utils/video.spec.ts`)
- Tests resolution of **YouTube Shorts** (`https://youtube.com/shorts/{id}`) into `https://www.youtube-nocookie.com/embed/{id}` with `9/16` aspect ratio.
- Tests standard **YouTube URLs** (`youtu.be` and `watch?v=`) with `16/9` ratio.
- Tests **Instagram Reels** embed conversion.
- Tests direct **MP4 video files**.

### 4. WhatsApp Deep-Link Builder Tests (`tests/utils/whatsapp.spec.ts`)
- **`sanitizeWhatsAppNumber`**: Strips non-digit characters (`+961 76 850 301` → `96176850301`).
- **`buildWhatsAppBookingUrl`**: Verifies message URL encoding, car model injection, service type mapping, and oil viscosity injection.

### 5. JSON-LD Structured Data Tests (`tests/domain/jsonld.spec.ts`)
- Verifies `@context: 'https://schema.org'` and `@type: 'AutoRepair'` on garage schema.
- Verifies `@type: 'Product'` with offers for product schemas.
- Verifies breadcrumb hierarchy order in `BreadcrumbList`.
