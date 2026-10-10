<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
</script>

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
    <div class="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-12 lg:p-16 backdrop-blur-2xl relative overflow-hidden">
      <!-- Ambient Golden Backlight -->
      <div class="ambient-glow ambient-pulse-glow -top-20 -right-20 w-96 h-96 bg-amber-500" />

      <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        <!-- Text Column -->
        <div
          v-reveal="{ variant: 'fade-right', delay: 50 }"
          class="lg:col-span-7 space-y-6"
        >
          <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
            <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5" />
            <span>The Craftsman Behind Sidawi Garage</span>
          </div>

          <h2 class="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            "Engine oil isn't just fluid. <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">It is the lifeblood of precision engineering.</span>"
          </h2>

          <p class="text-sm sm:text-base text-zinc-300 leading-relaxed">
            Founded by <strong class="text-white">Mahmoud Sidawi</strong>, Sidawi Garage was established with a singular, uncompromising vision: to elevate automotive lubrication from a hurried generic service into an exacting science.
          </p>

          <!-- Expandable Narrative Paragraph with Read More -->
          <ExpandableText
            text="In an automotive climate filled with generic oils and unverified counterfeit drums, Mahmoud pursued rigorous training in automotive tribology, High-Temperature High-Shear (HTHS) dynamics, and modern Euro-6 emissions requirements. Today, Sidawi Garage is an officially recognized certified reseller for the world's benchmark lubricant manufacturers: Liqui Moly, Addinol, and Castrol."
            :clamp-lines="2"
            :threshold-length="130"
            text-class="text-sm sm:text-base text-zinc-400 leading-relaxed"
          />

          <!-- Core Pillars Bento -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 pt-2">
            <div
              v-reveal="{ variant: 'fade-up', delay: 150 }"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06]"
            >
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-emerald-400" />
                <span class="text-amber-400 text-lg font-bold block">100%</span>
              </div>
              <span class="text-xs text-zinc-200 font-semibold block">Authenticity Guarantee</span>
              <p class="text-[11px] text-zinc-400 mt-1 leading-relaxed">Direct importer batches with verified German and UK provenance.</p>
            </div>
            <div
              v-reveal="{ variant: 'fade-up', delay: 250 }"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06]"
            >
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-lucide-gauge" class="w-4 h-4 text-amber-400" />
                <span class="text-amber-400 text-lg font-bold block">Micron</span>
              </div>
              <span class="text-xs text-zinc-200 font-semibold block">Torque & Temp Accuracy</span>
              <p class="text-[11px] text-zinc-400 mt-1 leading-relaxed">Calibrated torque on every filter cap; thermal monitoring on gearboxes.</p>
            </div>
            <div
              v-reveal="{ variant: 'fade-up', delay: 350 }"
              class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-amber-500/30 hover:bg-white/[0.06]"
            >
              <div class="flex items-center gap-2 mb-1.5">
                <UIcon name="i-lucide-video" class="w-4 h-4 text-sky-400" />
                <span class="text-amber-400 text-lg font-bold block">Video Log</span>
              </div>
              <span class="text-xs text-zinc-200 font-semibold block">Client Reel Transparency</span>
              <p class="text-[11px] text-zinc-400 mt-1 leading-relaxed">Every major job is recorded so owners see the exact fluid drained and filled.</p>
            </div>
          </div>
        </div>

        <!-- Right Visual Feature Card (Responsive Mobile Layout) -->
        <div
          v-reveal="{ variant: 'fade-left', delay: 150 }"
          class="lg:col-span-5"
        >
          <div class="relative rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/30 via-white/10 to-white/5 shadow-2xl shadow-black/80 group">
            <div class="rounded-[23px] bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black p-6 sm:p-7 space-y-6 relative overflow-hidden backdrop-blur-2xl">
              <!-- Subtle ambient corner glow -->
              <div class="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <!-- Profile Header -->
              <div class="flex items-center gap-4 relative z-10">
                <div class="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400/20 via-zinc-900 to-black border border-amber-500/40 shadow-inner group-hover:border-amber-400/60 transition-colors">
                  <span class="text-2xl font-black tracking-wider bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent select-none">MS</span>
                  <span class="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 ring-2 ring-zinc-900 shadow" title="Certified Specialist">
                    <UIcon name="i-lucide-check" class="w-3 h-3 stroke-[3]" />
                  </span>
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-2">
                    <h3 class="text-lg sm:text-xl font-extrabold text-white truncate tracking-tight">{{ garageData.owner }}</h3>
                    <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Verified
                    </span>
                  </div>
                  <p class="text-xs text-amber-400 font-medium tracking-wide flex items-center gap-1.5 mt-0.5">
                    <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Automotive Oil & Transmission Specialist</span>
                  </p>
                  <p class="text-[11px] text-zinc-400 flex items-center gap-1.5 mt-1">
                    <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>Sidawi Garage • Musharrafieh, Beirut</span>
                  </p>
                </div>
              </div>

              <!-- Key Specs with Structured Glass Containers -->
              <div class="space-y-2.5 pt-2 relative z-10 text-xs">
                <!-- Specialization -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div class="flex items-center gap-2 text-zinc-400 font-medium">
                    <UIcon name="i-lucide-droplets" class="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Specialization:</span>
                  </div>
                  <span class="font-medium text-white sm:text-right">Motor Oils & Transmission Gear Fluids</span>
                </div>

                <!-- Certified Reseller Badges -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div class="flex items-center gap-2 text-zinc-400 font-medium">
                    <UIcon name="i-lucide-badge-check" class="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Certified Reseller:</span>
                  </div>
                  <div class="flex items-center gap-2 sm:justify-end flex-wrap">
                    <NuxtLink
                      to="/products?brand=liqui-moly"
                      title="Liqui Moly Certified Partner"
                      class="h-8 w-20 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 hover:shadow-md transition-all overflow-hidden"
                    >
                      <BrandLogoImage brand-id="liqui-moly" :with-bg="false" class="h-5 w-auto max-w-full max-h-full object-contain" />
                    </NuxtLink>
                    <NuxtLink
                      to="/products?brand=addinol"
                      title="Addinol Certified Partner"
                      class="h-8 w-20 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 hover:shadow-md transition-all overflow-hidden"
                    >
                      <BrandLogoImage brand-id="addinol" :with-bg="false" class="h-5 w-auto max-w-full max-h-full object-contain" />
                    </NuxtLink>
                    <NuxtLink
                      to="/products?brand=castrol"
                      title="Castrol Certified Partner"
                      class="h-8 w-20 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 hover:shadow-md transition-all overflow-hidden"
                    >
                      <BrandLogoImage brand-id="castrol" :with-bg="false" class="h-5 w-auto max-w-full max-h-full object-contain" />
                    </NuxtLink>
                  </div>
                </div>

                <!-- Service Coverage -->
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                  <div class="flex items-center gap-2 text-zinc-400 font-medium">
                    <UIcon name="i-lucide-car" class="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Service Coverage:</span>
                  </div>
                  <div class="flex items-center gap-1.5 flex-wrap sm:justify-end">
                    <span class="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">German</span>
                    <span class="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">Japanese</span>
                    <span class="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">American</span>
                  </div>
                </div>
              </div>

              <!-- Action CTAs -->
              <div class="pt-2 flex flex-col sm:flex-row gap-2.5 relative z-10">
                <NuxtLink
                  to="/contact"
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold px-4 py-3 text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                >
                  <span>Visit Sidawi Garage</span>
                  <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </NuxtLink>
                <a
                  :href="`https://wa.me/${garageData.whatsappNumber}?text=Hello%20Mahmoud,%20I%20would%20like%20to%20consult%20about%20my%20car%20oil`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 hover:border-emerald-500/50 text-emerald-400 hover:text-emerald-300 px-4 py-3 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <UIcon name="i-lucide-message-circle" class="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
