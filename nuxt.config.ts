// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  devtools: { enabled: true },
  srcDir: 'src/',
  ssr: true,
  build: {
    transpile: ['vuetify'],
  },
  app: {
    head: {
      title: 'DemoDay',
      link: [
        { 
          
          rel: 'preconnect', 
          href: 'https://fonts.gstatic.com' 
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },
  components: [
    {
      global: true,
      path: '@/components',
      pathPrefix: false,
    },
  ],
  css: ['vuetify/styles', '@/styles/global.scss'],
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    //...
  ],
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'home',
        path: '/',
        file: '~/pages/auth/login',
      })
    },
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
})
