<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const whatsAppUrl = computed(() => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    serviceType: 'general',
  });
});

const isScrolled = ref(false);

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 60;
  }
};

const scrollToContent = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: window.innerHeight * 0.88,
      behavior: 'smooth',
    });
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <section class="relative min-h-[94vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center overflow-hidden">
    <!-- WebGL Fluid Background Canvas (Interactive Mouse & Scroll) -->
    <ClientOnly>
      <HeroWebGL />
      <template #fallback>
        <div class="absolute inset-0 z-0 bg-gradient-to-b from-[#08090C] via-[#12141A] to-[#08090C] opacity-80" />
      </template>
    </ClientOnly>

    <div class="relative z-10 max-w-5xl mx-auto flex flex-col items-center">
      <!-- Main Headline (Apple-Grade Bold Minimalist Typography with Blur-in) -->
      <h1
        v-reveal="{ variant: 'blur-in', delay: 100, duration: 1000 }"
        class="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl leading-[1.08]"
      >
        The Science of <br class="hidden sm:inline" />
        <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
          Pure Lubrication.
        </span>
      </h1>

      <!-- Subtitle -->
      <p
        v-reveal="{ variant: 'fade-up', delay: 250, duration: 1000 }"
        class="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-normal leading-relaxed"
      >
        Engine and transmission gear oils formulated for extremes. Servicing every automotive marque in Lebanon with zero-compromise precision by <span class="text-white font-medium">Mahmoud Sidawi</span>.
      </p>

      <!-- Primary Action CTAs -->
      <div
        v-reveal="{ variant: 'fade-up', delay: 400, duration: 1000 }"
        class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full sm:w-auto"
      >
        <NuxtLink
          to="/products"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-amber-500/20 transition-all duration-200 hover:from-amber-400 hover:to-amber-500 hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
        >
          <span>Explore Oil Catalog</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>

        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition-all duration-200 hover:bg-white/10 hover:border-white/25 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        >
          <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-emerald-400" />
          <span>Direct WhatsApp Consultation</span>
        </a>
      </div>

      <!-- Apple Hardware-Style Spec Bar Bento with Staggered Cascades -->
      <div class="mt-16 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div
          v-reveal="{ variant: 'fade-up', delay: 550 }"
          class="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-800/60"
        >
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-white">100% Certified</span>
          <span class="text-xs text-zinc-400 mt-0.5">OEM Approved Formulations</span>
        </div>
        <div
          v-reveal="{ variant: 'fade-up', delay: 650 }"
          class="flex flex-col items-center justify-center rounded-2xl border border-amber-500/20 bg-zinc-900/60 p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/50 hover:bg-zinc-800/80 shadow-lg shadow-amber-500/5"
        >
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-amber-400">0-Defect Flush</span>
          <span class="text-xs text-zinc-400 mt-0.5">Closed-Loop Transmission Care</span>
        </div>
        <div
          v-reveal="{ variant: 'fade-up', delay: 750 }"
          class="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900/50 p-4 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-800/60"
        >
          <span class="text-xl sm:text-2xl font-bold tracking-tight text-white">Top 3 Brands</span>
          <span class="text-xs text-zinc-400 mt-0.5">Liqui Moly · Addinol · Castrol</span>
        </div>
      </div>
    </div>

    <!-- Interactive Scroll Explore Cue -->
    <button
      type="button"
      class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-all duration-500 focus:outline-none group"
      :class="isScrolled ? 'opacity-0 pointer-events-none translate-y-2' : 'opacity-80 hover:opacity-100'"
      aria-label="Scroll down to explore garage credentials"
      @click="scrollToContent"
    >
      <span class="text-[11px] font-mono tracking-wider uppercase text-zinc-400 group-hover:text-amber-300 transition-colors">Scroll to explore</span>
      <div class="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1 group-hover:border-amber-400/50 transition-colors">
        <div class="w-1 h-2 rounded-full bg-amber-400 animate-gentle-bounce" />
      </div>
    </button>
  </section>
</template>
