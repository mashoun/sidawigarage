<script setup lang="ts">
import { useJsonLd } from '~~/app/composables/useJsonLd';

const { getGarageSchema, getBreadcrumbSchema } = useJsonLd();

useHead({
  title: 'Contact Mahmoud Sidawi & Garage Map | Sidawi Garage',
  meta: [
    {
      name: 'description',
      content:
        'Contact Mahmoud Sidawi for expert car oil advice, transmission flushes, or to join our VIP WhatsApp community group. Interactive map, location, and phone in Lebanon.',
    },
    { property: 'og:title', content: 'Contact Mahmoud Sidawi & Garage Map | Sidawi Garage' },
    {
      property: 'og:description',
      content:
        'Contact Mahmoud Sidawi for expert car oil advice, transmission flushes, or to join our VIP WhatsApp community group. Interactive map, location, and phone in Lebanon.',
    },
    { property: 'og:url', content: 'https://sidawigarage.com/contact' },
    { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Contact Mahmoud Sidawi & Garage Map | Sidawi Garage' },
    {
      name: 'twitter:description',
      content:
        'Contact Mahmoud Sidawi for expert car oil advice, transmission flushes, or to join our VIP WhatsApp community group. Interactive map, location, and phone in Lebanon.',
    },
    { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
  ],
  link: [
    { rel: 'canonical', href: 'https://sidawigarage.com/contact' },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(getGarageSchema()),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(
        getBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Contact & Directions', path: '/contact' },
        ])
      ),
    },
  ],
});
</script>

<template>
  <div class="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
    <!-- Header -->
    <div class="max-w-3xl space-y-3">
      <div class="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300">
        <UIcon name="i-lucide-map-pin" class="w-3.5 h-3.5" />
        <span>Direct Garage Access</span>
      </div>
      <h1 class="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
        Contact & Garage Location.
      </h1>
      <p class="text-sm text-zinc-400">
        Reach out directly to Mahmoud Sidawi for oil advice, transmission flush scheduling, or visit our specialized facility in Lebanon.
      </p>
    </div>

    <!-- Contact Hub & Map Layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-7">
        <ContactHub />
      </div>
      <div class="lg:col-span-5">
        <LocationMap />
      </div>
    </div>
  </div>
</template>
