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
  <NuxtLink to="/" class="group inline-flex items-center gap-3 transition-opacity duration-200 hover:opacity-90">
    <!-- Precision Kinetic Droplet Monogram (Extracted Transparent Asset) -->
    <div
      class="relative flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105"
      :class="{
        'h-8 w-8': size === 'sm',
        'h-10 w-10': size === 'md',
        'h-12 w-12': size === 'lg',
      }"
    >
      <!-- Atmospheric warm amber glow behind the metallic droplet -->
      <div
        class="absolute inset-0 rounded-full bg-amber-500/25 blur-md opacity-70 transition-opacity duration-300 group-hover:opacity-100 group-hover:blur-lg"
      />
      <picture class="relative z-10 flex h-full w-full items-center justify-center">
        <source srcset="/images/brand/sidawi-emblem.webp" type="image/webp" />
        <img
          src="/images/brand/sidawi-emblem.png"
          alt="Sidawi Garage - Engineered for Extremes Monogram"
          width="48"
          height="48"
          class="h-full w-full object-contain drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)] filter"
          loading="eager"
        />
      </picture>
    </div>

    <!-- Wordmark & Subtitle -->
    <div class="flex flex-col text-left select-none">
      <div class="flex items-center gap-1.5 font-bold tracking-tight text-white leading-tight">
        <span
          class="font-extrabold tracking-wider"
          :class="{
            'text-sm': size === 'sm',
            'text-base': size === 'md',
            'text-lg': size === 'lg',
          }"
        >
          SIDAWI
        </span>
        <span
          class="rounded bg-amber-500/10 px-1 py-0.5 font-semibold tracking-widest text-amber-400 border border-amber-500/20"
          :class="{
            'text-[8px]': size === 'sm',
            'text-[9.5px]': size === 'md',
            'text-[10px]': size === 'lg',
          }"
        >
          GARAGE
        </span>
      </div>
      <span
        v-if="showSubtitle"
        class="font-medium tracking-[0.14em] uppercase text-zinc-400"
        :class="{
          'text-[8px]': size === 'sm',
          'text-[9px]': size === 'md',
          'text-[10px]': size === 'lg',
        }"
      >
        Engineered for Extremes
      </span>
    </div>
  </NuxtLink>
</template>
