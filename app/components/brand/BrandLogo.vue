<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

withDefaults(defineProps<Props>(), {
  size: 'md',
  showSubtitle: true,
});
</script>

<template>
  <NuxtLink to="/" class="group inline-flex items-center gap-2.5 sm:gap-3 transition-opacity duration-200 hover:opacity-90 shrink-0">
    <!-- Precision Kinetic Droplet Monogram -->
    <div
      class="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
      :class="{
        'h-7 w-7 sm:h-8 sm:w-8': size === 'sm',
        'h-8 w-8 sm:h-9.5 sm:w-9.5': size === 'md',
        'h-10 w-10 sm:h-11 sm:w-11': size === 'lg',
      }"
    >
      <!-- Atmospheric warm amber glow behind the metallic droplet -->
      <div
        class="absolute inset-0 rounded-full bg-amber-500/25 blur-sm opacity-70 transition-opacity duration-300 group-hover:opacity-100"
      />
      <picture class="relative z-10 flex h-full w-full items-center justify-center">
        <source srcset="/images/brand/sidawi-emblem.webp" type="image/webp" />
        <img
          src="/images/brand/sidawi-emblem.png"
          alt="Sidawi Garage Monogram"
          width="40"
          height="40"
          class="h-full w-full object-contain drop-shadow-[0_2px_8px_rgba(245,158,11,0.3)] filter"
          loading="eager"
        />
      </picture>
    </div>

    <!-- Wordmark & Subtitle -->
    <div class="flex flex-col text-left select-none leading-none">
      <div class="flex items-center gap-1.5 font-bold tracking-tight text-white">
        <span
          class="font-extrabold tracking-wider"
          :class="{
            'text-xs sm:text-sm': size === 'sm',
            'text-sm sm:text-base': size === 'md',
            'text-base sm:text-lg': size === 'lg',
          }"
        >
          SIDAWI
        </span>
        <span
          class="rounded bg-amber-500/10 px-1 py-0.5 font-semibold tracking-widest text-amber-400 border border-amber-500/20"
          :class="{
            'text-[7px] sm:text-[8px]': size === 'sm',
            'text-[8px] sm:text-[9px]': size === 'md',
            'text-[9px] sm:text-[10px]': size === 'lg',
          }"
        >
          GARAGE
        </span>
      </div>
      <span
        v-if="showSubtitle"
        class="font-medium tracking-[0.14em] uppercase text-zinc-400 mt-0.5"
        :class="{
          'text-[7px] sm:text-[8px]': size === 'sm',
          'text-[7.5px] sm:text-[8.5px]': size === 'md',
          'text-[8.5px] sm:text-[9.5px]': size === 'lg',
        }"
      >
        Precision Lubricants
      </span>
    </div>
  </NuxtLink>
</template>
