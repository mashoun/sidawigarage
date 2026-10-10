<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import brandsData from '~~/content/data/brands.json';
import { useJsonLd } from '~~/app/composables/useJsonLd';
import type { Brand } from '~~/shared/domain/models';

const { getBreadcrumbSchema } = useJsonLd();

// Certificate modal state
const selectedCertificateBrand = ref<Brand | null>(null);

const openCertificateModal = (brand: Brand) => {
  selectedCertificateBrand.value = brand;
};

const closeCertificateModal = () => {
  selectedCertificateBrand.value = null;
};

useHead({
  title: 'About Mahmoud Sidawi & The Oil Lab | Sidawi Garage',
  meta: [
    {
      name: 'description',
      content:
        'Learn about Mahmoud Sidawi, his deep education in automotive lubrication, and why Sidawi Garage is the certified benchmark for Liqui Moly, Addinol, and Castrol in Lebanon.',
    },
    { property: 'og:title', content: 'About Mahmoud Sidawi & The Oil Lab | Sidawi Garage' },
    {
      property: 'og:description',
      content:
        'Learn about Mahmoud Sidawi, his deep education in automotive lubrication, and why Sidawi Garage is the certified benchmark for Liqui Moly, Addinol, and Castrol in Lebanon.',
    },
    { property: 'og:url', content: 'https://sidawigarage.com/about' },
    { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'About Mahmoud Sidawi & The Oil Lab | Sidawi Garage' },
    {
      name: 'twitter:description',
      content:
        'Learn about Mahmoud Sidawi, his deep education in automotive lubrication, and why Sidawi Garage is the certified benchmark for Liqui Moly, Addinol, and Castrol in Lebanon.',
    },
    { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sidawigarage.com/about' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About Mahmoud Sidawi', path: '/about' },
        ])
      ),
    },
  ],
});
</script>

<template>
  <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
    <!-- Header -->
    <div class="max-w-3xl space-y-4">
      <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300">
        <UIcon name="i-lucide-award" class="w-3.5 h-3.5" />
        <span>Automotive Lubricant Authority</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
        The Philosophy of Precision.
      </h1>
      <p class="text-base text-zinc-300 leading-relaxed">
        Why <strong class="text-white">Mahmoud Sidawi</strong> chose to dedicate his life exclusively to the science of motor and transmission oils.
      </p>
    </div>

    <!-- Editorial Story Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      <div class="lg:col-span-8 space-y-6 text-sm text-zinc-300 leading-relaxed">
        <h2 class="text-2xl font-bold text-white tracking-tight">
          Beyond the Conventional Oil Change
        </h2>
        <p>
          In typical garages, an oil change is treated as an afterthought—an inexpensive procedure completed in ten minutes using whatever bulk barrel is cheapest. Filters are over-torqued by hand, washer seals are reused, and transmissions are completely ignored until they fail.
        </p>
        <ExpandableText
          text="Mahmoud Sidawi recognized that modern high-compression engines, twin-scroll turbochargers, and complex multi-clutch automatic gearboxes operate under brutal thermal stress. Using incorrect viscosity or counterfeit lubricants directly causes timing chain stretch, valve-train scoring, mechatronic failure, and clogged particulate filters."
          :clamp-lines="3"
          :threshold-length="140"
          text-class="text-sm text-zinc-300 leading-relaxed"
        />

        <h3 class="text-xl font-bold text-amber-400 pt-4">
          Certified Reseller Accreditation
        </h3>
        <p>
          To protect clients against the flood of counterfeit lubricants in the regional market, Mahmoud built direct relationships with official authorized importers, earning certified reseller status in Lebanon for:
        </p>

        <!-- Brand Cards with Real Logos on White BG -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div
            v-for="b in brandsData"
            :key="b.id"
            class="rounded-2xl border border-white/10 bg-zinc-900/60 p-4.5 flex flex-col justify-between group hover:border-amber-500/30 transition-all hover:bg-zinc-800/60"
          >
            <div>
              <div class="h-11 w-32 bg-white rounded-xl p-2 flex items-center justify-center mb-3.5 shadow-md border border-slate-200 overflow-hidden">
                <BrandLogoImage :brand-id="b.id" :with-bg="false" class="h-7 w-auto max-w-[110px] object-contain" />
              </div>
              <h4 class="font-bold text-white text-sm">{{ b.name }}</h4>
              <span class="text-[11px] text-amber-400 font-mono block mt-0.5">{{ b.country }}</span>
              <p class="text-xs text-zinc-400 mt-2 leading-relaxed">{{ b.tagline }}</p>
            </div>

            <!-- Inspect Official Certificate CTA Button -->
            <button
              v-if="b.certificateImage"
              type="button"
              class="mt-4 w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:text-amber-200 text-xs font-semibold py-2 px-3 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              @click="openCertificateModal(b as unknown as Brand)"
            >
              <UIcon name="i-lucide-award" class="w-3.5 h-3.5 text-amber-400" />
              <span>Inspect Certificate</span>
              <UIcon name="i-lucide-maximize-2" class="w-3 h-3 opacity-70" />
            </button>
          </div>
        </div>

        <h3 class="text-xl font-bold text-white pt-6">
          The 0-Defect Standard
        </h3>
        <p>
          Every car that enters Sidawi Garage undergoes a standardized inspection protocol:
        </p>
        <ul class="space-y-2.5 text-xs text-zinc-300">
          <li class="flex items-start gap-2.5">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Spectrophotometric inspection:</strong> Evaluation of old oil clarity and smell to detect fuel dilution or premature wear.</span>
          </li>
          <li class="flex items-start gap-2.5">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Diagnostic temperature leveling:</strong> Automatic transmission gearboxes (ZF 8HP / DSG) are filled strictly within their designated 35°C–45°C thermal calibration window.</span>
          </li>
          <li class="flex items-start gap-2.5">
            <UIcon name="i-lucide-check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Digital torque wrench verification:</strong> Guaranteed factory torque on drain plugs, crush washers, and oil filter housings to prevent stripped threads and housing cracks.</span>
          </li>
        </ul>
      </div>

      <!-- Right Column: Profile & Credentials Card (Mobile Ergonomic Layout) -->
      <div class="lg:col-span-4">
        <div class="relative rounded-3xl p-[1px] bg-gradient-to-b from-amber-500/30 via-white/10 to-white/5 shadow-2xl shadow-black/80 group">
          <div class="rounded-[23px] bg-gradient-to-b from-zinc-900/95 via-zinc-950/95 to-black p-6 sm:p-7 space-y-6 relative overflow-hidden backdrop-blur-2xl">
            <!-- Subtle ambient corner glow -->
            <div class="absolute -top-16 -right-16 w-36 h-36 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <!-- Profile Header -->
            <div class="text-center relative z-10">
              <div class="relative mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400/20 via-zinc-900 to-black border border-amber-500/40 shadow-inner group-hover:border-amber-400/60 transition-colors">
                <span class="text-3xl font-black tracking-wider bg-gradient-to-br from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent select-none">MS</span>
                <span class="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-zinc-950 ring-2 ring-zinc-900 shadow" title="Certified Specialist">
                  <UIcon name="i-lucide-check" class="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
              <div class="flex items-center justify-center gap-2">
                <h3 class="text-xl font-extrabold text-white tracking-tight">{{ garageData.owner }}</h3>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <span class="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Verified
                </span>
              </div>
              <p class="text-xs text-amber-400 font-medium tracking-wide flex items-center justify-center gap-1.5 mt-1">
                <UIcon name="i-lucide-wrench" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Automotive Oil & Transmission Specialist</span>
              </p>
              <p class="text-xs text-zinc-400 mt-1">Founder, Sidawi Garage</p>
            </div>

            <!-- Structured Spec Rows -->
            <div class="space-y-2.5 pt-2 border-t border-white/10 text-xs relative z-10">
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div class="flex items-center gap-2 text-zinc-400 font-medium">
                  <UIcon name="i-lucide-badge-check" class="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Certified Brands:</span>
                </div>
                <div class="flex items-center gap-1.5 sm:justify-end flex-wrap">
                  <NuxtLink
                    to="/products?brand=liqui-moly"
                    title="Liqui Moly Certified Partner"
                    class="h-8 w-18 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 transition-transform overflow-hidden"
                  >
                    <BrandLogoImage brand-id="liqui-moly" :with-bg="false" class="h-4.5 w-auto max-w-full max-h-full object-contain" />
                  </NuxtLink>
                  <NuxtLink
                    to="/products?brand=addinol"
                    title="Addinol Certified Partner"
                    class="h-8 w-18 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 transition-transform overflow-hidden"
                  >
                    <BrandLogoImage brand-id="addinol" :with-bg="false" class="h-4.5 w-auto max-w-full max-h-full object-contain" />
                  </NuxtLink>
                  <NuxtLink
                    to="/products?brand=castrol"
                    title="Castrol Certified Partner"
                    class="h-8 w-18 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 hover:scale-105 transition-transform overflow-hidden"
                  >
                    <BrandLogoImage brand-id="castrol" :with-bg="false" class="h-4.5 w-auto max-w-full max-h-full object-contain" />
                  </NuxtLink>
                </div>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div class="flex items-center gap-2 text-zinc-400 font-medium">
                  <UIcon name="i-lucide-droplets" class="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Service Focus:</span>
                </div>
                <span class="text-white font-medium sm:text-right">Motor & Gearbox Fluids</span>
              </div>

              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                <div class="flex items-center gap-2 text-zinc-400 font-medium">
                  <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Location:</span>
                </div>
                <span class="text-zinc-300 sm:text-right">{{ garageData.address.city }}, Lebanon</span>
              </div>
            </div>

            <!-- Action CTAs -->
            <div class="pt-2 flex flex-col sm:flex-row gap-2.5 relative z-10">
              <NuxtLink
                to="/contact"
                class="flex-1 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-zinc-950 font-bold px-4 py-3 text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
              >
                <span>Contact Mahmoud Sidawi</span>
                <UIcon name="i-lucide-arrow-right" class="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </NuxtLink>
              <a
                :href="`https://wa.me/${garageData.whatsappNumber}?text=Hello%20Mahmoud,%20I%20would%20like%20to%20inquire%20about%20your%20services`"
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

    <!-- All-Screen Certificate Modal -->
    <CertificateModal
      :brand="selectedCertificateBrand"
      @close="closeCertificateModal"
    />
  </div>
</template>
