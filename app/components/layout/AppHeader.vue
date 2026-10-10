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

const mobileDrawerRef = ref<HTMLElement | null>(null);
const hamburgerButtonRef = ref<HTMLElement | null>(null);

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

// Handle Escape key to close mobile drawer
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

// Handle clicks or taps outside drawer to dismiss
const handlePointerDownOutside = (event: PointerEvent) => {
  if (!isMobileMenuOpen.value) return;
  const target = event.target as Node | null;
  if (!target) return;

  if (
    mobileDrawerRef.value?.contains(target) ||
    hamburgerButtonRef.value?.contains(target)
  ) {
    return;
  }
  closeMobileMenu();
};

// Close mobile drawer on route change
watch(() => route.path, () => {
  closeMobileMenu();
});

// Control background body scroll lock and listeners when mobile drawer is open
watch(isMobileMenuOpen, (isOpen) => {
  if (typeof document === 'undefined') return;
  if (isOpen) {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('pointerdown', handlePointerDownOutside);
  } else {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('pointerdown', handlePointerDownOutside);
  }
});

const isScrolled = ref(false);

const handleScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 15;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
});

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
    window.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('pointerdown', handlePointerDownOutside);
  }
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 transition-all duration-300 pointer-events-none">
    <div
      class="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-auto"
      :class="isScrolled ? 'pt-[max(0.5rem,env(safe-area-inset-top))] sm:pt-2.5' : 'pt-[max(0.75rem,env(safe-area-inset-top))] sm:pt-4'"
    >
      <div
        class="flex h-13 sm:h-14 items-center justify-between rounded-full border px-3.5 sm:px-5 backdrop-blur-2xl transition-all duration-300"
        :class="isScrolled
          ? 'border-white/20 bg-zinc-950/92 shadow-2xl shadow-black/80 ring-1 ring-amber-500/20'
          : 'border-white/10 bg-zinc-950/75 shadow-xl shadow-black/40'"
      >
        <!-- Brand Logo -->
        <BrandLogo :size="isScrolled ? 'sm' : 'md'" />

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
          ref="hamburgerButtonRef"
          type="button"
          class="flex md:hidden h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition-colors hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
          aria-label="Toggle Navigation Menu"
          :aria-expanded="isMobileMenuOpen"
          aria-controls="mobile-nav-drawer"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <UIcon :name="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Teleported Mobile Navigation Overlay & Drawer -->
    <Teleport to="body">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-[100] md:hidden flex flex-col pointer-events-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation Menu"
      >
        <!-- Backdrop Dimmer Overlay (Tapping closes menu) -->
        <Transition
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-150 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          appear
        >
          <div
            class="fixed inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            aria-label="Close navigation overlay"
            @click="closeMobileMenu"
          />
        </Transition>

        <!-- Mobile Drawer Container -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-3 scale-98"
          enter-to-class="opacity-100 translate-y-0 scale-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0 scale-100"
          leave-to-class="opacity-0 -translate-y-3 scale-98"
          appear
        >
          <div
            id="mobile-nav-drawer"
            ref="mobileDrawerRef"
            class="relative z-10 mx-3 sm:mx-4 mt-[max(0.75rem,env(safe-area-inset-top))] max-w-lg mx-auto w-[calc(100%-1.5rem)] rounded-3xl border border-white/15 bg-zinc-950/98 p-4.5 sm:p-5 backdrop-blur-2xl shadow-2xl shadow-black/95"
            @click.stop
          >
            <!-- Drawer Header with Title & Dedicated Close Button -->
            <div class="flex items-center justify-between pb-3 mb-2.5 border-b border-white/10">
              <div class="flex items-center gap-2">
                <span class="flex h-2 w-2 rounded-full bg-amber-400"></span>
                <span class="text-xs font-bold text-white tracking-wider uppercase font-mono">Navigation Menu</span>
              </div>
              <button
                type="button"
                class="flex h-8.5 w-8.5 items-center justify-center rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 shrink-0"
                aria-label="Close navigation menu"
                @click="closeMobileMenu"
              >
                <UIcon name="i-lucide-x" class="w-4 h-4" />
              </button>
            </div>

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
      </div>
    </Teleport>
  </header>
</template>
