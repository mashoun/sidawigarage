<script setup lang="ts">
import type { VideoReel } from '~~/shared/domain/models';

const props = withDefaults(
  defineProps<{
    reel: VideoReel;
    isPlaying?: boolean;
  }>(),
  {
    isPlaying: false,
  }
);

const emit = defineEmits<{
  (e: 'play', reel: VideoReel): void;
  (e: 'stop', reel: VideoReel): void;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const internalPlaying = ref(false);

const activePlaying = computed(() => props.isPlaying || internalPlaying.value);

const directVideoSrc = computed(() => {
  if (props.reel.videoUrl) return props.reel.videoUrl;
  if (props.reel.url.endsWith('.mp4')) return props.reel.url;
  const match = props.reel.url.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (match) return `/videos/reels/${match[1]}.mp4`;
  return '';
});

const startPlayback = () => {
  internalPlaying.value = true;
  emit('play', props.reel);
  nextTick(() => {
    if (videoRef.value) {
      videoRef.value.play().catch(() => {
        // Fallback for strict browser autoplay policies
        if (videoRef.value) {
          videoRef.value.muted = true;
          videoRef.value.play().catch(() => {});
        }
      });
    }
  });
};

const stopPlayback = (e?: Event) => {
  if (e) e.stopPropagation();
  internalPlaying.value = false;
  if (videoRef.value) {
    videoRef.value.pause();
    videoRef.value.currentTime = 0;
  }
  emit('stop', props.reel);
};

// Sync when external active reel changes
watch(
  () => props.isPlaying,
  (playing) => {
    if (!playing) {
      internalPlaying.value = false;
      if (videoRef.value) {
        videoRef.value.pause();
      }
    } else {
      internalPlaying.value = true;
      nextTick(() => {
        videoRef.value?.play().catch(() => {});
      });
    }
  }
);
</script>

<template>
  <div
    class="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/30 hover:bg-zinc-800/80"
    :class="{ 'ring-2 ring-amber-500/50 border-amber-500/40 shadow-xl shadow-amber-500/5': activePlaying }"
  >
    <!-- Top Bar: Platform & Duration -->
    <div class="flex items-center justify-between mb-4 z-10">
      <div class="flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-300 backdrop-blur-md">
        <UIcon
          name="i-lucide-play-circle"
          class="w-3.5 h-3.5 text-amber-400"
        />
        <span class="text-zinc-200">HD Diagnostic Reel</span>
      </div>

      <div class="flex items-center gap-2">
        <span v-if="reel.duration" class="font-mono text-[10px] text-zinc-400">
          {{ reel.duration }}
        </span>
        <button
          v-if="activePlaying"
          type="button"
          class="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800/90 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 transition-colors focus:outline-none"
          title="Stop playback and show cover"
          @click.stop="stopPlayback"
        >
          <UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Center Interactive Media Area (Aspect Ratio Video Container) -->
    <div
      class="relative aspect-video sm:aspect-square flex flex-col items-center justify-center rounded-2xl bg-black border border-white/5 my-3 overflow-hidden transition-all"
      :class="{ 'border-amber-500/40 shadow-inner': activePlaying }"
    >
      <!-- 1. Active Direct HTML5 Video Player (No popup, No Instagram frame) -->
      <template v-if="activePlaying">
        <video
          ref="videoRef"
          :src="directVideoSrc"
          controls
          autoplay
          playsinline
          preload="auto"
          class="w-full h-full object-cover rounded-2xl z-20 bg-black"
          @ended="stopPlayback"
        />
      </template>

      <!-- 2. Idle Thumbnail & Play Action -->
      <template v-else>
        <!-- Real Thumbnail Cover Image -->
        <img
          v-if="reel.thumbnail"
          :src="reel.thumbnail"
          :alt="reel.title"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 cursor-pointer"
          @click="startPlayback"
        />
        <!-- Gradient Fallback -->
        <div
          v-else
          class="absolute inset-0 bg-gradient-to-tr from-amber-500/10 via-transparent to-zinc-800/30 opacity-70 cursor-pointer"
          @click="startPlayback"
        />

        <!-- Contrast gradient over image -->
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30 group-hover:from-black/60 transition-all cursor-pointer pointer-events-none"
        />

        <!-- Big Play Button with Spring Hover -->
        <button
          type="button"
          class="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-black shadow-xl shadow-black/50 transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Play video inline"
          @click.stop="startPlayback"
        >
          <UIcon name="i-lucide-play" class="w-6 h-6 ml-0.5" />
        </button>

        <!-- Vehicle Tag Pill -->
        <div class="absolute bottom-3 inset-x-3 z-10 text-center pointer-events-none">
          <span class="inline-block rounded-xl bg-black/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md border border-white/10 max-w-full truncate shadow-md">
            🚗 {{ reel.vehicle }}
          </span>
        </div>
      </template>
    </div>

    <!-- Details -->
    <div class="space-y-1.5 mt-2">
      <h3 class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
        {{ reel.title }}
      </h3>
      <p class="text-xs text-zinc-400 line-clamp-2">
        {{ reel.description }}
      </p>

      <!-- Oil Used Indicator & Instagram Link -->
      <div class="pt-2 flex items-center justify-between text-[11px] font-mono">
        <div class="flex items-center gap-1.5 text-amber-400/90 truncate mr-2">
          <UIcon name="i-lucide-droplets" class="w-3.5 h-3.5 shrink-0" />
          <span class="truncate">{{ reel.oilUsed }}</span>
        </div>

        <a
          v-if="reel.url"
          :href="reel.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-pink-400 transition-colors shrink-0 font-sans"
          title="View original on Instagram"
          @click.stop
        >
          <UIcon name="i-lucide-instagram" class="w-3 h-3" />
          <span>Instagram</span>
        </a>
      </div>
    </div>
  </div>
</template>
