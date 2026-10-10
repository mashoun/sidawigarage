<script setup lang="ts">
import type { Testimonial } from '~~/shared/domain/models';

defineProps<{
  testimonial: Testimonial;
}>();
</script>

<template>
  <div class="flex flex-col justify-between rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/20 hover:bg-zinc-800/70">
    <div class="space-y-4">
      <!-- Stars & Verified Badge -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1 text-amber-400">
          <UIcon
            v-for="star in testimonial.rating"
            :key="star"
            name="i-lucide-star"
            class="w-4 h-4 fill-amber-400"
          />
        </div>
        <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
          <UIcon name="i-lucide-badge-check" class="w-3 h-3" />
          <span>Verified Client</span>
        </span>
      </div>

      <!-- Review Quote -->
      <p class="text-sm text-zinc-300 leading-relaxed italic">
        "{{ testimonial.comment }}"
      </p>
    </div>

    <!-- Client & Car Info -->
    <div class="pt-6 mt-4 border-t border-white/10 flex items-center justify-between">
      <div>
        <h4 class="text-xs font-bold text-white">{{ testimonial.clientName }}</h4>
        <p class="text-[11px] text-zinc-400 font-mono mt-0.5">🚗 {{ testimonial.vehicle }}</p>
      </div>

      <div class="text-right">
        <span class="text-[10px] text-amber-400/90 font-mono block max-w-[140px] truncate">
          {{ testimonial.serviceCompleted }}
        </span>
        <span class="text-[9px] text-zinc-500">{{ testimonial.date }}</span>
      </div>
    </div>
  </div>
</template>
