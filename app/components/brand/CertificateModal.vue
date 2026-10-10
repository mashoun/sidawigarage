<script setup lang="ts">
/**
 * CertificateModal Component
 * 
 * Fullscreen / all-screen mode modal for inspecting manufacturer authorization certificates.
 * Supports:
 * - Dynamic zoom controls (100%, 125%, 150%, 200%) & click-to-zoom
 * - Native browser fullscreen toggle (requestFullscreen / exitFullscreen)
 * - Keyboard navigation (Escape to close, +/- to zoom, 0 to reset, f for fullscreen)
 * - Direct download of original high-resolution certificate
 * - Body scroll lock and accessible dismissals
 */
import type { Brand } from '~~/shared/domain/models';
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const props = defineProps<{
  brand: Brand | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

// Zoom state: 1 (fit), 1.25, 1.5, 2
const zoomLevel = ref<number>(1);
const isNativeFullscreen = ref<boolean>(false);

const zoomPercentage = computed(() => `${Math.round(zoomLevel.value * 100)}%`);

const zoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value = Math.min(2, Math.round((zoomLevel.value + 0.25) * 100) / 100);
  }
};

const zoomOut = () => {
  if (zoomLevel.value > 0.75) {
    zoomLevel.value = Math.max(0.75, Math.round((zoomLevel.value - 0.25) * 100) / 100);
  }
};

const resetZoom = () => {
  zoomLevel.value = 1;
};

const toggleClickZoom = () => {
  zoomLevel.value = zoomLevel.value === 1 ? 1.5 : 1;
};

// Native Browser Fullscreen Toggle
const toggleNativeFullscreen = async () => {
  if (typeof document === 'undefined') return;
  try {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      isNativeFullscreen.value = true;
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        isNativeFullscreen.value = false;
      }
    }
  } catch (err) {
    // Fullscreen may be restricted in some iframes/environments
    console.warn('Native fullscreen toggle error:', err);
  }
};

const onFullscreenChange = () => {
  if (typeof document !== 'undefined') {
    isNativeFullscreen.value = !!document.fullscreenElement;
  }
};

// WhatsApp booking prefilled for this certified brand
const whatsAppBookingUrl = computed(() => {
  if (!props.brand) return '';
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    oilName: `${props.brand.name} Authorized Service`,
    serviceType: 'Oil Service with Certified Genuine Lubricants',
  });
});

// Keyboard shortcuts
const handleKeydown = (e: KeyboardEvent) => {
  if (!props.brand) return;

  if (e.key === 'Escape') {
    emit('close');
  } else if (e.key === '+' || e.key === '=') {
    zoomIn();
  } else if (e.key === '-') {
    zoomOut();
  } else if (e.key === '0') {
    resetZoom();
  } else if (e.key === 'f' || e.key === 'F') {
    toggleNativeFullscreen();
  }
};

// Lock body scrolling when modal is open
watch(
  () => props.brand,
  (newVal) => {
    if (typeof document === 'undefined') return;
    if (newVal) {
      zoomLevel.value = 1;
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeydown);
      document.addEventListener('fullscreenchange', onFullscreenChange);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('fullscreenchange', onFullscreenChange);
      if (typeof document !== 'undefined' && document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('fullscreenchange', onFullscreenChange);
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
        v-if="brand"
        class="fixed inset-0 z-[110] flex flex-col h-[100dvh] max-h-[100dvh] w-screen max-w-full overflow-hidden bg-zinc-950/98 backdrop-blur-2xl text-white select-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cert-modal-title"
      >
        <!-- Top Toolbar Header (Pinned with safe-area support) -->
        <header class="shrink-0 flex items-center justify-between px-3 sm:px-6 pt-[max(0.75rem,env(safe-area-inset-top))] pb-2.5 sm:py-3.5 border-b border-white/10 bg-zinc-900/95 backdrop-blur-xl z-30 gap-2">
          <!-- Left: Brand Logo & Title -->
          <div class="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
            <BrandLogoImage
              :brand-id="brand.id"
              size="sm"
              class="shrink-0 h-7 sm:h-8 w-auto"
            />
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-1.5 sm:gap-2">
                <h3 id="cert-modal-title" class="font-bold text-xs sm:text-base text-white truncate">
                  {{ brand.name }}
                </h3>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold text-emerald-400 border border-emerald-500/20 shrink-0">
                  <UIcon name="i-lucide-check-circle" class="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />
                  <span class="hidden xs:inline">Verified Reseller</span>
                  <span class="xs:hidden">Verified</span>
                </span>
              </div>
              <p class="text-[10px] sm:text-[11px] text-zinc-400 truncate max-w-[180px] sm:max-w-md">
                {{ brand.certificateTitle || `${brand.name} Authorized Certificate` }}
              </p>
            </div>
          </div>

          <!-- Right: Interactive Controls (shrink-0, perfectly positioned) -->
          <div class="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <!-- Zoom Controls Group (Desktop & Tablet) -->
            <div class="hidden sm:flex items-center bg-zinc-800/80 rounded-full border border-white/10 p-0.5">
              <button
                type="button"
                class="p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                :disabled="zoomLevel <= 0.75"
                title="Zoom Out (-)"
                aria-label="Zoom Out"
                @click="zoomOut"
              >
                <UIcon name="i-lucide-zoom-out" class="w-4 h-4" />
              </button>
              <button
                type="button"
                class="px-2 text-xs font-mono font-bold text-amber-400 hover:text-amber-300 transition-colors"
                title="Reset Zoom (0)"
                aria-label="Reset Zoom"
                @click="resetZoom"
              >
                {{ zoomPercentage }}
              </button>
              <button
                type="button"
                class="p-1.5 rounded-full text-zinc-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                :disabled="zoomLevel >= 2"
                title="Zoom In (+)"
                aria-label="Zoom In"
                @click="zoomIn"
              >
                <UIcon name="i-lucide-zoom-in" class="w-4 h-4" />
              </button>
            </div>

            <!-- Native Fullscreen Toggle -->
            <button
              type="button"
              class="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors shrink-0"
              :title="isNativeFullscreen ? 'Exit Fullscreen (F)' : 'Enter Fullscreen (F)'"
              aria-label="Toggle Fullscreen"
              @click="toggleNativeFullscreen"
            >
              <UIcon
                :name="isNativeFullscreen ? 'i-lucide-minimize' : 'i-lucide-maximize'"
                class="w-3.5 h-3.5 sm:w-4 sm:h-4"
              />
            </button>

            <!-- Download Certificate Button -->
            <a
              v-if="brand.certificateImage"
              :href="brand.certificateImage"
              :download="`${brand.id}-official-certificate.jpg`"
              target="_blank"
              class="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-zinc-800/80 hover:bg-zinc-700/80 border border-white/10 text-zinc-300 hover:text-white transition-colors shrink-0"
              title="Download Certificate File"
              aria-label="Download Certificate"
            >
              <UIcon name="i-lucide-download" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </a>

            <!-- Close Modal Button (44px Accessible Target) -->
            <button
              type="button"
              class="flex h-8.5 w-8.5 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
              title="Close (Escape)"
              aria-label="Close modal"
              @click="emit('close')"
            >
              <UIcon name="i-lucide-x" class="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </header>

        <!-- Certificate Stage Canvas (flex-1 min-h-0 prevents overflowing) -->
        <main
          class="flex-1 min-h-0 w-full overflow-auto overscroll-contain flex items-center justify-center p-2.5 sm:p-6 bg-zinc-950/80 relative"
          @click.self="emit('close')"
        >
          <div
            class="relative transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
            :style="{ transform: `scale(${zoomLevel})` }"
          >
            <!-- Certificate Image Frame with Luxury Accent -->
            <div
              class="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-[0_0_50px_rgba(245,158,11,0.18)] bg-zinc-900 group"
              :class="zoomLevel === 1 ? 'cursor-zoom-in' : 'cursor-zoom-out'"
              @click="toggleClickZoom"
            >
              <img
                :src="brand.certificateImage || '/images/certificates/certificate-placeholder.jpg'"
                :alt="brand.certificateTitle || `${brand.name} Certificate`"
                class="w-auto h-auto max-h-[56vh] sm:max-h-[74vh] max-w-[94vw] sm:max-w-[85vw] object-contain block select-none"
                draggable="false"
              />

              <!-- Zoom Hint Floating Pill on Hover -->
              <div
                class="absolute bottom-2.5 right-2.5 pointer-events-none rounded-full bg-black/75 backdrop-blur-md px-2.5 py-1 text-[10px] sm:text-[11px] font-mono text-zinc-300 border border-white/10 opacity-80 sm:opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
              >
                <UIcon name="i-lucide-search" class="w-3 h-3 text-amber-400" />
                <span>{{ zoomLevel === 1 ? 'Tap to zoom' : 'Reset' }}</span>
              </div>
            </div>
          </div>
        </main>

        <!-- Bottom Verification & Booking Footer (Pinned with safe-area support) -->
        <footer class="shrink-0 flex flex-col sm:flex-row items-center justify-between px-3 sm:px-6 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] border-t border-white/10 bg-zinc-900/95 backdrop-blur-xl gap-2.5 sm:gap-3 z-30">
          <div class="flex items-center gap-2 text-[11px] sm:text-xs text-zinc-300 w-full sm:w-auto justify-between sm:justify-start">
            <div class="flex items-center gap-2">
              <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-emerald-400 shrink-0" />
              <span class="font-medium text-white">Accreditation:</span>
              <code class="font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded text-[10px] sm:text-[11px]">
                {{ brand.certificateNumber || 'AUTH-2026-CERT' }}
              </code>
            </div>
            <span class="text-zinc-500 hidden sm:inline">•</span>
            <span class="text-zinc-400 hidden sm:inline text-[11px]">Guaranteed Authentic Supply</span>
          </div>

          <div class="flex items-center gap-3 w-full sm:w-auto">
            <a
              :href="whatsAppBookingUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black px-4 sm:px-5 py-2 text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4 shrink-0" />
              <span>Book Service with {{ brand.name }}</span>
            </a>
          </div>
        </footer>
      </div>
    </Transition>
  </Teleport>
</template>
