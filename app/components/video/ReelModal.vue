<script setup lang="ts">
/**
 * ReelModal Component
 * 
 * Accessible, responsive video theater modal for client reels & diagnostic videos.
 * Features body scroll lock, Escape key dismissal, dynamic 16:9 / 9:16 aspect ratio handling,
 * and an inner vertical scroll container so the CTA and description are never cut off on
 * smaller viewports or mobile devices.
 */
import type { VideoReel } from '~~/shared/domain/models';
import { resolveVideoUrl } from '~~/shared/utils/video';
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const props = defineProps<{
  reel: VideoReel | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const resolved = computed(() => {
  if (!props.reel) return null;
  return resolveVideoUrl(props.reel.url);
});

const whatsAppUrl = computed(() => {
  if (!props.reel) return '';
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    carModel: props.reel.vehicle,
    oilName: props.reel.oilUsed,
    serviceType: props.reel.serviceType,
  });
});

// Escape key listener for keyboard accessibility
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    emit('close');
  }
};

// Lock body scrolling when modal is open to prevent background scroll interference
watch(
  () => props.reel,
  (newVal) => {
    if (typeof document === 'undefined') return;
    if (newVal) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="reel"
        class="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="reel-modal-title"
        @click.self="emit('close')"
      >
        <div
          class="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[88vh] flex flex-col rounded-3xl border border-white/15 bg-zinc-950 shadow-2xl overflow-hidden"
        >
          <!-- Modal Top Bar (Sticky Header with 44px close button) -->
          <div class="shrink-0 flex items-center justify-between px-5 sm:px-6 py-4 border-b border-white/10 bg-zinc-950/90 backdrop-blur-md">
            <div class="min-w-0 pr-3">
              <span class="text-[11px] font-semibold uppercase tracking-wider text-amber-400 block truncate">
                {{ reel.vehicle }}
              </span>
              <h3 id="reel-modal-title" class="text-sm sm:text-base font-bold text-white leading-snug truncate">
                {{ reel.title }}
              </h3>
            </div>
            <button
              type="button"
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Close modal"
              @click="emit('close')"
            >
              <UIcon name="i-lucide-x" class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Scrollable Content Container -->
          <div class="flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6 space-y-4">
            <!-- Dynamic Aspect-Ratio Video Container (No hardcoded cut-off min-height) -->
            <div
              v-if="resolved"
              class="relative bg-black rounded-2xl overflow-hidden border border-white/10 shadow-lg flex items-center justify-center"
              :class="resolved.aspectRatio === '9/16' 
                ? 'mx-auto w-full max-w-[340px] aspect-[9/16]' 
                : 'w-full aspect-video'"
            >
              <!-- Iframe embed for YouTube / IG / TikTok -->
              <iframe
                v-if="resolved.isIframe"
                :src="resolved.embedUrl"
                class="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              />
              <!-- Native Video player for direct URLs -->
              <video
                v-else
                :src="resolved.directUrl"
                controls
                autoplay
                class="w-full h-full object-contain"
              />
            </div>

            <!-- Description & Booking CTA Card -->
            <div class="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div class="text-xs text-zinc-400 space-y-1.5 flex-1 min-w-0">
                <p class="font-medium text-zinc-200 flex items-center gap-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1 text-amber-400 font-mono font-semibold">
                    <UIcon name="i-lucide-droplets" class="w-3.5 h-3.5" />
                    Oil Applied:
                  </span>
                  <span class="text-amber-300 font-mono font-bold">{{ reel.oilUsed }}</span>
                </p>
                <p class="text-zinc-300 leading-relaxed text-xs">
                  {{ reel.description }}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto shrink-0">
                <a
                  v-if="reel.platform === 'instagram'"
                  :href="reel.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 hover:bg-pink-500/20 text-pink-300 px-5 py-3 text-xs font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UIcon name="i-lucide-instagram" class="w-4 h-4 text-pink-400" />
                  <span>Open on Instagram</span>
                </a>

                <a
                  :href="whatsAppUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-6 py-3 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
                  <span>Book Same Service</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
