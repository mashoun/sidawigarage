<script setup lang="ts">
import { useVideoReels } from '~~/app/composables/useVideoReels';
import { useJsonLd } from '~~/app/composables/useJsonLd';
import type { VideoReel } from '~~/shared/domain/models';

const { reels } = useVideoReels();
const { getBreadcrumbSchema, getVideoSchema } = useJsonLd();

const activeFilter = ref<'all' | 'transmission_flush' | 'motor_oil' | 'differential'>('all');
const activePlayingId = ref<string | null>(null);

const filteredReels = computed(() => {
  if (activeFilter.value === 'all') return reels.value;
  return reels.value.filter((r) => r.serviceType === activeFilter.value);
});

const handlePlay = (reel: VideoReel) => {
  activePlayingId.value = reel.id;
};

const handleStop = () => {
  activePlayingId.value = null;
};

// SEO Head Configuration
useHead({
  title: 'Client Reel Videos & Service Transparency | Sidawi Garage',
  meta: [
    {
      name: 'description',
      content:
        'Watch recorded client reels showing our closed-loop transmission flushing and precision motor oil service on BMW, Mercedes, Porsche, and Audi vehicles at Sidawi Garage.',
    },
    { property: 'og:title', content: 'Client Reel Videos & Service Transparency | Sidawi Garage' },
    {
      property: 'og:description',
      content:
        'Watch recorded client reels showing our closed-loop transmission flushing and precision motor oil service on BMW, Mercedes, Porsche, and Audi vehicles at Sidawi Garage.',
    },
    { property: 'og:url', content: 'https://sidawigarage.com/videos' },
    { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Client Reel Videos & Service Transparency | Sidawi Garage' },
    {
      name: 'twitter:description',
      content:
        'Watch recorded client reels showing our closed-loop transmission flushing and precision motor oil service on BMW, Mercedes, Porsche, and Audi vehicles at Sidawi Garage.',
    },
    { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sidawigarage.com/videos' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Client Video Reels', path: '/videos' },
        ])
      ),
    },
    ...reels.value.map((r) => ({
      type: 'application/ld+json',
      children: JSON.stringify(getVideoSchema(r)),
    })),
  ],
});
</script>

<template>
  <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
      <div class="max-w-3xl space-y-3">
        <div class="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3.5 py-1 text-xs font-semibold text-pink-300">
          <UIcon name="i-lucide-film" class="w-3.5 h-3.5" />
          <span>Documented Workflows</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Client Reels & Diagnostic Recordings.
        </h1>
        <p class="text-sm text-zinc-400">
          Every specialized oil flush is documented. We share short reel videos of client vehicles to prove fluid condition, temperature accuracy, and zero-defect workmanship.
        </p>
      </div>

      <a
        href="https://www.instagram.com/mahmoud__sidawi/"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2.5 rounded-2xl border border-pink-500/30 bg-pink-500/10 px-5 py-3 text-xs font-bold text-pink-300 hover:bg-pink-500/20 hover:border-pink-500/50 transition-all shrink-0 w-fit"
      >
        <UIcon name="i-lucide-instagram" class="w-4 h-4 text-pink-400" />
        <span>Follow @mahmoud__sidawi</span>
        <UIcon name="i-lucide-external-link" class="w-3.5 h-3.5 opacity-70" />
      </a>
    </div>

    <!-- Filter Pills -->
    <div class="flex flex-wrap items-center gap-2 mb-10 p-1.5 rounded-2xl bg-zinc-900/60 border border-white/10 w-fit">
      <button
        type="button"
        class="rounded-xl px-4 py-2 text-xs font-medium transition-all"
        :class="activeFilter === 'all' ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400 hover:text-white'"
        @click="activeFilter = 'all'"
      >
        All Recordings ({{ reels.length }})
      </button>

      <button
        type="button"
        class="rounded-xl px-4 py-2 text-xs font-medium transition-all"
        :class="activeFilter === 'transmission_flush' ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'"
        @click="activeFilter = 'transmission_flush'"
      >
        Transmission Flushes
      </button>

      <button
        type="button"
        class="rounded-xl px-4 py-2 text-xs font-medium transition-all"
        :class="activeFilter === 'motor_oil' ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'"
        @click="activeFilter = 'motor_oil'"
      >
        Engine Oil Services
      </button>

      <button
        type="button"
        class="rounded-xl px-4 py-2 text-xs font-medium transition-all"
        :class="activeFilter === 'differential' ? 'bg-amber-500 text-black font-semibold' : 'text-zinc-400 hover:text-white'"
        @click="activeFilter = 'differential'"
      >
        Differential & Transfer Cases
      </button>
    </div>

    <!-- Videos Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ReelCard
        v-for="reel in filteredReels"
        :key="reel.id"
        :reel="reel"
        :is-playing="activePlayingId === reel.id"
        @play="handlePlay"
        @stop="handleStop"
      />
    </div>
  </div>
</template>
