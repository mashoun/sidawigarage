// https://nuxt.com/docs/api/configuration/nuxt-config
import productsData from './content/data/products.json';

const productRoutes = productsData.map((p) => `/products/${p.slug}`);

export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  compatibilityDate: '2025-07-15',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: false },

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
        class: 'dark bg-[#08090C] text-[#F8F9FA] antialiased selection:bg-amber-500/20 selection:text-amber-300',
      },
      title: 'Sidawi Garage | Precision Lubrication & Automotive Fluid Dynamics',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in high-performance motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
        },
        { name: 'theme-color', content: '#08090C' },
        { property: 'og:site_name', content: 'Sidawi Garage' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:title', content: 'Sidawi Garage | Precision Lubrication & Automotive Fluid Dynamics' },
        {
          property: 'og:description',
          content:
            'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in high-performance motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
        },
        { property: 'og:url', content: 'https://sidawigarage.com' },
        { property: 'og:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: 'Sidawi Garage - Precision Automotive Lubrication in Lebanon' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Sidawi Garage | Precision Lubrication & Automotive Fluid Dynamics' },
        {
          name: 'twitter:description',
          content:
            'Certified reseller for Liqui Moly, Addinol, and Castrol in Lebanon. Specializing exclusively in high-performance motor oil and transmission gear oil servicing by Mahmoud Sidawi.',
        },
        { name: 'twitter:image', content: 'https://sidawigarage.com/images/sidawi-garage-og.jpg' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  nitro: {
    externals: {
      inline: [
        /nuxt[\\/]dist/,
        /vue-bundle-renderer/,
        /@nuxt[\\/]nitro-server/,
        (id: string) => id.includes('nuxt/dist') || id.includes('nuxt\\dist'),
      ],
    },
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/products',
        '/videos',
        '/about',
        '/contact',
        '/sitemap.xml',
        ...productRoutes,
      ],
    },
  },
});
