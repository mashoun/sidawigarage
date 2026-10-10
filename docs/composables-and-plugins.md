# Composables, Plugins & Utilities Guide

This guide details the custom Vue composables, Nuxt plugins, and shared utility modules that drive the application's interactive behaviors.

---

## 🪝 Application Composables (`app/composables/`)

### 1. `useCatalog()`
Provides reactive access to the lubricant inventory and certified brands:

```typescript
export const useCatalog = () => {
  const products = ref<Product[]>(catalogRepo.getAllProducts());
  const brands = ref<Brand[]>(catalogRepo.getAllBrands());
  const featuredProducts = computed(() => catalogRepo.getFeaturedProducts());

  const getProductBySlug = (slug: string): Product | undefined;
  const getBrandById = (id: string): Brand | undefined;
  const filterProducts = (filters: ProductFilters): Product[];

  return {
    products,
    brands,
    featuredProducts,
    getProductBySlug,
    getBrandById,
    filterProducts,
  };
};
```

**Usage Example:**
```vue
<script setup lang="ts">
const { products, filterProducts } = useCatalog();
const filtered = computed(() => filterProducts({ brandId: 'liqui-moly', category: 'engine' }));
</script>
```

---

### 2. `useJsonLd()`
Constructs Schema.org JSON-LD compliant objects for enhanced Google search snippets:

| Method | Returns | Schema.org Type |
| :--- | :--- | :--- |
| `getGarageSchema()` | Complete business profile, geo-coordinates, operating hours, telephone, and reseller brands. | `AutoRepair` (LocalBusiness) |
| `getProductSchema(product)` | Product name, description, SKU, image, brand, and offer availability. | `Product` |
| `getVideoSchema(video)` | Video title, description, thumbnail, contentUrl, and embedUrl. | `VideoObject` |
| `getBreadcrumbSchema(crumbs)` | Hierarchical navigation paths for Google rich snippets. | `BreadcrumbList` |

**Usage Example:**
```vue
<script setup lang="ts">
const { getProductSchema, getBreadcrumbSchema } = useJsonLd();

useHead({
  script: [
    { type: 'application/ld+json', children: JSON.stringify(getProductSchema(product)) },
  ],
});
</script>
```

---

### 3. `useScrollReveal()`
A component-level reactive scroll detection hook for fine-grained element entrance timing:

```typescript
export interface ScrollRevealConfig {
  threshold?: number;  // Default: 0.12
  rootMargin?: string; // Default: '0px 0px -40px 0px'
  once?: boolean;      // Disconnect observer after initial entrance
}

export function useScrollReveal(config?: ScrollRevealConfig): {
  targetRef: Ref<HTMLElement | null>;
  isRevealed: Ref<boolean>;
};
```

- **SSR-Safe**: Safely guards against server execution (`typeof window === 'undefined'`).
- **Accessibility**: Immediately sets `isRevealed.value = true` if user has enabled `prefers-reduced-motion`.

---

### 4. `useVideoReels()`
Exposes social reel feeds and documented flush videos:

```typescript
export const useVideoReels = () => {
  const reels = ref<VideoReel[]>(videoRepo.getAllReels());
  const featuredReels = computed(() => videoRepo.getFeaturedReels());
  const getReelById = (id: string) => videoRepo.getReelById(id);

  return { reels, featuredReels, getReelById };
};
```

---

## 🔌 Nuxt Plugins (`app/plugins/`)

### `scroll-reveal.ts` (`v-reveal` Directive)
A high-performance scroll animation plugin designed for fluid page entrances:

#### Key Capabilities:
- **Bi-Directional Viewport Tracking**: Elements smoothly reveal when scrolled into view and reset when scrolled past, maintaining interactive polish during up-and-down browsing.
- **Multiple Transition Variants**:
  - `fade-up`: Smooth upward entrance (`translate3d(0, 32px, 0)`).
  - `fade-down`: Downward slide (`translate3d(0, -32px, 0)`).
  - `fade-left`: Slide from right (`translate3d(16px, 0, 0)`).
  - `fade-right`: Slide from left (`translate3d(-16px, 0, 0)`).
  - `zoom-in`: Subtle scale up (`scale(0.93)` to `scale(1)`).
  - `blur-in`: Combined blur and upward motion (`filter: blur(10px)` to `0px`).
- **Flexible Directive Syntax**:
  ```vue
  <!-- Using object syntax -->
  <div v-reveal="{ variant: 'fade-up', delay: 150, duration: 800 }">...</div>

  <!-- Using modifiers -->
  <div v-reveal.zoom="{ delay: 200 }">...</div>

  <!-- Using directive args -->
  <div v-reveal:left>...</div>
  ```
- **SSR & SEO Protection**: Server-side registration returns empty properties via `getSSRProps()`, ensuring search engine bots index 100% visible text.

---

## 🛠️ Shared Utility Functions (`shared/utils/`)

### 1. `whatsapp.ts`
Generates deep links directly to Mahmoud Sidawi's WhatsApp with tailored pre-filled inquiries:

```typescript
export interface BookingIntent {
  oilName?: string;
  viscosity?: string;
  brandName?: string;
  carModel?: string;
  serviceType?: 'motor_oil' | 'transmission_flush' | 'differential' | 'general';
}

export function buildWhatsAppBookingUrl(phoneNumber: string, intent?: BookingIntent): string;
```

**Message Example Output:**
```
Hello Mahmoud, I would like to consult with you regarding my car:
🚗 Car Model: BMW M340i
🔧 Service Needed: Automatic / DCT Transmission Gear Oil Flush
🛢️ Selected Oil: Addinol ATF XN 8 Low Viscosity (ATF Low-Viscosity)
Could you please advise on availability, OEM spec matching, and scheduling an appointment at Sidawi Garage? Thank you!
```

---

### 2. `video.ts`
A multi-platform video URL normalizer resolving user social links into responsive embeds or direct MP4 streams:

```typescript
export interface ResolvedVideo {
  platform: VideoPlatform;
  embedUrl: string;
  directUrl: string;
  isIframe: boolean;
  aspectRatio: '16/9' | '9/16';
}

export function resolveVideoUrl(rawUrl: string, directVideoUrl?: string): ResolvedVideo;
```

#### Supported Platforms:
1. **YouTube Shorts**: `https://youtube.com/shorts/{id}` → `https://www.youtube-nocookie.com/embed/{id}` (`9/16` portrait)
2. **YouTube Standard**: `https://youtube.com/watch?v={id}` or `youtu.be/{id}` (`16/9` landscape)
3. **Instagram Reels**: `https://instagram.com/reel/{id}/` → `https://instagram.com/reel/{id}/embed` (`9/16` portrait)
4. **TikTok Videos**: `https://tiktok.com/@user/video/{id}` (`9/16` portrait)
5. **Direct Video Streams**: Local `.mp4` / `.webm` files served via HTML5 `<video>` tags.
