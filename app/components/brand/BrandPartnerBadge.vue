<script setup lang="ts">
/**
 * BrandPartnerBadge Component
 * 
 * Interactive brand accreditation card featuring:
 * - Real official manufacturer logo on high-contrast solid white background
 * - Manufacturer certificate preview thumbnail with click-to-view in all-screen mode
 * - Key OEM certifications and instant WhatsApp / product catalog links
 */
import type { Brand } from '~~/shared/domain/models';

defineProps<{
  brand: Brand;
}>();

const emit = defineEmits<{
  (e: 'view-certificate', brand: Brand): void;
}>();
</script>

<template>
  <div
    class="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-800/80 hover:shadow-2xl hover:shadow-amber-500/5"
  >
    <!-- Top Header: Authentic Brand Logo on White & Verified Badges -->
    <div>
      <div class="flex items-start justify-between gap-3 mb-4">
        <!-- Logo container: Solid white background with balanced dimensions -->
        <div class="flex h-13 w-32 sm:w-36 shrink-0 items-center justify-center rounded-xl bg-white p-2 shadow-md border border-slate-200/90 transition-transform duration-300 group-hover:scale-105 overflow-hidden">
          <BrandLogoImage
            :brand-id="brand.id"
            :with-bg="false"
            class="h-7 sm:h-8 w-auto max-w-[115px] object-contain"
          />
        </div>

        <div class="flex flex-col items-end gap-1">
          <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/20">
            <UIcon name="i-lucide-badge-check" class="w-3 h-3 text-emerald-400" />
            Certified Partner
          </span>
          <span class="text-[10px] font-mono text-zinc-400">
            {{ brand.country }}
          </span>
        </div>
      </div>

      <!-- Brand Title & Tagline -->
      <div class="space-y-1 mb-4">
        <h4 class="font-bold text-base text-white tracking-tight">
          {{ brand.name }}
        </h4>
        <p class="text-xs text-zinc-400 leading-relaxed line-clamp-2">
          {{ brand.tagline }}
        </p>
      </div>

      <!-- Certificate Preview Card (Clickable All-Screen Mode Trigger) -->
      <div
        v-if="brand.certificateImage"
        class="relative mb-4 rounded-2xl overflow-hidden border border-amber-500/20 bg-zinc-950/70 p-2.5 transition-all duration-300 hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/10 group/cert cursor-pointer"
        role="button"
        tabindex="0"
        :aria-label="`Inspect official certificate for ${brand.name} in all-screen mode`"
        @click="emit('view-certificate', brand)"
        @keydown.enter.prevent="emit('view-certificate', brand)"
        @keydown.space.prevent="emit('view-certificate', brand)"
      >
        <div class="flex items-center gap-3">
          <!-- Thumbnail with subtle golden frame -->
          <div class="relative h-16 w-22 shrink-0 rounded-lg overflow-hidden border border-amber-500/30 bg-zinc-900 shadow-inner">
            <img
              :src="brand.certificateImage"
              :alt="`${brand.name} Certificate Thumbnail`"
              class="w-full h-full object-cover transition-transform duration-300 group-hover/cert:scale-110"
              loading="lazy"
            />
            <!-- Hover zoom indicator overlay -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/cert:opacity-100 transition-opacity flex items-center justify-center">
              <UIcon name="i-lucide-maximize-2" class="w-4 h-4 text-amber-300" />
            </div>
          </div>

          <!-- Certificate details & CTA label -->
          <div class="min-w-0 flex-1">
            <div class="flex items-center gap-1 text-amber-400 text-[11px] font-semibold mb-0.5">
              <UIcon name="i-lucide-award" class="w-3.5 h-3.5 shrink-0" />
              <span class="truncate">Official Certificate</span>
            </div>
            <p class="text-[10px] font-mono text-zinc-400 truncate">
              {{ brand.certificateNumber || 'Verified Accreditation' }}
            </p>
            <span class="inline-flex items-center gap-1 text-[11px] font-medium text-amber-300 group-hover/cert:text-amber-200 mt-1">
              <span>View all-screen</span>
              <UIcon name="i-lucide-external-link" class="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      <!-- Approved OEM Standards Mini Badges -->
      <div v-if="brand.certificationsSummary?.length" class="space-y-1.5 mb-4">
        <span class="text-[10px] font-semibold uppercase tracking-wider text-zinc-500 block">
          Key OEM Approvals:
        </span>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="cert in brand.certificationsSummary.slice(0, 3)"
            :key="cert"
            class="rounded-md bg-zinc-800/90 px-2 py-0.5 text-[10px] font-mono text-zinc-300 border border-white/5"
          >
            {{ cert }}
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom Actions: Fullscreen Certificate Button & Stock Catalog Link -->
    <div class="pt-3 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/50 text-amber-300 hover:text-amber-200 px-3.5 py-2 text-xs font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        @click="emit('view-certificate', brand)"
      >
        <UIcon name="i-lucide-award" class="w-4 h-4 text-amber-400" />
        <span>View Certificate</span>
        <UIcon name="i-lucide-maximize-2" class="w-3 h-3 opacity-70" />
      </button>

      <NuxtLink
        :to="`/products?brand=${brand.id}`"
        class="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors py-1 sm:py-0"
      >
        <span>Stock</span>
        <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5" />
      </NuxtLink>
    </div>
  </div>
</template>
