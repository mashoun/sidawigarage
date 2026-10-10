<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const isMobileMenuOpen = ref(false);
const route = useRoute();

const navLinks = [
  { label: 'Oil Catalog', path: '/products', icon: 'i-lucide-droplets' },
  { label: 'Client Reels', path: '/videos', icon: 'i-lucide-film' },
  { label: 'The Craftsman', path: '/about', icon: 'i-lucide-award' },
  { label: 'Garage & Map', path: '/contact', icon: 'i-lucide-map-pin' },
];

const whatsAppUrl = computed(() => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    serviceType: 'general',
  });
});

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Handle Escape key to close mobile drawer
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Close mobile drawer on route change
watch(() => route.path, () => {
  closeMobileMenu();
});

// Control background body scroll lock when mobile drawer is open
watch(isMobileMenuOpen, (isOpen) => {
  if (typeof document === 'undefined') return;
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-3">
      <div class="flex h-14 items-center justify-between rounded-full border border-white/10 bg-zinc-950/70 px-5 backdrop-blur-2xl shadow-xl shadow-black/40">
        <!-- Brand Logo -->
        <BrandLogo />

        <!-- Desktop Navigation Links (Apple Clean Minimalist Style) -->
        <nav class="hidden md:flex items-center gap-1" aria-label="Main Navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-200"
            :class="route.path === link.path ? 'bg-white/10 text-white font-semibold' : 'text-zinc-400 hover:text-white hover:bg-white/5'"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Right Quick Actions -->
        <div class="hidden sm:flex items-center gap-3">
          <a
            :href="whatsAppUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-medium text-emerald-400 transition-all duration-200 hover:bg-emerald-500/20 hover:border-emerald-500/50"
          >
            <UIcon name="i-lucide-message-circle" class="w-3.5 h-3.5" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        <!-- Mobile Menu Hamburger Button (44px Accessible Touch Target) -->
        <button
          type="button"
          class="flex md:hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          aria-label="Toggle Navigation Menu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-drawer"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <UIcon :name="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Mobile Backdrop Dimmer Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/70 backdrop-blur-md md:hidden"
        aria-hidden="true"
        @click="closeMobileMenu"
      />
    </Transition>

    <!-- Mobile Drawer Container -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px] scale-98"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-[-10px] scale-98"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-nav-drawer"
        class="relative z-50 md:hidden mx-4 mt-2 rounded-2xl border border-white/15 bg-zinc-950/95 p-4 backdrop-blur-2xl shadow-2xl"
      >
        <nav class="flex flex-col gap-1.5" aria-label="Mobile Navigation">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors"
            :class="route.path === link.path ? 'bg-amber-500/10 text-amber-400 font-semibold border border-amber-500/20' : 'text-zinc-300 hover:bg-white/5 hover:text-white'"
            @click="closeMobileMenu"
          >
            <UIcon :name="link.icon" class="w-4 h-4 text-zinc-400" />
            <span>{{ link.label }}</span>
          </NuxtLink>

          <div class="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2">
            <a
              :href="whatsAppUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/25 transition-colors"
            >
              <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
              <span>WhatsApp Mahmoud Directly</span>
            </a>
            <a
              :href="`tel:${garageData.phone}`"
              class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-medium text-zinc-300 hover:bg-white/10 transition-colors"
            >
              <UIcon name="i-lucide-phone" class="w-3.5 h-3.5 text-zinc-400" />
              <span>Call {{ garageData.phone }}</span>
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
