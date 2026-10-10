<script setup lang="ts">
import garageData from '~~/content/data/garage.json';
import { buildWhatsAppBookingUrl } from '~~/shared/utils/whatsapp';

const directWhatsAppUrl = computed(() => {
  return buildWhatsAppBookingUrl(garageData.whatsappNumber, {
    serviceType: 'general',
  });
});
</script>

<template>
  <div class="rounded-3xl border border-white/10 bg-zinc-900/60 p-6 sm:p-8 backdrop-blur-xl space-y-6">
    <div>
      <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 mb-4">
        <span class="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span>Open for Inquiries & Bookings</span>
      </div>
      <div class="flex items-center gap-4">
        <div class="relative h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border-2 border-amber-500/40 shrink-0 shadow-lg bg-zinc-900 group">
          <img
            :src="garageData.ownerImage || '/images/mahmoud-sidawi-avatar.webp'"
            :alt="garageData.owner"
            class="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div>
          <h3 class="text-xl sm:text-2xl font-bold text-white tracking-tight">Connect with Mahmoud Sidawi</h3>
          <p class="text-xs text-zinc-400 mt-1">
            Direct communication with the garage owner. Fast response for oil consultations, OEM approvals, and scheduling.
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Action Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Direct WhatsApp -->
      <a
        :href="directWhatsAppUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 transition-all duration-300 hover:bg-emerald-500/20 hover:border-emerald-500/50"
      >
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500 text-black">
          <UIcon name="i-lucide-message-circle" class="w-6 h-6" />
        </div>
        <div class="min-w-0">
          <h4 class="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">Direct WhatsApp Chat</h4>
          <p class="text-xs text-emerald-400/90 font-mono mt-0.5">{{ garageData.phone }}</p>
          <span class="text-[10px] text-zinc-400">One-tap direct message</span>
        </div>
      </a>

      <!-- VIP WhatsApp Group -->
      <a
        :href="garageData.whatsappGroupUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="group flex items-center gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 transition-all duration-300 hover:bg-amber-500/20 hover:border-amber-500/50"
      >
        <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-black">
          <UIcon name="i-lucide-users" class="w-6 h-6" />
        </div>
        <div class="min-w-0">
          <h4 class="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">VIP WhatsApp Community</h4>
          <p class="text-xs text-amber-300/90 mt-0.5">Sidawi Garage Group</p>
          <span class="text-[10px] text-zinc-400">Join our car care community</span>
        </div>
      </a>
    </div>

    <!-- Direct Line & Email -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
      <a
        :href="`tel:${garageData.phone}`"
        class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <UIcon name="i-lucide-phone" class="w-4 h-4 text-zinc-400" />
        <span class="text-xs font-mono">{{ garageData.phone }}</span>
      </a>

      <a
        :href="`mailto:${garageData.email}`"
        class="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
      >
        <UIcon name="i-lucide-mail" class="w-4 h-4 text-zinc-400" />
        <span class="text-xs font-mono">{{ garageData.email }}</span>
      </a>
    </div>

    <!-- Social Media Channels Bar -->
    <div class="pt-4 border-t border-white/10">
      <span class="text-xs font-medium text-zinc-400 block mb-3">Official Social Media Platforms:</span>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <a
          :href="garageData.socials.tiktok"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <UIcon name="i-lucide-video" class="w-4 h-4 text-amber-400" />
          <span>TikTok</span>
        </a>

        <a
          :href="garageData.socials.instagram"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <UIcon name="i-lucide-instagram" class="w-4 h-4 text-pink-400" />
          <span>Instagram</span>
        </a>

        <a
          :href="garageData.socials.youtube"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <UIcon name="i-lucide-youtube" class="w-4 h-4 text-red-400" />
          <span>YouTube</span>
        </a>

        <a
          :href="garageData.socials.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-2.5 px-3 text-xs text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          <UIcon name="i-lucide-linkedin" class="w-4 h-4 text-sky-400" />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  </div>
</template>
