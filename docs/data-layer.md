# Data Layer & Schemas Guide

This document details the data architecture, domain models, repository interfaces, and Zod schemas that define the business logic for Sidawi Garage.

---

## 🗂️ Overview of Data Storage

Data is located under `content/data/` as static JSON files:
- **`brands.json`**: Official lubricant brand partnerships and manufacturer credentials.
- **`garage.json`**: Garage profile, address, operating hours, geolocation, contact info, and social links.
- **`products.json`**: Detailed technical specifications of all engine and transmission oils in stock.
- **`testimonials.json`**: Verified client feedback with ratings and vehicle details.
- **`videos.json`**: Client video reels showing documented flushes and diagnostics.

Every JSON file is strictly validated against a corresponding Zod schema in `shared/schemas/catalog.schema.ts` during automated testing (`tests/validation/datasets.spec.ts`).

---

## 📦 Domain Models (`shared/domain/models.ts`)

### 1. Oil Product (`Product`)
Represents an individual lubricant formulation:

```typescript
export type OilCategory = 'engine' | 'transmission' | 'differential' | 'additive';

export type ViscosityGrade =
  | '0W-16' | '0W-20' | '0W-30' | '0W-40'
  | '5W-20' | '5W-30' | '5W-40' | '5W-50'
  | '10W-40' | '10W-60' | '75W-80' | '75W-85'
  | '75W-90' | '75W-140'
  | 'ATF Low-Viscosity' | 'ATF Multi-Vehicle'
  | 'DCT / DSG Fluid' | 'CVT Fluid';

export interface Product {
  id: string;                      // Unique ID (e.g., 'addinol-giga-light-0530-ll')
  slug: string;                    // URL route slug
  brandId: string;                 // 'liqui-moly' | 'addinol' | 'castrol'
  name: string;                    // Product title
  category: OilCategory;           // Category
  viscosity: ViscosityGrade;       // SAE Viscosity rating
  baseOilType: string;             // e.g., 'Fully Synthetic PAO', 'HC-Synthetic'
  image?: string;                  // Path in /public/images/products/
  description: string;             // Detailed technical summary
  detailedSpecs: {                 // Tribological laboratory properties
    flashPoint?: string;           // e.g., '230°C'
    pourPoint?: string;            // e.g., '-45°C'
    viscosityIndex?: string;       // e.g., '172'
    density?: string;              // e.g., '0.848 g/cm³'
  };
  approvals: string[];             // OEM Approvals (e.g., 'BMW Longlife-04', 'MB 229.52')
  specifications: string[];        // Industry Standards (e.g., 'ACEA C3', 'API SP')
  recommendedFor: string[];        // Target engines & car models
  sidawiNote?: string;             // Mahmoud Sidawi's craftsman assessment
  inStock: boolean;                // Inventory availability
  volumeLiters: number[];          // Available container volumes [1, 4, 5]
  featured?: boolean;              // Shown on homepage featured grid
}
```

### 2. Brand Partner (`Brand`)
Represents an official certified lubricant partner:

```typescript
export interface Brand {
  id: string;                      // Unique slug (e.g., 'addinol')
  name: string;                    // Brand name (e.g., 'Addinol High-Performance Lube')
  tagline: string;                 // Brand slogan
  country: string;                 // Country of manufacture (e.g., 'Leuna, Germany')
  status: string;                  // Reseller partnership status
  logo: string;                    // Brand logo path
  badgeAccent: string;             // Theme color hex/class
  description: string;             // Engineering description
  popularLines: string[];          // Notable product families
  certificationsSummary: string[]; // Accreditation highlights
  certificateImage?: string;       // Path to high-res scanned certificate
  certificateTitle?: string;       // Certificate title
  certificateNumber?: string;      // Official registration/credential ID
}
```

### 3. Video Reel (`VideoReel`)
Represents a documented video workflow or client demonstration:

```typescript
export type VideoPlatform = 'youtube' | 'instagram' | 'tiktok' | 'direct';

export interface VideoReel {
  id: string;                      // Unique ID (e.g., 'reel-addinol-bmw-m4')
  title: string;                   // Video title
  platform: VideoPlatform;         // Hosting platform
  url: string;                     // Raw web URL (Instagram, YouTube, TikTok)
  embedUrl?: string;               // Normalized iframe embed URL
  videoUrl?: string;               // Direct local/remote MP4 or WebM stream
  thumbnail?: string;              // Cover image
  vehicle: string;                 // Client car (e.g., 'BMW M4 F82')
  serviceType: 'motor_oil' | 'transmission_flush' | 'differential' | 'performance_diagnostic';
  oilUsed: string;                 // Lubricant formulation applied
  duration?: string;               // Running time
  dateServiced?: string;           // ISO date string
  description: string;             // Service summary
  tags: string[];                  // Filter keywords
  featured?: boolean;              // Homepage featured reel
}
```

### 4. Garage Profile (`GarageProfile`)
Defines workshop business coordinates, contact methods, and operating hours:

```typescript
export interface GarageProfile {
  name: string;
  owner: string;
  tagline: string;
  bio: string;
  phone: string;
  whatsappNumber: string;
  whatsappGroupUrl: string;
  email: string;
  address: {
    street: string;
    area: string;
    city: string;
    country: string;
    geo: { latitude: number; longitude: number };
    googleMapsUrl: string;
    appleMapsUrl: string;
  };
  openingHours: Array<{ days: string; hours: string; isOpenToday?: boolean }>;
  socials: { tiktok: string; instagram: string; youtube: string; linkedin: string };
  certifiedBrands: string[];
}
```

---

## 🏛️ Repository Layer (`shared/infrastructure/staticJsonRepositories.ts`)

The project implements singleton repositories adhering to the Repository Pattern:

### 1. `ICatalogRepository` / `StaticJsonCatalogRepository`
- `getAllProducts(): Product[]`
- `getProductBySlug(slug: string): Product | undefined`
- `getFeaturedProducts(): Product[]`
- `filterProducts(filters: ProductFilters): Product[]`
  - Multi-criteria filtering:
    - `brandId` (exact match or 'all')
    - `category` (exact match or 'all')
    - `viscosity` (exact match or 'all')
    - `search` (case-insensitive keyword matching against product name, description, OEM approvals, recommended models, and viscosity)
- `getAllBrands(): Brand[]`
- `getBrandById(id: string): Brand | undefined`

### 2. `IVideoRepository` / `StaticJsonVideoRepository`
- `getAllReels(): VideoReel[]`
- `getFeaturedReels(): VideoReel[]`
- `getReelById(id: string): VideoReel | undefined`

### 3. `ITestimonialRepository` / `StaticJsonTestimonialRepository`
- `getAllTestimonials(): Testimonial[]`
- `getFeaturedTestimonials(): Testimonial[]`

### 4. `IGarageRepository` / `StaticJsonGarageRepository`
- `getProfile(): GarageProfile`

---

## 🛡️ Zod Validation Schemas (`shared/schemas/catalog.schema.ts`)

Zod is used to ensure all dataset entries satisfy strict typing constraints. Key validations include:

```typescript
export const OilCategorySchema = z.enum(['engine', 'transmission', 'differential', 'additive']);

export const ProductSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  brandId: z.string().min(1),
  name: z.string().min(1),
  category: OilCategorySchema,
  viscosity: ViscosityGradeSchema,
  baseOilType: z.string().min(1),
  image: z.string().optional(),
  description: z.string().min(1),
  detailedSpecs: z.object({
    flashPoint: z.string().optional(),
    pourPoint: z.string().optional(),
    viscosityIndex: z.string().optional(),
    density: z.string().optional(),
  }),
  approvals: z.array(z.string().min(1)),
  specifications: z.array(z.string().min(1)),
  recommendedFor: z.array(z.string().min(1)),
  sidawiNote: z.string().optional(),
  inStock: z.boolean(),
  volumeLiters: z.array(z.number().positive()),
  featured: z.boolean().optional(),
});
```

---

## 📝 How-To Guides

### How to Add a New Product to the Catalog
1. Open `content/data/products.json`.
2. Add a new object following `ProductSchema`:
   ```json
   {
     "id": "castrol-edge-0w40-r",
     "slug": "castrol-edge-0w40-r",
     "brandId": "castrol",
     "name": "Castrol EDGE 0W-40 A3/B4",
     "category": "engine",
     "viscosity": "0W-40",
     "baseOilType": "Fluid TITANIUM Synthetic",
     "image": "/images/products/castrol-edge-0w40.png",
     "description": "Engineered for maximum horsepower under high operating temperatures.",
     "detailedSpecs": {
       "flashPoint": "226°C",
       "pourPoint": "-48°C",
       "viscosityIndex": "178",
       "density": "0.841 g/cm³"
     },
     "approvals": ["BMW Longlife-01", "MB-Approval 229.5", "Porsche A40", "VW 502 00 / 505 00"],
     "specifications": ["ACEA A3/B4", "API SP"],
     "recommendedFor": ["BMW M Models", "Porsche 911 (997/991)", "Mercedes-AMG"],
     "sidawiNote": "Uncompromising shear resistance for high-RPM German engines in Lebanon's summer climate.",
     "inStock": true,
     "volumeLiters": [1, 4, 5],
     "featured": true
   }
   ```
3. Place product bottle image into `public/images/products/`.
4. Run `npm test` to verify that `ProductSchema` passes and no duplicate IDs/slugs exist.

### How to Add a Documented Video Reel
1. Add the video metadata entry to `content/data/videos.json`:
   ```json
   {
     "id": "reel-zf8hp-bmw-m340i",
     "title": "BMW M340i G20 — ZF 8HP Automatic Transmission Flush",
     "platform": "instagram",
     "url": "https://www.instagram.com/reel/DeT850IKUHL/",
     "thumbnail": "/images/reels/DeT850IKUHL.jpg",
     "vehicle": "BMW M340i xDrive (G20)",
     "serviceType": "transmission_flush",
     "oilUsed": "Addinol ATF XN 8 Low Viscosity",
     "duration": "0:52",
     "dateServiced": "2026-03-24",
     "description": "Full closed-loop flush including mechatronic filter pan replacement and digital temperature leveling at 38°C.",
     "tags": ["BMW", "ZF8HP", "TransmissionFlush", "Addinol"],
     "featured": true
   }
   ```
2. (Optional) Run `node scripts/download-reels.mjs` to cache the video locally as an MP4 for instantaneous offline playback.
3. Run `npm test` to validate `VideoReelSchema`.
