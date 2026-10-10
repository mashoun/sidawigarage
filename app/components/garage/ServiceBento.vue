<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const buildServiceUrl = (serviceType: 'motor_oil' | 'transmission_flush' | 'differential') => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, { serviceType });
};
</script>

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <!-- Header -->
    <div
      v-reveal="{ variant: 'blur-in', delay: 50 }"
      class="text-center max-w-3xl mx-auto mb-16 space-y-4"
    >
      <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
        <span>Exclusive Specialization</span>
      </div>
      <h2 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
        Precision Fluid Disciplines.
      </h2>
      <p class="text-sm sm:text-base text-zinc-400">
        We do not repair bodywork, paint, or install tires. We concentrate 100% of our equipment, research, and expertise on the mechanical heart: motor and transmission lubricants.
      </p>
    </div>

    <!-- Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- 1. Engine Oil Service -->
      <div
        v-reveal="{ variant: 'fade-up', delay: 0 }"
        class="group relative rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-800/80 flex flex-col justify-between"
      >
        <div class="space-y-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <UIcon name="i-lucide-flame" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            Motor & Engine Oil
          </h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Full synthetic and PAO formulations engineered for high thermal loads. Complete oil evacuation, OEM filter replacement with new O-rings, and torque-calibrated pan bolts.
          </p>
          <ul class="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/5">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Exact manufacturer spec matching (LL-04, MB 229.52)</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Optional Pro-Line engine flush & friction additive</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Video reel documentation of oil drainage</span>
            </li>
          </ul>
        </div>

        <a
          :href="buildServiceUrl('motor_oil')"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 block text-center rounded-2xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-all"
        >
          Book Engine Oil Service
        </a>
      </div>

      <!-- 2. Transmission Gear Oil Flush (Hero Bento Card) -->
      <div
        v-reveal="{ variant: 'fade-up', delay: 140 }"
        class="group relative rounded-3xl border border-amber-500/30 bg-gradient-to-b from-zinc-900 via-zinc-900/90 to-zinc-950 p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/60 shadow-xl flex flex-col justify-between"
      >
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-black font-bold">
              <UIcon name="i-lucide-cog" class="w-6 h-6" />
            </div>
            <span class="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
              Signature Discipline
            </span>
          </div>

          <h3 class="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            Transmission Fluid Flush
          </h3>
          <p class="text-xs text-zinc-300 leading-relaxed">
            Automatic (ZF 6/8/9 HP), Dual-Clutch (VW/Audi DSG, BMW M-DKG, Porsche PDK), and Manual transmissions. We perform precision closed-loop fluid exchanges.
          </p>
          <ul class="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/10">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Diagnostic temperature monitoring during fill</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Full torque converter & cooler line evacuation</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Eliminates low-speed gear shudder and delay</span>
            </li>
          </ul>
        </div>

        <a
          :href="buildServiceUrl('transmission_flush')"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 block text-center rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-semibold px-4 py-2.5 text-xs shadow-lg shadow-amber-500/20 transition-all"
        >
          Book Transmission Flush
        </a>
      </div>

      <!-- 3. Differential & Axle Gear Oil -->
      <div
        v-reveal="{ variant: 'fade-up', delay: 280 }"
        class="group relative rounded-3xl border border-white/10 bg-zinc-900/60 p-8 backdrop-blur-xl transition-all duration-300 hover:border-amber-500/40 hover:bg-zinc-800/80 flex flex-col justify-between"
      >
        <div class="space-y-4">
          <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <UIcon name="i-lucide-shield-check" class="w-6 h-6" />
          </div>
          <h3 class="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
            Differential & Transfer Case
          </h3>
          <p class="text-xs text-zinc-400 leading-relaxed">
            Hypoid gears and AWD transfer units endure massive shear force. We replace worn fluid with Addinol 75W-90 and Castrol Syntrax extreme-pressure gear oils.
          </p>
          <ul class="space-y-2 text-xs text-zinc-300 pt-2 border-t border-white/5">
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Magnetic drain plug metal inspection & cleaning</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>AWD & 4x4 transfer case specialty lubrication</span>
            </li>
            <li class="flex items-center gap-2">
              <UIcon name="i-lucide-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>Prevents differential whine & ring gear wear</span>
            </li>
          </ul>
        </div>

        <a
          :href="buildServiceUrl('differential')"
          target="_blank"
          rel="noopener noreferrer"
          class="mt-8 block text-center rounded-2xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 px-4 py-2.5 text-xs font-semibold text-white transition-all"
        >
          Book Differential Service
        </a>
      </div>
    </div>
  </section>
</template>
