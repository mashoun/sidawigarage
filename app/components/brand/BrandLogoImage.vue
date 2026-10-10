<script setup lang="ts">
/**
 * BrandLogoImage Component
 * 
 * Renders authentic manufacturer logos (Liqui Moly, Addinol, Castrol)
 * directly from official source image assets on a high-contrast solid white background.
 */
const props = withDefaults(
  defineProps<{
    brandId: string;
    alt?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'auto';
    withBg?: boolean;
    containerClass?: string;
    imgClass?: string;
  }>(),
  {
    alt: '',
    size: 'auto',
    withBg: true,
    containerClass: '',
    imgClass: '',
  }
);

const logoMap: Record<string, { src: string; name: string }> = {
  'liqui-moly': { src: '/images/brands/liqui-moly.svg', name: 'Liqui Moly' },
  'addinol': { src: '/images/brands/addinol.png', name: 'Addinol' },
  'castrol': { src: '/images/brands/castrol.svg', name: 'Castrol' },
};

const brandInfo = computed(() => {
  const key = props.brandId.toLowerCase().trim();
  return logoMap[key] || { src: '', name: props.brandId };
});

const sizeContainerClass = computed(() => {
  if (props.containerClass) return props.containerClass;
  switch (props.size) {
    case 'xs':
      return 'h-6 px-2 py-0.5 rounded-md';
    case 'sm':
      return 'h-7.5 px-2.5 py-1 rounded-lg';
    case 'md':
      return 'h-9 px-3 py-1.5 rounded-xl';
    case 'lg':
      return 'h-13 w-32 sm:w-36 p-2 rounded-xl';
    default:
      return 'px-2.5 py-1 rounded-xl';
  }
});

const sizeImgClass = computed(() => {
  if (props.imgClass) return props.imgClass;
  switch (props.size) {
    case 'xs':
      return 'h-3.5 max-w-[65px]';
    case 'sm':
      return 'h-4.5 max-w-[80px]';
    case 'md':
      return 'h-5.5 max-w-[100px]';
    case 'lg':
      return 'h-7 sm:h-8 max-w-[110px]';
    default:
      return 'h-5 max-w-[120px]';
  }
});
</script>

<template>
  <div
    class="inline-flex items-center justify-center select-none overflow-hidden shrink-0"
    :class="[
      withBg
        ? 'bg-white shadow-sm border border-slate-200/90'
        : '',
      sizeContainerClass,
    ]"
  >
    <img
      v-if="brandInfo.src"
      :src="brandInfo.src"
      :alt="alt || `${brandInfo.name} official logo`"
      :class="[sizeImgClass, 'max-w-full max-h-full w-auto object-contain shrink-0']"
      loading="lazy"
    />
    <span
      v-else
      class="text-[11px] font-bold uppercase tracking-wider text-zinc-900 font-mono"
    >
      {{ brandInfo.name }}
    </span>
  </div>
</template>
