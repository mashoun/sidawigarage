<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const handleError = () => {
  clearError({ redirect: '/' });
};
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center items-center px-4 bg-[#08090C] text-[#F8F9FA] text-center">
    <div class="rounded-3xl border border-white/10 bg-zinc-900/60 p-10 max-w-lg backdrop-blur-2xl space-y-6">
      <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
        <span>{{ error.statusCode === 404 ? 'Specification Not Found' : 'System Notice' }}</span>
      </div>

      <div class="font-mono text-5xl font-black text-amber-400">
        {{ error.statusCode }}
      </div>

      <h1 class="text-2xl font-bold text-white tracking-tight">
        {{ error.message || 'Page or specification is currently unavailable.' }}
      </h1>

      <p class="text-xs text-zinc-400">
        The requested formulation or link might have been relocated. Contact Mahmoud Sidawi directly or return to our oil catalog.
      </p>

      <div class="pt-4 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          class="rounded-full bg-amber-500 hover:bg-amber-400 text-black px-6 py-2.5 text-xs font-bold transition-all"
          @click="handleError"
        >
          Return to Garage Home
        </button>
        <NuxtLink
          to="/products"
          class="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white px-6 py-2.5 text-xs font-semibold transition-all"
        >
          Browse Oil Stock
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
