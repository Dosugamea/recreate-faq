export default defineNuxtConfig({
  compatibilityDate: '2026-11-27',
  devtools: { enabled: !process.env.VITEST },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/test-utils/module'],
  css: ['@/assets/css/main.css'],
  ssr: false,
  nitro: {
    preset: 'cloudflare_module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },
  future: {
    compatibilityVersion: 4,
  },
  ignoreOptions: {
    allowRelativePaths: true,
  },
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
})
