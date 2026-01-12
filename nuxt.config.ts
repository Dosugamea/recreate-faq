export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: !process.env.VITEST },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxt/test-utils/module'],
  css: ['@/assets/css/main.css'],
  ssr: false,
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
