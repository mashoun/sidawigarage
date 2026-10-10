<script setup lang="ts">
import { useCatalog } from '~~/app/composables/useCatalog';
import { useJsonLd } from '~~/app/composables/useJsonLd';
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const route = useRoute();
const slug = route.params.slug as string;
const { getProductBySlug, getBrandById } = useCatalog();
const { getProductSchema, getBreadcrumbSchema } = useJsonLd();

const product = getProductBySlug(slug);

if (!product) {
  throw createError({
    statusCode: 404,
    statusMessage: `Oil specification "${slug}" was not found in our catalog.`,
    fatal: true,
  });
}

const brand = getBrandById(product.brandId);

const whatsAppBookingUrl = computed(() => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    oilName: product.name,
    viscosity: product.viscosity,
    brandName: brand?.name,
    serviceType: product.category === 'transmission' ? 'transmission_flush' : 'motor_oil',
  });
});

// Head & JSON-LD
useHead({
  title: `${product.name} (${product.viscosity}) | Sidawi Garage`,
  meta: [
    {
      name: 'description',
      content: `${product.name}: ${product.description} Available with certified service at Sidawi Garage Lebanon.`,
    },
    { property: 'og:title', content: `${product.name} (${product.viscosity}) | Sidawi Garage` },
    {
      property: 'og:description',
      content: `${product.name}: ${product.description} Available with certified service at Sidawi Garage Lebanon.`,
    },
    { property: 'og:url', content: `https://sidawigarage.com/products/${product.slug}` },
    {
      property: 'og:image',
      content: product.image
        ? `https://sidawigarage.com${product.image}`
        : 'https://sidawigarage.com/images/sidawi-garage-og.jpg',
    },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: `${product.name} (${product.viscosity}) | Sidawi Garage` },
    {
      name: 'twitter:description',
      content: `${product.name}: ${product.description}`,
    },
    {
      name: 'twitter:image',
      content: product.image
        ? `https://sidawigarage.com${product.image}`
        : 'https://sidawigarage.com/images/sidawi-garage-og.jpg',
    },
  ],
  link: [
    { rel: 'canonical', href: `https://sidawigarage.com/products/${product.slug}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(getProductSchema(product)),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Oil Catalog', path: '/products' },
          { name: product.name, path: `/products/${product.slug}` },
        ])
      ),
    },
  ],
});
</script>

<template>
  <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Breadcrumb Navigation -->
    <nav class="flex items-center gap-2 text-xs text-zinc-400 mb-8 font-medium">
      <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
      <NuxtLink to="/products" class="hover:text-white transition-colors">Catalog</NuxtLink>
      <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
      <span class="text-zinc-200 truncate max-w-xs">{{ product.name }}</span>
    </nav>

    <!-- Two-Column Product Presentation -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <!-- Left Column: Product Bottle Visual Presentation -->
      <div class="lg:col-span-5">
        <div class="rounded-3xl border border-white/10 bg-zinc-900/60 p-8 sm:p-12 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden">
          <div class="ambient-glow top-0 left-0 w-64 h-64 bg-amber-500/20" />

          <!-- Top Brand Badge with Real Logo on White BG -->
          <div class="absolute top-6 left-6 flex items-center gap-2">
            <div class="rounded-xl bg-white px-3 py-1.5 h-8 flex items-center justify-center shadow-md border border-slate-200">
              <BrandLogoImage :brand-id="product.brandId" :with-bg="false" class="h-5.5 w-auto max-w-[110px] object-contain" />
            </div>
          </div>

          <div class="absolute top-6 right-6">
            <StockBadge :in-stock="product.inStock" />
          </div>

          <!-- Real Brand Product Canister Presentation -->
          <div class="relative my-10 sm:my-14 flex h-72 sm:h-80 w-full max-w-xs items-center justify-center group/bottle">
            <!-- Dynamic ambient back-glow matching gold/amber theme -->
            <div class="absolute inset-0 bg-radial from-amber-500/20 via-amber-500/5 to-transparent blur-2xl pointer-events-none" />

            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="relative z-10 h-full w-auto max-h-72 sm:max-h-80 object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105"
            />
            <div v-else class="flex flex-col items-center justify-center text-zinc-500">
              <UIcon name="i-lucide-droplet" class="w-16 h-16 text-zinc-600 mb-2" />
              <span class="text-xs uppercase font-mono tracking-wider">Engineered Fluid</span>
            </div>
          </div>

          <!-- Available Liters Volume Pills -->
          <div class="flex items-center gap-2 pt-4 border-t border-white/10 w-full justify-center">
            <span class="text-xs text-zinc-400">Available Sizes:</span>
            <span
              v-for="liters in product.volumeLiters"
              :key="liters"
              class="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-xs font-mono font-semibold text-zinc-300"
            >
              {{ liters }}L
            </span>
          </div>
        </div>
      </div>

      <!-- Right Column: Full Specifications & Actions -->
      <div class="lg:col-span-7 space-y-8">
        <div>
          <div class="inline-block font-mono text-base font-bold text-amber-400 mb-2">
            {{ product.viscosity }} • {{ product.baseOilType }}
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {{ product.name }}
          </h1>
          <ExpandableText
            :text="product.description"
            :clamp-lines="3"
            :threshold-length="160"
            text-class="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed"
          />
        </div>

        <!-- The Sidawi Craftsman Note (Unique Selling Point) -->
        <div v-if="product.sidawiNote" class="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 space-y-2">
          <div class="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-amber-400" />
            <span>Mahmoud Sidawi's Professional Assessment</span>
          </div>
          <ExpandableText
            :text="`&ldquo;${product.sidawiNote}&rdquo;`"
            :clamp-lines="3"
            :threshold-length="160"
            text-class="text-xs text-zinc-200 leading-relaxed italic"
          />
        </div>

        <!-- OEM Approvals Grid -->
        <div class="space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Manufacturer & OEM Approvals
          </h3>
          <div class="flex flex-wrap gap-2">
            <SpecBadge
              v-for="app in product.approvals"
              :key="app"
              :label="app"
              variant="approval"
            />
          </div>
        </div>

        <!-- Industry Specifications (API & ACEA) -->
        <div class="space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Industry Standards
          </h3>
          <div class="flex flex-wrap gap-2">
            <SpecBadge
              v-for="spec in product.specifications"
              :key="spec"
              :label="spec"
              variant="viscosity"
            />
          </div>
        </div>

        <!-- Recommended Engines & Vehicles -->
        <div class="space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Recommended Vehicle Platforms
          </h3>
          <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
            <li
              v-for="rec in product.recommendedFor"
              :key="rec"
              class="flex items-center gap-2 rounded-xl bg-white/5 border border-white/5 p-2.5"
            >
              <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{{ rec }}</span>
            </li>
          </ul>
        </div>

        <!-- Detailed Technical Data (Tribology) -->
        <div v-if="product.detailedSpecs" class="space-y-3 pt-2">
          <h3 class="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Laboratory Technical Properties
          </h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div v-if="product.detailedSpecs.flashPoint" class="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <span class="text-[10px] text-zinc-400 block">Flash Point</span>
              <span class="font-mono text-xs font-bold text-white mt-1 block">{{ product.detailedSpecs.flashPoint }}</span>
            </div>
            <div v-if="product.detailedSpecs.pourPoint" class="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <span class="text-[10px] text-zinc-400 block">Pour Point</span>
              <span class="font-mono text-xs font-bold text-white mt-1 block">{{ product.detailedSpecs.pourPoint }}</span>
            </div>
            <div v-if="product.detailedSpecs.viscosityIndex" class="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <span class="text-[10px] text-zinc-400 block">Viscosity Index</span>
              <span class="font-mono text-xs font-bold text-white mt-1 block">{{ product.detailedSpecs.viscosityIndex }}</span>
            </div>
            <div v-if="product.detailedSpecs.density" class="rounded-xl border border-white/10 bg-white/5 p-3 text-center">
              <span class="text-[10px] text-zinc-400 block">Density</span>
              <span class="font-mono text-xs font-bold text-white mt-1 block">{{ product.detailedSpecs.density }}</span>
            </div>
          </div>
        </div>

        <!-- Direct WhatsApp Booking CTA Bar -->
        <div class="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-4">
          <a
            :href="whatsAppBookingUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-4 text-sm font-bold shadow-xl shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <UIcon name="i-lucide-message-circle" class="w-5 h-5" />
            <span>Book Oil Service With This Spec on WhatsApp</span>
          </a>

          <NuxtLink
            to="/products"
            class="w-full sm:w-auto inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-4 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            Back to Catalog
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
