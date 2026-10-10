<script setup lang="ts">
import { useCatalog } from '~~/app/composables/useCatalog';
import { useJsonLd } from '~~/app/composables/useJsonLd';
import type { ProductFilters } from '~~/shared/domain/repositories';

const { filterProducts, products } = useCatalog();
const { getBreadcrumbSchema } = useJsonLd();
const route = useRoute();

const filters = ref<ProductFilters>({
  search: '',
  brandId: (route.query.brand as string) || 'all',
  category: (route.query.category as string) || 'all',
  viscosity: (route.query.viscosity as string) || 'all',
});

// Reactively filter products
const filteredProducts = computed(() => {
  return filterProducts(filters.value);
});

// Update URL query params smoothly without full page reloads
watch(filters, (newVal) => {
  const query: Record<string, string> = {};
  if (newVal.brandId && newVal.brandId !== 'all') query.brand = newVal.brandId;
  if (newVal.category && newVal.category !== 'all') query.category = newVal.category;
  if (newVal.viscosity && newVal.viscosity !== 'all') query.viscosity = newVal.viscosity;
  navigateTo({ path: '/products', query }, { replace: true });
}, { deep: true });

useHead({
  title: 'Oil Catalog & Fresh Stock | Sidawi Garage Lebanon',
  meta: [
    {
      name: 'description',
      content:
        'Explore our certified inventory of Liqui Moly, Addinol, and Castrol engine and transmission oils in Lebanon. Filter by viscosity, OEM approval, and brand.',
    },
    { property: 'og:title', content: 'Oil Catalog & Fresh Stock | Sidawi Garage Lebanon' },
    {
      property: 'og:description',
      content:
        'Explore our certified inventory of Liqui Moly, Addinol, and Castrol engine and transmission oils in Lebanon. Filter by viscosity, OEM approval, and brand.',
    },
    { property: 'og:url', content: 'https://sidawigarage.com/products' },
    { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Oil Catalog & Fresh Stock | Sidawi Garage Lebanon' },
    {
      name: 'twitter:description',
      content:
        'Explore our certified inventory of Liqui Moly, Addinol, and Castrol engine and transmission oils in Lebanon. Filter by viscosity, OEM approval, and brand.',
    },
    { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sidawigarage.com/products' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Oil Catalog', path: '/products' },
        ])
      ),
    },
  ],
});
</script>

<template>
  <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="max-w-3xl mb-10 space-y-3">
      <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
        <span>Certified Inventory</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
        Engineered Lubricants & Fluids.
      </h1>
      <p class="text-sm text-zinc-400">
        Direct from certified German and UK manufacturers. Filter by brand, viscosity, or OEM approval standard to find the exact formulation for your vehicle.
      </p>
    </div>

    <!-- Live Filter Bar -->
    <div class="mb-10">
      <ProductFilters v-model="filters" />
    </div>

    <!-- Results Status Count -->
    <div class="flex items-center justify-between mb-6 text-xs text-zinc-400">
      <div>
        Showing <span class="font-bold text-white">{{ filteredProducts.length }}</span> of {{ products.length }} formulations
      </div>
      <div v-if="filters.brandId !== 'all' || filters.category !== 'all' || filters.viscosity !== 'all' || filters.search" class="text-amber-400 font-medium">
        Filtered View
      </div>
    </div>

    <!-- Product Grid -->
    <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Zero State / Empty Search -->
    <div
      v-else
      class="rounded-3xl border border-white/10 bg-zinc-900/40 p-12 text-center backdrop-blur-xl max-w-xl mx-auto my-12 space-y-4"
    >
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
        <UIcon name="i-lucide-search-x" class="w-6 h-6" />
      </div>
      <h3 class="text-lg font-bold text-white">No exact specification matched</h3>
      <p class="text-xs text-zinc-400">
        Mahmoud Sidawi can order and source custom factory formulations or verify your vehicle's VIN directly.
      </p>
      <NuxtLink
        to="/contact"
        class="inline-flex items-center gap-2 rounded-full bg-amber-500 text-black px-6 py-2.5 text-xs font-semibold hover:bg-amber-400 transition-colors"
      >
        <span>Ask Mahmoud for Custom Spec</span>
      </NuxtLink>
    </div>
  </div>
</template>
