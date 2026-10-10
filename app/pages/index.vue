<script setup lang="ts">
import { useCatalog } from '~~/app/composables/useCatalog';
import { useVideoReels } from '~~/app/composables/useVideoReels';
import { useJsonLd } from '~~/app/composables/useJsonLd';
import { testimonialRepo } from '~~/shared/infrastructure/staticJsonRepositories';
import type { VideoReel, Brand } from '~~/shared/domain/models';

const { featuredProducts, brands } = useCatalog();
const { featuredReels } = useVideoReels();
const testimonials = computed(() => testimonialRepo.getAllTestimonials());
const { getGarageSchema } = useJsonLd();

// Inline playing reel state
const activePlayingReelId = ref<string | null>(null);

const handlePlayReel = (reel: VideoReel) => {
  activePlayingReelId.value = reel.id;
};

const handleStopReel = () => {
  activePlayingReelId.value = null;
};

// Selected certificate modal state
const selectedCertificateBrand = ref<Brand | null>(null);

const openCertificateModal = (brand: Brand) => {
  selectedCertificateBrand.value = brand;
};

const closeCertificateModal = () => {
  selectedCertificateBrand.value = null;
};

// SEO Head Configuration
useHead({
  title: 'Sidawi Garage | Specialized Motor & Transmission Oil Services in Lebanon',
  meta: [
    {
      name: 'description',
      content:
        'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in engineered motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
    },
    { property: 'og:title', content: 'Sidawi Garage | Specialized Motor & Transmission Oil Services in Lebanon' },
    {
      property: 'og:description',
      content:
        'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in engineered motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
    },
    { property: 'og:url', content: 'https://sidawigarage.com/' },
    { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Sidawi Garage | Specialized Motor & Transmission Oil Services in Lebanon' },
    {
      name: 'twitter:description',
      content:
        'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in engineered motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
    },
    { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sidawigarage.com/' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(getGarageSchema()),
    },
  ],
});
</script>

<template>
  <div>
    <!-- 1. Hero Section with Interactive WebGL Canvas -->
    <HeroSection />

    <!-- 2. Certified Oil Reseller Credentials Section -->
    <section class="py-16 sm:py-20 border-y border-white/5 bg-zinc-950/60 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div
          v-reveal="{ variant: 'fade-up', delay: 40 }"
          class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
        >
          <div>
            <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
              <UIcon name="i-lucide-shield-check" class="w-3.5 h-3.5 text-amber-400" />
              <span>100% Authentic Manufacturer Direct Supply</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Official Reseller Accreditations.
            </h2>
            <p class="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
              Certified by German & UK lubricant manufacturers. Click any certificate to inspect full authorized workshop credentials in all-screen mode.
            </p>
          </div>

          <div class="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span class="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Verified Partnership 2026</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BrandPartnerBadge
            v-for="(b, idx) in brands"
            :key="b.id"
            :brand="b"
            v-reveal="{ variant: 'fade-up', delay: idx * 130 }"
            @view-certificate="openCertificateModal"
          />
        </div>
      </div>
    </section>

    <!-- 3. Specialized Fluid Disciplines Bento -->
    <ServiceBento />

    <!-- 4. The Craftsman Spotlight: Mahmoud Sidawi -->
    <AboutMahmoud />

    <!-- 5. Featured Oil Stock Highlights -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div
        v-reveal="{ variant: 'fade-up', delay: 40 }"
        class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 mb-3">
            <span>Verified Fresh Inventory</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            High-Performance Stock.
          </h2>
          <p class="text-xs sm:text-sm text-zinc-400 mt-1">
            German & UK formulations in stock for immediate service at Sidawi Garage.
          </p>
        </div>

        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
        >
          <span>View All Available Oils & Specs</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProductCard
          v-for="(product, idx) in featuredProducts.slice(0, 6)"
          :key="product.id"
          :product="product"
          v-reveal="{ variant: 'fade-up', delay: (idx % 3) * 110 + Math.floor(idx / 3) * 60 }"
        />
      </div>
    </section>

    <!-- 6. Client Reel Videos Showcase (Dynamic Social Feeds) -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div
        v-reveal="{ variant: 'fade-up', delay: 40 }"
        class="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full border border-pink-500/30 bg-pink-500/10 px-3 py-1 text-xs font-semibold text-pink-300 mb-3">
            <UIcon name="i-lucide-film" class="w-3.5 h-3.5" />
            <span>Process Transparency</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Client Reels & Fluid Diagnostics.
          </h2>
          <p class="text-xs sm:text-sm text-zinc-400 mt-1">
            Short reel recordings of our closed-loop flushes and oil servicing for client cars.
          </p>
        </div>

        <NuxtLink
          to="/videos"
          class="inline-flex items-center gap-2 text-xs font-semibold text-pink-400 hover:text-pink-300 transition-colors"
        >
          <span>Explore All Client Reels</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ReelCard
          v-for="(reel, idx) in featuredReels.slice(0, 6)"
          :key="reel.id"
          :reel="reel"
          v-reveal="{ variant: 'zoom-in', delay: (idx % 3) * 100 }"
          :is-playing="activePlayingReelId === reel.id"
          @play="handlePlayReel"
          @stop="handleStopReel"
        />
      </div>
    </section>

    <!-- 7. Wall of Trust: Client Testimonials -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div
        v-reveal="{ variant: 'blur-in', delay: 40 }"
        class="text-center max-w-2xl mx-auto mb-16 space-y-3"
      >
        <div class="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300">
          <span>Client Feedback</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          The Wall of Client Trust.
        </h2>
        <p class="text-xs sm:text-sm text-zinc-400">
          Verified car owners in Lebanon sharing their driving experience after precision lubrication.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TestimonialCard
          v-for="(t, idx) in testimonials"
          :key="t.id"
          :testimonial="t"
          v-reveal="{ variant: 'fade-up', delay: (idx % 2) * 130 }"
        />
      </div>
    </section>

    <!-- 8. Garage Hub & Map Section -->
    <section class="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div
          v-reveal="{ variant: 'fade-right', delay: 50 }"
          class="lg:col-span-7"
        >
          <ContactHub />
        </div>
        <div
          v-reveal="{ variant: 'fade-left', delay: 180 }"
          class="lg:col-span-5"
        >
          <LocationMap />
        </div>
      </div>
    </section>

    <!-- All-Screen Certificate Modal -->
    <CertificateModal :brand="selectedCertificateBrand" @close="closeCertificateModal" />
  </div>
</template>
