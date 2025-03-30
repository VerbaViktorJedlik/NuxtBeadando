// https://nuxt.com/docs/api/configuration/nuxt-config
import {quasar} from '@quasar/vite-plugin'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-quasar-ui'],
})