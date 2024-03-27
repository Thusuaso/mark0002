import bodyParser from "body-parser"
export default {
  typescript: {
    shim:false
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'mark0002',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      {rel:'primevue/resources/themes/vela-orange/theme.css'}
    ],
    script:[
      {src:'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
      'primeflex/primeflex.css',
      '~/assets/css/bootstrap.css',
      '~/assets/css/bootstrap.min.css',
      '~/assets/css/bootstrap.min.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/components.js',
    { src:'~/plugins/excel.js',mode: 'client'},
    '~/plugins/socket.io.js',
    '~/plugins/logs.js',
    '~/plugins/cookies',

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    [
      'primevue/nuxt',
    {
      theme: 'saga-orange',
      ripple: true,

  },
    ],
    
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    'nuxt-socket-io'

  ],
  io: {
    sockets: [ // Required
      { // At least one entry is required
        name: 'home',
        url: 'http://localhost:3000',
        default: true,
        vuex: { /* see section below */ },
        namespaces: { /* see section below */ }
      }, 
    ]
  },
  

  toast: {
    position: 'top-center',
    duration:3000,
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
},


  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.server
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue'],
    standalone: false,

  },
  serverMiddleware:[
    bodyParser.json(),
    '~/api'
  ],
  devServer: {
    port: 3000
  },
  

}
