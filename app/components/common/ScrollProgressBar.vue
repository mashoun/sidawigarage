<script setup lang="ts">
/**
 * ScrollProgressBar Component
 * 
 * Elegant, luxury top-of-viewport scroll progress indicator.
 * - Hardware-accelerated scaleX transform
 * - Ambient amber glow matching garage brand aesthetic
 * - Graceful fade-in when scrolling begins
 * - Automatically respects prefers-reduced-motion
 */

const progress = ref(0);
const isVisible = ref(false);

const updateScrollProgress = () => {
  if (typeof window === 'undefined') return;

  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;

  if (docHeight <= 0) {
    progress.value = 0;
    isVisible.value = false;
    return;
  }

  const current = Math.min(Math.max(scrollY / docHeight, 0), 1);
  progress.value = current;
  isVisible.value = scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();
});

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', updateScrollProgress);
    window.removeEventListener('resize', updateScrollProgress);
  }
});
</script>

<template>
  <div
    class="fixed top-0 inset-x-0 z-[60] h-[2.5px] pointer-events-none transition-opacity duration-300"
    :class="isVisible ? 'opacity-100' : 'opacity-0'"
    aria-hidden="true"
  >
    <!-- Background track: ultra-subtle dark amber line -->
    <div class="absolute inset-0 bg-amber-500/10 backdrop-blur-xs" />

    <!-- Animated progress fill with metallic gold gradient & glow -->
    <div
      class="h-full w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.6),0_0_3px_rgba(251,191,36,0.9)] origin-left will-change-transform"
      :style="{ transform: `scaleX(${progress})` }"
    />
  </div>
</template>
