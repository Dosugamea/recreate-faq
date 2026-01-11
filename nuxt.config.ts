export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/eslint', '@nuxtjs/storybook'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  future: {
    compatibilityVersion: 4,
  },
})
