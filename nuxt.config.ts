
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['usebootstrap', 'nuxt-graphql-client'],
    'graphql-client': {
    clients: {
      default: {
        host: process.env.GQL_HOST || 'https://testdrive.kompletecare.com/graphql',
        retainToken: true,
        headers: {
          'Authorization' : 'Bearer 6241|W4Io83tDIMEQsbSrqYtGLyEzCeLKAUj1l33e19nG'
        },
        tokenStorage: {
          name: 'apollo-token',
          mode: 'localStorage'
        }
      }
    },
  },
    typescript: {
    typeCheck: true,
  },
  css: [
    '/assets/css/main.css'
  ]

})