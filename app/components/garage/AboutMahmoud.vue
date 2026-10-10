<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
</script>

<template>
  <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
    <div class="rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-900/80 to-zinc-950 p-6 sm:p-12 lg:p-16 backdrop-blur-2xl relative overflow-hidden">
      <!-- Ambient Golden Backlight -->
      <div class="ambient-glow ambient-pulse-glow -top-20 -right-20 w-96 h-96 bg-amber-500 pointer-events-none" />

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

        <!-- Right Visual Feature Card: Creative Master Craftsman Credential Card -->
        <div
          v-reveal="{ variant: 'fade-left', delay: 150 }"
          class="lg:col-span-5"
        >
          <!-- Luxury Obsidian & Gold Outer Halo Frame -->
          <div class="relative rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/40 via-amber-500/10 to-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(245,158,11,0.08)] group overflow-hidden">
            <!-- Inner Glass Card Container -->
            <div class="rounded-[23px] bg-gradient-to-b from-zinc-900/98 via-zinc-950/98 to-black p-5 sm:p-7 space-y-5 sm:space-y-6 relative overflow-hidden backdrop-blur-2xl">
              <!-- Ambient Subtle Golden Corner Bloom (Contained) -->
              <div class="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
              <div class="absolute -bottom-16 -left-16 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

              <!-- Top Credential Ribbon -->
              <div class="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
                <div class="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-amber-400 font-semibold">
                  <UIcon name="i-lucide-award" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Master Craftsman</span>
                </div>
                <div class="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-400">
                  <UIcon name="i-lucide-map-pin" class="w-3 h-3 text-amber-400 shrink-0" />
                  <span>Beirut, LB</span>
                </div>
              </div>

              <!-- Featured Craftsman Portrait Showcase (Large High-Impact Visual) -->
              <div class="relative z-10 space-y-2.5">
                <div class="relative w-full aspect-[3/4] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-zinc-950 group/img">
                  <img
                    :src="garageData.ownerImage || '/images/mahmoud-sidawi.webp'"
                    :alt="`${garageData.owner} - Automotive Tribology Specialist`"
                    class="w-full h-full object-cover object-[center_20%] transition-transform duration-700 group-hover/img:scale-105"
                    loading="lazy"
                  />
                  <!-- Gradient overlays for readability and luxury depth -->
                  <div class="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <div class="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl" />

                  <!-- Floating Identity Caption at bottom of photo -->
                  <div class="absolute bottom-3 inset-x-3 text-left">
                    <h3 class="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-md">
                      {{ garageData.owner }}
                    </h3>
                    <p class="text-xs text-amber-300 font-medium tracking-wide flex items-center gap-1.5 mt-0.5 drop-shadow-sm">
                      <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Automotive Tribology Specialist</span>
                    </p>
                  </div>
                </div>

                <!-- Workshop Location Bar -->
                <div class="flex items-center justify-between text-[11px] text-zinc-400 px-1 pt-0.5">
                  <span class="flex items-center gap-1.5 truncate">
                    <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span class="truncate">Sidawi Garage · Musharrafieh, Beirut</span>
                  </span>
                  <span class="text-emerald-400 font-semibold text-[10px] uppercase tracking-wider shrink-0 ml-2">
                    Verified
                  </span>
                </div>
              </div>

              <!-- 3-Item Instrument Cluster (Precision Metrics Bento) -->
              <div class="grid grid-cols-3 gap-2 relative z-10 text-center">
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-2.5 transition-colors hover:border-amber-500/30">
                  <span class="text-xs sm:text-sm font-extrabold text-amber-400 block font-mono">100%</span>
                  <span class="text-[10px] text-zinc-400 block mt-0.5 leading-tight">Factory Sealed</span>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-2.5 transition-colors hover:border-amber-500/30">
                  <span class="text-xs sm:text-sm font-extrabold text-amber-400 block font-mono">Euro-6</span>
                  <span class="text-[10px] text-zinc-400 block mt-0.5 leading-tight">HTHS Certified</span>
                </div>
                <div class="rounded-xl border border-white/10 bg-white/[0.03] p-2 sm:p-2.5 transition-colors hover:border-amber-500/30">
                  <span class="text-xs sm:text-sm font-extrabold text-amber-400 block font-mono">0-Defect</span>
                  <span class="text-[10px] text-zinc-400 block mt-0.5 leading-tight">Closed Flush</span>
                </div>
              </div>

              <!-- Certified Manufacturer Partnerships (High-Contrast Frosted Pills) -->
              <div class="rounded-2xl border border-white/10 bg-white/[0.02] p-3.5 sm:p-4 relative z-10 space-y-2.5">
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-1.5 font-semibold text-zinc-300">
                    <UIcon name="i-lucide-badge-check" class="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Authorized Partner Brands</span>
                  </div>
                  <span class="text-[10px] font-mono text-zinc-400">Direct Importer</span>
                </div>

                <div class="grid grid-cols-3 gap-2">
                  <NuxtLink
                    to="/products?brand=liqui-moly"
                    title="Liqui Moly Authorized Reseller"
                    class="h-9 sm:h-10 bg-zinc-900/90 rounded-xl p-1.5 flex items-center justify-center border border-white/15 hover:border-amber-400/50 hover:bg-zinc-800 transition-all hover:scale-[1.03] group/brand"
                  >
                    <BrandLogoImage brand-id="liqui-moly" :with-bg="false" class="h-5 sm:h-6 w-auto max-w-full max-h-full object-contain filter group-hover/brand:brightness-110" />
                  </NuxtLink>
                  <NuxtLink
                    to="/products?brand=addinol"
                    title="Addinol Authorized Reseller"
                    class="h-9 sm:h-10 bg-zinc-900/90 rounded-xl p-1.5 flex items-center justify-center border border-white/15 hover:border-amber-400/50 hover:bg-zinc-800 transition-all hover:scale-[1.03] group/brand"
                  >
                    <BrandLogoImage brand-id="addinol" :with-bg="false" class="h-5 sm:h-6 w-auto max-w-full max-h-full object-contain filter group-hover/brand:brightness-110" />
                  </NuxtLink>
                  <NuxtLink
                    to="/products?brand=castrol"
                    title="Castrol Authorized Reseller"
                    class="h-9 sm:h-10 bg-zinc-900/90 rounded-xl p-1.5 flex items-center justify-center border border-white/15 hover:border-amber-400/50 hover:bg-zinc-800 transition-all hover:scale-[1.03] group/brand"
                  >
                    <BrandLogoImage brand-id="castrol" :with-bg="false" class="h-5 sm:h-6 w-auto max-w-full max-h-full object-contain filter group-hover/brand:brightness-110" />
                  </NuxtLink>
                </div>
              </div>

              <!-- Vehicle Coverage & Specialization -->
              <div class="rounded-2xl border border-white/10 bg-white/[0.02] p-3 sm:p-3.5 relative z-10 space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <div class="flex items-center gap-1.5 text-zinc-300 font-semibold">
                    <UIcon name="i-lucide-car" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Specialized Marque Servicing</span>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
                    <span>🇩🇪</span> German
                  </span>
                  <span class="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
                    <span>🇯🇵</span> Japanese
                  </span>
                  <span class="inline-flex items-center gap-1 rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 text-[11px] font-medium text-zinc-200">
                    <span>🇺🇸</span> American
                  </span>
                  <span class="inline-flex items-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/20 px-2 py-1 text-[10px] font-medium text-amber-300">
                    <span>⚙️</span> ZF & DSG Fluid
                  </span>
                </div>
              </div>

              <!-- Craftsman Guarantee Quote -->
              <div class="relative z-10 px-3 py-2 rounded-xl bg-amber-500/5 border border-amber-500/15 text-[11px] text-amber-200/90 italic flex items-center gap-2">
                <UIcon name="i-lucide-quote" class="w-3.5 h-3.5 text-amber-400 shrink-0 not-italic opacity-80" />
                <span>"No generic drums, zero bulk blends. Only authentic factory-sealed containers."</span>
              </div>

              <!-- Action CTAs: Direct Consultation & Garage Location -->
              <div class="pt-1 flex flex-col sm:flex-row gap-2.5 relative z-10">
                <a
                  :href="`https://wa.me/${garageData.whatsappNumber}?text=Hello%20Mahmoud,%20I%20would%20like%20to%20consult%20about%20precision%20oil%20service%20for%20my%20car`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-4 py-3 text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <UIcon name="i-lucide-message-circle" class="w-4 h-4 fill-zinc-950" />
                  <span>WhatsApp Mahmoud Directly</span>
                </a>
                <NuxtLink
                  to="/contact"
                  class="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 hover:bg-white/10 text-white font-semibold px-4 py-3 text-xs transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  <span>Visit Workshop</span>
                  <UIcon name="i-lucide-arrow-right" class="w-3.5 h-3.5 text-zinc-400" />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
