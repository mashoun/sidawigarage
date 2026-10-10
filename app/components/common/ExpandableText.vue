<script setup lang="ts">
/**
 * ExpandableText Component
 * 
 * Accessible, mobile-friendly text container with line-clamp and a smooth "Read more / Show less" toggle.
 * Keeps mobile viewports tidy while allowing users to access the full editorial content on demand.
 */
const props = withDefaults(
  defineProps<{
    text: string;
    clampLines?: 2 | 3 | 4 | 5;
    thresholdLength?: number;
    textClass?: string;
  }>(),
  {
    clampLines: 3,
    thresholdLength: 110,
    textClass: 'text-xs text-zinc-400 leading-relaxed',
  }
);

const isExpanded = ref(false);

const clampClass = computed(() => {
  if (isExpanded.value) return '';
  switch (props.clampLines) {
    case 2:
      return 'line-clamp-2';
    case 4:
      return 'line-clamp-4';
    case 5:
      return 'line-clamp-5';
    case 3:
    default:
      return 'line-clamp-3';
  }
});

const needsToggle = computed(() => {
  return props.text && props.text.length > props.thresholdLength;
});
</script>

<template>
  <div class="space-y-1.5">
    <p :class="[textClass, clampClass, 'transition-all duration-200']">
      {{ text }}
    </p>
    <button
      v-if="needsToggle"
      type="button"
      class="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 transition-colors focus:outline-none focus-visible:underline cursor-pointer"
      :aria-expanded="isExpanded"
      @click.stop="isExpanded = !isExpanded"
    >
      <span>{{ isExpanded ? 'Show less' : 'Read more' }}</span>
      <UIcon :name="isExpanded ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'" class="w-3.5 h-3.5" />
    </button>
  </div>
</template>
