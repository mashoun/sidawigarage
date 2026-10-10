<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import brandsData from '~~/content/data/brands.json';

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};
</script>

<template>
  <footer class="relative overflow-hidden w-full max-w-full border-t border-white/10 bg-[#060709] pt-16 pb-12 text-zinc-400">
    <!-- Subtle ambient lighting -->
    <div class="ambient-glow -top-32 left-1/4 w-96 h-48 bg-amber-500/10 pointer-events-none" />
    <div class="ambient-glow bottom-0 right-4 w-72 h-32 bg-emerald-500/5 pointer-events-none" />

    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
        <!-- Brand & Mission Column -->
        <div class="md:col-span-1 space-y-4">
          <BrandLogo />
          <p class="text-xs text-zinc-400 leading-relaxed">
            Lebanon's specialized hub for engineered engine & transmission lubrication. Zero compromises, 100% factory OEM specifications.
          </p>

          <!-- Live Workshop Status Badge -->
          <div class="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-400 shadow-sm shadow-emerald-500/5">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
            </span>
            <span>Open for Specialized Services</span>
          </div>

          <!-- Genuine Stock Guarantee Tag -->
          <div class="flex items-center gap-2 text-[11px] text-zinc-400 pt-1">
            <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-amber-400 shrink-0" />
            <span>100% Factory Sealed Drums Guaranteed</span>
          </div>
        </div>

        <!-- Certified Brands (Refined Reseller Cards) -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white">
              Certified Reseller
            </h4>
          </div>
          <p class="text-[11px] text-zinc-400 mb-3 leading-relaxed">
            Officially accredited partner for European benchmark lubricants:
          </p>
          <div class="space-y-2">
            <NuxtLink
              v-for="b in brandsData"
              :key="b.id"
              :to="`/products?brand=${b.id}`"
              class="group flex items-center justify-between p-2 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.06] hover:border-amber-500/30 transition-all duration-200"
            >
              <div class="flex items-center gap-3 min-w-0">
                <!-- Clean white logo capsule with strict containment & zero overflow -->
                <div class="h-7 w-20 shrink-0 bg-white rounded-lg px-2 py-1 flex items-center justify-center shadow-sm border border-slate-200/90 overflow-hidden transition-transform duration-200 group-hover:scale-105">
                  <BrandLogoImage
                    :brand-id="b.id"
                    :with-bg="false"
                    class="h-4.5 w-auto max-w-full max-h-full object-contain"
                  />
                </div>
                <div class="min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors truncate">
                      {{ b.name }}
                    </span>
                    <UIcon name="i-lucide-badge-check" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  </div>
                  <span class="text-[10px] text-zinc-400 block truncate">
                    {{ b.country }} • Official Partner
                  </span>
                </div>
              </div>
              <UIcon
                name="i-lucide-arrow-right"
                class="w-3.5 h-3.5 text-zinc-600 group-hover:text-amber-400 group-hover:translate-x-0.5 transition-all shrink-0 ml-2"
              />
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Navigation -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
          </div>
          <ul class="space-y-2 text-xs">
            <li>
              <NuxtLink to="/products" class="hover:text-amber-300 transition-colors flex items-center gap-2 py-1 group">
                <UIcon name="i-lucide-droplets" class="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                <span>Oil Catalog & Specs</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/videos" class="hover:text-amber-300 transition-colors flex items-center gap-2 py-1 group">
                <UIcon name="i-lucide-film" class="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                <span>Customer Reel Videos</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-amber-300 transition-colors flex items-center gap-2 py-1 group">
                <UIcon name="i-lucide-user-check" class="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                <span>About Mahmoud Sidawi</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="hover:text-amber-300 transition-colors flex items-center gap-2 py-1 group">
                <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-zinc-500 group-hover:text-amber-400 transition-colors" />
                <span>Garage Location & Map</span>
              </NuxtLink>
            </li>
          </ul>

          <!-- VIP WhatsApp Community Card -->
          <a
            :href="garageData.whatsappGroupUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-3.5 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/25 hover:border-emerald-500/50 hover:bg-emerald-500/15 transition-all group"
          >
            <div class="flex items-center gap-2.5">
              <div class="h-8 w-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                <UIcon name="i-lucide-users" class="w-4 h-4" />
              </div>
              <div>
                <span class="text-xs font-bold text-emerald-300 block">Join VIP WhatsApp</span>
                <span class="text-[10px] text-zinc-400 block">Daily oil discussions & stock</span>
              </div>
            </div>
            <UIcon name="i-lucide-arrow-up-right" class="w-4 h-4 text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
          </a>
        </div>

        <!-- Contact & Location Summary -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <span class="h-1.5 w-1.5 rounded-full bg-amber-400"></span>
            <h4 class="text-xs font-bold uppercase tracking-wider text-white">
              Garage Hub
            </h4>
          </div>
          <div class="space-y-2.5 text-xs">
            <!-- Operating Hours (Mon-Fri & Sat accurate schedule) -->
            <div class="flex items-center gap-2 p-2 rounded-xl bg-white/[0.02] border border-white/5 text-zinc-300 text-[11px]">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Mon – Fri: 8:30 AM – 6:30 PM · Sat: 8:30 AM – 5:00 PM</span>
            </div>

            <a
              :href="garageData.address.googleMapsUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-start gap-2 text-zinc-300 hover:text-white transition-colors group"
            >
              <UIcon name="i-lucide-map-pin" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
              <span>{{ garageData.address.street }}, {{ garageData.address.city }}, Lebanon</span>
            </a>
            <p class="flex items-center gap-2 text-zinc-300">
              <UIcon name="i-lucide-phone" class="w-4 h-4 text-amber-400 shrink-0" />
              <a :href="`tel:${garageData.phone}`" class="hover:text-white transition-colors">{{ garageData.phone }}</a>
            </p>
            <p class="flex items-center gap-2 text-zinc-300">
              <UIcon name="i-lucide-mail" class="w-4 h-4 text-amber-400 shrink-0" />
              <a :href="`mailto:${garageData.email}`" class="hover:text-white transition-colors">{{ garageData.email }}</a>
            </p>

            <!-- Social Links with Accessible Touch Targets -->
            <div class="flex items-center gap-2.5 pt-2">
              <a
                :href="garageData.socials.tiktok"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sidawi Garage TikTok"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <UIcon name="i-lucide-video" class="w-4 h-4" />
              </a>
              <a
                :href="garageData.socials.instagram"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sidawi Garage Instagram"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <UIcon name="i-lucide-instagram" class="w-4 h-4" />
              </a>
              <a
                :href="garageData.socials.youtube"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sidawi Garage YouTube"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <UIcon name="i-lucide-youtube" class="w-4 h-4" />
              </a>
              <a
                :href="garageData.socials.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Sidawi Garage LinkedIn"
                class="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <UIcon name="i-lucide-linkedin" class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Bar with Back to Top -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <div class="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 text-center sm:text-left">
          <p>© {{ new Date().getFullYear() }} Sidawi Garage. Specialized Automotive Oils. All rights reserved.</p>
          <span class="text-zinc-700 hidden sm:inline select-none">·</span>
          <a
            href="https://mashoun.com"
            target="_blank"
            class="text-[11px] text-zinc-600/80 hover:text-zinc-400 transition-colors"
          >
            Developed by Mashoun
          </a>
        </div>
        <div class="flex items-center gap-6">
          <span class="text-zinc-500 hidden sm:inline">
            Certified Reseller: Liqui Moly • Addinol • Castrol
          </span>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-zinc-400 hover:text-amber-400 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
            @click="scrollToTop"
          >
            <span>Back to top</span>
            <UIcon name="i-lucide-arrow-up" class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>
