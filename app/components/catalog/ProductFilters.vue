<script setup lang="ts">
import type { ProductFilters } from '~~/shared/domain/repositories';

const props = defineProps<{
  modelValue: ProductFilters;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: ProductFilters): void;
}>();

const localFilters = reactive<ProductFilters>({
  search: props.modelValue.search || '',
  brandId: props.modelValue.brandId || 'all',
  category: props.modelValue.category || 'all',
  viscosity: props.modelValue.viscosity || 'all',
});

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal.search !== localFilters.search) localFilters.search = newVal.search || '';
    if (newVal.brandId !== localFilters.brandId) localFilters.brandId = newVal.brandId || 'all';
    if (newVal.category !== localFilters.category) localFilters.category = newVal.category || 'all';
    if (newVal.viscosity !== localFilters.viscosity) localFilters.viscosity = newVal.viscosity || 'all';
  },
  { deep: true }
);

watch(
  localFilters,
  (newVal) => {
    emit('update:modelValue', { ...newVal });
  },
  { deep: true }
);

const brandOptions = [
  { label: 'All Brands', value: 'all' },
  { label: 'Liqui Moly', value: 'liqui-moly' },
  { label: 'Addinol', value: 'addinol' },
  { label: 'Castrol', value: 'castrol' },
];

const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'Engine Oils', value: 'engine' },
  { label: 'Transmission Fluids', value: 'transmission' },
  { label: 'Differential Gear', value: 'differential' },
];

const viscosityOptions = [
  { label: 'All Viscosities', value: 'all' },
  { label: '5W-30', value: '5W-30' },
  { label: '5W-40', value: '5W-40' },
  { label: '10W-60', value: '10W-60' },
  { label: 'ATF Low-Viscosity', value: 'ATF Low-Viscosity' },
  { label: 'DCT / DSG Fluid', value: 'DCT / DSG Fluid' },
  { label: '75W-90', value: '75W-90' },
];

const hasActiveFilters = computed(() => {
  return (
    localFilters.search.trim() !== '' ||
    localFilters.brandId !== 'all' ||
    localFilters.category !== 'all' ||
    localFilters.viscosity !== 'all'
  );
});

const resetFilters = () => {
  localFilters.search = '';
  localFilters.brandId = 'all';
  localFilters.category = 'all';
  localFilters.viscosity = 'all';
};
</script>

<template>
  <div class="rounded-3xl border border-white/10 bg-zinc-900/60 p-4 sm:p-5 backdrop-blur-xl space-y-4">
    <!-- Search Bar with Instant Clear Button -->
    <div class="relative">
      <UIcon name="i-lucide-search" class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
      <input
        v-model="localFilters.search"
        type="text"
        placeholder="Search by oil name, OEM approval (e.g. BMW LL-04, MB 229.51), or car model..."
        class="w-full rounded-2xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/50 transition-all"
        aria-label="Search catalog"
      />
      <button
        v-if="localFilters.search"
        type="button"
        class="absolute right-3 top-1/2 -translate-y-1/2 flex h-6 w-6 items-center justify-center rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
        aria-label="Clear search query"
        @click="localFilters.search = ''"
      >
        <UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Filter Control Groups (Responsive Flow) -->
    <div class="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-3">
      <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
        <!-- Brand Selector Pills -->
        <div class="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/5">
          <button
            v-for="b in brandOptions"
            :key="b.value"
            type="button"
            class="rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all"
            :class="localFilters.brandId === b.value 
              ? 'bg-amber-500 text-black font-semibold shadow' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'"
            @click="localFilters.brandId = b.value"
          >
            {{ b.label }}
          </button>
        </div>

        <!-- Category Filter Pills -->
        <div class="flex flex-wrap items-center gap-1 p-1 rounded-2xl bg-white/5 border border-white/5">
          <button
            v-for="c in categoryOptions"
            :key="c.value"
            type="button"
            class="rounded-xl px-2.5 sm:px-3 py-1.5 text-xs font-medium transition-all"
            :class="localFilters.category === c.value 
              ? 'bg-white/20 text-white font-semibold shadow' 
              : 'text-zinc-400 hover:text-white hover:bg-white/5'"
            @click="localFilters.category = c.value"
          >
            {{ c.label }}
          </button>
        </div>
      </div>

      <div class="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
        <!-- Viscosity Custom Dropdown -->
        <div class="relative inline-flex items-center">
          <select
            v-model="localFilters.viscosity"
            aria-label="Filter by viscosity specification"
            class="appearance-none rounded-2xl border border-white/10 bg-white/5 py-2 pl-3.5 pr-8 text-xs font-medium text-zinc-200 hover:border-white/20 focus:border-amber-500/50 focus:outline-none transition-colors cursor-pointer"
          >
            <option
              v-for="v in viscosityOptions"
              :key="v.value"
              :value="v.value"
              class="bg-zinc-900 text-white"
            >
              {{ v.label }}
            </option>
          </select>
          <UIcon name="i-lucide-chevron-down" class="pointer-events-none absolute right-2.5 w-3.5 h-3.5 text-zinc-400" />
        </div>

        <!-- Reset Filters Action -->
        <button
          v-if="hasActiveFilters"
          type="button"
          class="inline-flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-400/10 border border-amber-500/20 transition-all cursor-pointer"
          @click="resetFilters"
        >
          <UIcon name="i-lucide-rotate-ccw" class="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>
    </div>
  </div>
</template>
