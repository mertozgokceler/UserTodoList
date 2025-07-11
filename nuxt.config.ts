// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/ui',
    '@nuxt/fonts',
  ],
  devtools: { enabled: true },
  css: ['./assets/main.css'],

})
