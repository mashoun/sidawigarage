<script setup lang="ts">
/**
 * LocationMap Component
 *
 * Displays Sidawi Garage's physical location, interactive map with mobile scroll-guard,
 * structured Beirut landmarks, one-click copy address action, navigation shortcuts,
 * and real-time operating hours status based on the Asia/Beirut timezone.
 */
import garageData from '~~/content/data/garage.json';

const isMapInteractive = ref(false);
const copied = ref(false);
let copyTimeout: ReturnType<typeof setTimeout> | null = null;

// Full formatted address for one-click clipboard copying
const fullAddressString = computed(() => {
  return `${garageData.address.street}, ${garageData.address.area}, ${garageData.address.city}, ${garageData.address.country}`;
});

/**
 * Copies the physical garage address to the clipboard with tactile visual feedback
 */
const copyAddress = async () => {
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(fullAddressString.value);
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = fullAddressString.value;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    copied.value = true;
    if (copyTimeout) clearTimeout(copyTimeout);
    copyTimeout = setTimeout(() => {
      copied.value = false;
    }, 2200);
  } catch {
    copied.value = false;
  }
};

const mapEmbedUrl = computed(() => {
  const { latitude, longitude } = garageData.address.geo;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.02}%2C${latitude - 0.015}%2C${longitude + 0.02}%2C${latitude + 0.015}&layer=mapnik&marker=${latitude}%2C${longitude}`;
});

// Real-Time Garage Operating Status in Asia/Beirut Timezone
interface GarageStatus {
  isOpen: boolean;
  statusBadge: string;
  detailHint: string;
  activeScheduleIndex: number; // 0 for Mon-Fri, 1 for Sat, 2 for Sun
}

const isClientMounted = ref(false);
const garageStatus = ref<GarageStatus>({
  isOpen: false,
  statusBadge: 'Schedule',
  detailHint: 'Operating Hours Below',
  activeScheduleIndex: -1,
});

/**
 * Computes live open/closed status respecting Lebanon's local business schedule
 */
const updateGarageStatus = () => {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Beirut',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false,
    });

    const parts = formatter.formatToParts(now);
    const weekday = parts.find((p) => p.type === 'weekday')?.value || '';
    const hour = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    const totalMinutes = hour * 60 + minute;

    const isSunday = weekday === 'Sun';
    const isSaturday = weekday === 'Sat';
    const isWeekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);

    if (isSunday) {
      garageStatus.value = {
        isOpen: false,
        statusBadge: 'Closed Today',
        detailHint: 'Opens Monday 8:30 AM',
        activeScheduleIndex: 2,
      };
    } else if (isSaturday) {
      const openMinutes = 8 * 60 + 30; // 08:30
      const closeMinutes = 17 * 60; // 17:00
      const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

      garageStatus.value = {
        isOpen,
        statusBadge: isOpen ? 'Open Now' : 'Closed',
        detailHint: isOpen
          ? 'Closes at 5:00 PM'
          : totalMinutes < openMinutes
            ? 'Opens Today at 8:30 AM'
            : 'Opens Monday at 8:30 AM',
        activeScheduleIndex: 1,
      };
    } else if (isWeekday) {
      const openMinutes = 8 * 60 + 30; // 08:30
      const closeMinutes = 18 * 60 + 30; // 18:30
      const isOpen = totalMinutes >= openMinutes && totalMinutes < closeMinutes;
      const isFriday = weekday === 'Fri';

      garageStatus.value = {
        isOpen,
        statusBadge: isOpen ? 'Open Now' : 'Closed',
        detailHint: isOpen
          ? 'Closes at 6:30 PM'
          : totalMinutes < openMinutes
            ? 'Opens Today at 8:30 AM'
            : isFriday
              ? 'Opens Saturday 8:30 AM'
              : 'Opens Tomorrow 8:30 AM',
        activeScheduleIndex: 0,
      };
    }
  } catch {
    garageStatus.value = {
      isOpen: false,
      statusBadge: 'Hours',
      detailHint: 'Check hours below',
      activeScheduleIndex: -1,
    };
  }
};

let statusTicker: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  isClientMounted.value = true;
  updateGarageStatus();
  statusTicker = setInterval(updateGarageStatus, 60000);
});

onBeforeUnmount(() => {
  if (copyTimeout) clearTimeout(copyTimeout);
  if (statusTicker) clearInterval(statusTicker);
});
</script>

<template>
  <div class="@container rounded-3xl border border-white/10 bg-zinc-900/60 p-5 sm:p-6 backdrop-blur-xl space-y-5">
    <!-- Header with Title & Quick Navigation CTA -->
    <div class="flex items-center justify-between gap-3">
      <div class="flex items-center gap-2.5 min-w-0">
        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20">
          <UIcon name="i-lucide-map-pin" class="w-5 h-5" />
        </div>
        <div class="min-w-0">
          <h3 class="text-base sm:text-lg font-bold text-white tracking-tight truncate">Garage Hub & Directions</h3>
          <p class="text-xs text-zinc-400 truncate">Specialized Lubrication Center • Beirut</p>
        </div>
      </div>

      <a
        :href="garageData.address.googleMapsUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white transition-all shrink-0 border border-white/10 hover:border-amber-400/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <span>Open in Maps</span>
        <UIcon name="i-lucide-arrow-up-right" class="w-3.5 h-3.5 text-amber-400" />
      </a>
    </div>

    <!-- Map Viewport Frame with Dark Vignette & Mobile Scroll-Trap Guard -->
    <div
      class="group relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner"
      @mouseleave="isMapInteractive = false"
    >
      <iframe
        :src="mapEmbedUrl"
        class="w-full h-full border-0 filter invert-[0.9] hue-rotate-180 contrast-125 opacity-90 transition-opacity"
        :class="isMapInteractive ? 'pointer-events-auto' : 'pointer-events-none sm:pointer-events-auto'"
        loading="lazy"
        title="Sidawi Garage Location Map"
      />

      <!-- Location Badge Floating in Map -->
      <div class="pointer-events-none absolute top-3 left-3 z-10 flex items-center gap-2 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/15 px-3 py-1 text-xs text-zinc-200 shadow-xl">
        <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span class="font-semibold text-white">Musharrafieh</span>
        <span class="text-zinc-600">•</span>
        <span class="text-zinc-400">Beirut, Lebanon</span>
      </div>

      <!-- Precision Gradient Vignette to Mask OSM Web Link Clutter -->
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 via-zinc-950/75 to-transparent z-10 flex items-end justify-between px-3.5 pb-2 text-[10px] text-zinc-400">
        <span class="flex items-center gap-1 font-mono text-zinc-400">
          <UIcon name="i-lucide-crosshair" class="w-3 h-3 text-amber-400" />
          <span>{{ garageData.address.geo.latitude }}°N, {{ garageData.address.geo.longitude }}°E</span>
        </span>
        <span class="text-zinc-500 font-medium">© OpenStreetMap</span>
      </div>

      <!-- Mobile Tap-to-Interact Guard Overlay -->
      <button
        v-if="!isMapInteractive"
        type="button"
        class="sm:hidden absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity focus:outline-none"
        aria-label="Tap to enable interactive map navigation"
        @click="isMapInteractive = true"
      >
        <span class="inline-flex items-center gap-2 rounded-full bg-zinc-900/90 border border-white/20 px-4 py-2 text-xs font-semibold text-white shadow-xl">
          <UIcon name="i-lucide-navigation" class="w-3.5 h-3.5 text-amber-400" />
          <span>Tap to pan map</span>
        </span>
      </button>
    </div>

    <!-- Structured Information: Physical Address & Operating Schedule -->
    <div class="grid grid-cols-1 @[540px]:grid-cols-2 gap-3.5">
      <!-- 1. Physical Address Card -->
      <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between gap-3 transition-colors hover:border-white/20">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5 text-amber-400" />
              Physical Address
            </span>

            <!-- Accessible Copy Address Button -->
            <button
              type="button"
              class="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
              :class="copied
                ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'"
              :aria-label="copied ? 'Address copied to clipboard' : 'Copy address to clipboard'"
              @click="copyAddress"
            >
              <UIcon :name="copied ? 'i-lucide-check' : 'i-lucide-copy'" class="w-3 h-3" />
              <span>{{ copied ? 'Copied' : 'Copy' }}</span>
            </button>
          </div>

          <!-- Beirut Landmarks & Street Details -->
          <div class="space-y-1.5">
            <div class="flex flex-wrap items-center gap-1.5">
              <span class="inline-flex items-center gap-1 rounded-md bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 text-[11px] font-semibold text-amber-300">
                <UIcon name="i-lucide-fuel" class="w-3 h-3 shrink-0" />
                <span>Inside Hepco Station</span>
              </span>
              <span class="inline-flex items-center gap-1 rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[11px] font-medium text-zinc-300">
                <UIcon name="i-lucide-landmark" class="w-3 h-3 text-zinc-400 shrink-0" />
                <span>Opp. Galerie Istikbal</span>
              </span>
            </div>

            <p class="text-xs text-zinc-200 font-medium leading-relaxed pt-0.5">
              Sayyed Hadi Highway, Musharrafieh<br />
              <span class="text-zinc-400">Beirut, Lebanon</span>
            </p>
          </div>
        </div>

        <!-- Direction Navigation Quick Links -->
        <div class="flex items-center gap-2 pt-2 border-t border-white/5">
          <a
            :href="garageData.address.googleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 px-2.5 text-[11px] font-semibold text-zinc-200 hover:text-white hover:bg-white/10 hover:border-amber-400/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <UIcon name="i-lucide-map" class="w-3 h-3 text-amber-400" />
            <span>Google Maps</span>
          </a>
          <a
            :href="garageData.address.appleMapsUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="flex-1 inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-1.5 px-2.5 text-[11px] font-semibold text-zinc-200 hover:text-white hover:bg-white/10 hover:border-sky-400/30 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <UIcon name="i-lucide-compass" class="w-3 h-3 text-sky-400" />
            <span>Apple Maps</span>
          </a>
        </div>
      </div>

      <!-- 2. Operating Hours Card -->
      <div class="rounded-2xl border border-white/10 bg-white/[0.03] p-4 flex flex-col justify-between gap-3 transition-colors hover:border-white/20">
        <div class="space-y-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="w-3.5 h-3.5 text-amber-400" />
              Operating Schedule
            </span>

            <!-- Real-Time Dynamic Status Pill -->
            <span
              v-if="isClientMounted"
              class="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-all"
              :class="garageStatus.isOpen
                ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                : 'bg-zinc-800 text-zinc-400 border border-white/10'"
            >
              <span
                class="w-1.5 h-1.5 rounded-full"
                :class="garageStatus.isOpen ? 'bg-emerald-400 animate-pulse' : 'bg-zinc-500'"
              />
              <span>{{ garageStatus.statusBadge }}</span>
            </span>
          </div>

          <!-- Schedule List with Guaranteed No-Wrap Layout -->
          <ul class="space-y-1.5 text-xs" role="list">
            <li
              v-for="(h, idx) in garageData.openingHours"
              :key="h.days"
              class="flex items-center justify-between gap-3 py-1.5 px-2.5 rounded-xl transition-colors"
              :class="isClientMounted && garageStatus.activeScheduleIndex === idx
                ? 'bg-amber-400/10 border border-amber-400/25 text-white'
                : 'border border-transparent bg-white/[0.015] text-zinc-300'"
            >
              <div class="flex items-center gap-2 min-w-0">
                <span class="font-medium truncate">{{ h.days }}</span>
                <span
                  v-if="isClientMounted && garageStatus.activeScheduleIndex === idx"
                  class="shrink-0 rounded-full bg-amber-400/20 border border-amber-400/40 px-1.5 py-0.2 text-[9px] font-bold uppercase tracking-wide text-amber-300"
                >
                  Today
                </span>
              </div>
              <div class="shrink-0">
                <span
                  v-if="h.hours.toLowerCase() === 'closed'"
                  class="inline-flex items-center rounded-md bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400"
                >
                  Closed
                </span>
                <span
                  v-else
                  class="font-mono text-xs font-semibold tracking-tight whitespace-nowrap"
                  :class="isClientMounted && garageStatus.activeScheduleIndex === idx ? 'text-amber-200' : 'text-zinc-300'"
                >
                  {{ h.hours }}
                </span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Schedule Bottom Notice / Status Detail Hint -->
        <div class="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-zinc-400">
          <span class="flex items-center gap-1.5">
            <UIcon name="i-lucide-calendar-days" class="w-3.5 h-3.5 text-zinc-500" />
            <span>Walk-ins & bookings</span>
          </span>
          <span v-if="isClientMounted" class="font-medium text-zinc-300 text-[10px]">
            {{ garageStatus.detailHint }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
