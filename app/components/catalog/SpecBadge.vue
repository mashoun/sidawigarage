<script setup lang="ts">
defineProps<{
  label: string;
  variant?: 'approval' | 'viscosity' | 'neutral';
}>();
</script>

<template>
  <span
    class="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-mono font-medium tracking-tight border transition-colors"
    :class="{
      'bg-amber-500/10 text-amber-300 border-amber-500/20': variant === 'viscosity',
      'bg-sky-500/10 text-sky-300 border-sky-500/20': variant === 'approval',
      'bg-white/5 text-zinc-300 border-white/10': !variant || variant === 'neutral'
    }"
  >
    {{ label }}
  </span>
</template>
