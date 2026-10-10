<script setup lang="ts">
import type { Product } from '~~/shared/domain/models';
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const props = defineProps<{
  product: Product;
}>();

const whatsAppUrl = computed(() => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    oilName: props.product.name,
    viscosity: props.product.viscosity,
    serviceType: props.product.category === 'transmission' ? 'transmission_flush' : 'motor_oil',
  });
});
</script>

<template>
  <div class="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/60 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-amber-500/5">
    <div>
      <!-- Top Row: Real Brand Logo & Stock Badge -->
      <div class="flex items-center justify-between gap-3 mb-4">
        <div class="flex items-center rounded-xl bg-white px-2.5 py-1 shadow-sm h-7.5 max-w-[130px] border border-slate-200">
          <BrandLogoImage :brand-id="product.brandId" :with-bg="false" class="h-5 w-auto max-w-[110px] object-contain" />
        </div>
        <StockBadge :in-stock="product.inStock" />
      </div>

      <!-- Real Brand Product Canister Presentation -->
      <NuxtLink
        :to="`/products/${product.slug}`"
        class="relative my-4 flex h-48 w-full items-center justify-center rounded-2xl bg-gradient-to-b from-white/[0.04] to-black/40 border border-white/5 p-3 overflow-hidden group/canister transition-all duration-300 hover:border-amber-500/30"
      >
        <div class="absolute inset-0 bg-radial from-amber-500/15 via-transparent to-transparent opacity-0 group-hover/canister:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          loading="lazy"
          class="h-full w-auto max-h-40 object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.7)] transition-transform duration-500 group-hover/canister:scale-105 group-hover/canister:-translate-y-1"
        />
        <div v-else class="flex flex-col items-center justify-center text-zinc-500">
          <UIcon name="i-lucide-droplet" class="w-10 h-10 text-zinc-600 mb-1" />
          <span class="text-[10px] uppercase font-mono tracking-wider">Engineered Fluid</span>
        </div>
      </NuxtLink>

      <!-- Viscosity & Title -->
      <div class="space-y-1.5 mb-3">
        <div class="inline-block font-mono text-sm font-bold text-amber-400">
          {{ product.viscosity }}
        </div>
        <h3 class="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-amber-300 transition-colors">
          {{ product.name }}
        </h3>
      </div>

      <!-- Description with Line-Clamp & Read More Toggle -->
      <div class="mb-4">
        <ExpandableText
          :text="product.description"
          :clamp-lines="3"
          :threshold-length="120"
        />
      </div>

      <!-- Key OEM Approvals -->
      <div class="flex flex-wrap gap-1.5 mb-6">
        <SpecBadge
          v-for="app in product.approvals.slice(0, 3)"
          :key="app"
          :label="app"
          variant="approval"
        />
        <span v-if="product.approvals.length > 3" class="text-[10px] text-zinc-500 self-center">
          +{{ product.approvals.length - 3 }} more
        </span>
      </div>
    </div>

    <!-- Bottom Actions with Ergonomic Touch Targets -->
    <div class="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
      <NuxtLink
        :to="`/products/${product.slug}`"
        class="inline-flex items-center gap-1.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors focus:outline-none focus-visible:underline"
      >
        <span>Full Details</span>
        <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5" />
      </NuxtLink>

      <a
        :href="whatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-4 py-2 text-xs font-semibold text-emerald-400 transition-all hover:bg-emerald-500/25 hover:border-emerald-500/50 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <UIcon name="i-lucide-message-circle" class="w-3.5 h-3.5" />
        <span>Book Service</span>
      </a>
    </div>
  </div>
</template>
