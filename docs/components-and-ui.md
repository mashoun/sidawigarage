# Components & UI System Guide

This guide details the design tokens, visual aesthetics, component library, and 3D WebGL shader mechanics implemented in **Sidawi Garage**.

---

## 🎨 Visual Design Philosophy

Sidawi Garage uses a **Dark Luxury Engineering Aesthetic**, pairing the minimalist precision of Apple interfaces with the technical authority of Porsche Motorsport:

| Element | Specification | Visual Role |
| :--- | :--- | :--- |
| **Obsidian Canvas** | `#08090C` (Zinc-950) | High-contrast, glare-free dark backdrop eliminating eye strain. |
| **Amber Gold Accents** | `#F59E0B` / `#D97706` | Represents pure, viscous synthetic lubricant under laboratory lighting. |
| **Precision Emerald** | `#10B981` / `#34D399` | Indicates 100% verified authentic supplies, in-stock status, and WhatsApp CTAs. |
| **Primary Typeface** | `Plus Jakarta Sans` | Modern geometric humanist font for editorial clarity and legibility. |
| **Metric Typeface** | `JetBrains Mono` | High-precision monospace font for SAE viscosities, temperatures, and OEM codes. |

---

## 💅 Glassmorphism & Custom CSS Utilities (`app/assets/css/main.css`)

```css
/* Frosted glass backdrop panel */
.glass-panel {
  background: rgba(18, 20, 26, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

/* Glass interactive pill */
.glass-pill {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

/* Subtle fluid ambient gradient */
.ambient-glow {
  position: absolute;
  border-radius: 9999px;
  filter: blur(120px);
  pointer-events: none;
  opacity: 0.15;
}
```

---

## ⚙️ Nuxt UI v4 Design Tokens (`app/app.config.ts`)

Global UI variants configured for unified consistency across buttons, cards, and badges:

```typescript
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'amber',
      neutral: 'zinc',
    },
    button: {
      defaultVariants: {
        size: 'md',
        color: 'primary',
      },
    },
    card: {
      slots: {
        root: 'rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-xl shadow-2xl transition-all duration-300',
      },
    },
    badge: {
      defaultVariants: {
        size: 'sm',
        variant: 'subtle',
      },
    },
  },
});
```

---

## 🌊 3D WebGL Hero Fluid Simulation (`HeroWebGL.client.vue`)

In the landing hero, rather than playing a heavy pre-rendered MP4 video background, Sidawi Garage executes a **real-time Three.js GLSL shader simulation** replicating viscous synthetic oil:

### Key Technical Aspects:
1. **Custom Vertex Wave Calculation**:
   ```glsl
   float calculateElevation(vec2 p) {
     float wave1 = sin(p.x * 1.5 + uTime * 0.7 + uMouse.x * 1.8) * cos(p.y * 1.2 + uTime * 0.5 + uMouse.y * 1.8) * 0.45;
     float wave2 = sin(p.x * 2.8 - uTime * 0.9 + uScroll * 1.2) * sin(p.y * 2.5 + uTime * 0.8) * 0.25;
     float wave3 = cos(length(p - uMouse * 2.0) * 3.5 - uTime * 1.5) * 0.2;
     return wave1 + wave2 + wave3;
   }
   ```
2. **Fresnel & Specular Lighting**:
   Calculates rim reflectance and dynamic specular light reflecting the cursor position across wave crests.
3. **Adaptive Mobile Density**:
   - **Mobile** (`width < 768px`): 45x45 grid subdivisions to ensure 60fps on mobile GPUs.
   - **Desktop**: 90x90 grid subdivisions for maximum liquid surface fidelity.
4. **Specular Micro-Droplets**:
   120 floating particles rendered via `THREE.Points` simulating ambient suspended oil mist.
5. **GPU Power Efficiency**:
   An `IntersectionObserver` automatically cancels the `requestAnimationFrame` render loop whenever the Hero scrolls out of view.
6. **Accessibility**:
   Detects `window.matchMedia('(prefers-reduced-motion: reduce)')` and renders a static, stationary single frame.

---

## 🧩 Component Directory

### 1. Brand Components (`app/components/brand/`)
- **`BrandLogo.vue`**: Hybrid logo emblem rendering the Sidawi crest and garage typography with responsive scaling.
- **`BrandLogoImage.vue`**: Renders SVG/PNG manufacturer partner logos inside a high-contrast container for consistent visibility on dark backgrounds.
- **`BrandPartnerBadge.vue`**: Accreditation card showing brand origin, official partner badge, popular oil lines, and an "Inspect Certificate" trigger.
- **`CertificateModal.vue`**: Full-screen modal overlay allowing clients to inspect high-resolution manufacturer reseller certificates with zoom support.

### 2. Catalog Components (`app/components/catalog/`)
- **`ProductCard.vue`**: Premium product card displaying the oil bottle, OEM approval badges, SAE viscosity grade, and direct links to full specifications.
- **`ProductFilters.vue`**: Live interactive filter bar featuring brand tabs, category toggle (Engine vs Transmission vs Differential), SAE viscosity dropdown, and real-time search input.
- **`SpecBadge.vue`**: Formatted pill for manufacturer standards (e.g., `BMW Longlife-04`, `MB 229.52`, `Porsche C30`, `VW 504 00 / 507 00`).
- **`StockBadge.vue`**: Live inventory status badge (`In Stock` / `Out of Stock`).

### 3. Layout & Common Components (`app/components/layout/` & `common/`)
- **`AppHeader.vue`**: Floating dynamic pill navigation bar:
  - Expands at page top and shrinks with elevated blur on scroll.
  - Mobile slide-down drawer with accessible 44px touch targets.
  - Direct WhatsApp quick-dial button.
  - Listens for `Escape` key and route transitions to close cleanly.
- **`AppFooter.vue`**: Full footer with location coordinates, operating hours, partner logos, legal disclaimers, and social links.
- **`ExpandableText.vue`**: Truncates lengthy technical descriptions with accessible "Read More / Show Less" toggle.
- **`ScrollProgressBar.vue`**: Apple-style micro progress line tracking reading depth at the top of the viewport.

### 4. Garage & Authority Components (`app/components/garage/`)
- **`AboutMahmoud.vue`**: Biographical spotlight on Mahmoud Sidawi, highlighting his technical training in fluid shear stability and zero-defect standard.
- **`ServiceBento.vue`**: 4-cell Bento grid showcasing:
  1. *Closed-Loop Automatic Transmission Flushes* (ZF 8HP, DSG/DCT).
  2. *Precision High-Performance Engine Oil Servicing*.
  3. *Differential & Transfer Case Servicing*.
  4. *Digital Diagnostic Verification & Temperature Leveling*.
- **`ContactHub.vue`**: Contact cards featuring click-to-call phone, direct WhatsApp chat, VIP group invite, and operating hours.
- **`LocationMap.vue`**: Embedded interactive map with direct Apple Maps & Google Maps navigation links.

### 5. Media & Trust Components (`app/components/video/` & `testimonials/`)
- **`ReelCard.vue`**: Social reel player card displaying vehicle model, service type, lubricant used, duration badge, and inline video player.
- **`ReelModal.vue`**: Expanded reel view for immersive full-screen video playback.
- **`TestimonialCard.vue`**: Verified customer review card displaying vehicle, service conducted, 5-star rating, and client remarks.
