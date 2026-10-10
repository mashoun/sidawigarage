<script setup lang="ts">
defineProps<{
  inStock: boolean;
}>();
</script>

<template>
  <div class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[10px] font-semibold tracking-wide border"
    :class="inStock 
      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
      : 'bg-zinc-800 text-zinc-400 border-zinc-700'"
  >
    <span
      class="h-1.5 w-1.5 rounded-full"
      :class="inStock ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'"
    />
    <span>{{ inStock ? 'Fresh Batch in Stock' : 'Upon Request' }}</span>
  </div>
</template>
