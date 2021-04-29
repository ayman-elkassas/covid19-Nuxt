export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'COVID19-SOCIALITE',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'vuesax/dist/vuesax.css',
    'boxicons/css/boxicons.min.css',
    'vue-form-wizard/dist/vue-form-wizard.min.css',

    //todo:Import FilePond styles
    "filepond/dist/filepond.min.css",
    "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css",
    "filepond-plugin-media-preview/dist/filepond-plugin-media-preview.min.css",

    //todo:home Layout assets
    {src:"~assets/home/app-assets/css/bootstrap.min.css"},
    {src:"~assets/home/app-assets/css/bootstrap-extended.min.css"},
    {src:"~assets/home/app-assets/css/pages/page-profile.min.css"},
    {src:"~assets/home/app-assets/css/pages/app-file-manager.css"},
    {src:"~assets/home/app-assets/css/plugins/forms/form-wizard.min.css"},
    //todo:scroll
    {src:"overlayscrollbars/css/OverlayScrollbars.css"},

    //todo:multiselect
    {src:"vue-multiselect/dist/vue-multiselect.min.css"},

  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vuesax',
    '@/plugins/multiselect',
    '@/plugins/doctorFlag',
    '@/plugins/overlayscrollbars',
    '@/plugins/moment',
    { src: "@/plugins/vuetimeline.js" },
    { src: "@/plugins/vue-form-wizard.js" },
    { src: "@/plugins/vue-file-pond.js" },
  ],

  //todo: this is right way auth syntax
  auth:{
    strategies:{
      user: {
        scheme: 'laravelJWT',
        provider: 'users',
        url: '/api',
        endpoints:{
          login:{url:"/auth/login/",method:'post',propertyName:'false'},
          user: { url: '/auth/user/', method: 'get', propertyName: 'false' },
          logout: { url: '/auth/logout/', method: 'get',propertyName: 'false' }
        },
        token: {
          property: 'access_token',
          maxAge: 10080
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
      doctor: {
        scheme: 'laravelJWT',
        provider: 'doctors',
        url: '/api',
        endpoints:{
          login:{url:"/auth/login_doctor/",method:'post',propertyName:'false'},
          user: { url: '/auth/doctor/', method: 'get', propertyName: 'false' },
          logout: { url: '/auth/doctor_logout/', method: 'get',propertyName: 'false' }
        },
        token: {
          property: 'access_token',
          maxAge: 10080
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    },
    redirect:{
      login:'/auth/login/',
      home:"/home/timeline/"
    },
    fullPathRedirect: true,
    rewriteRedirects: true,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/fontawesome',
    '@nuxt/components',
  ],

  fontawesome: {
    component: 'fa',
    imports: [
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faEnvelope', 'faLock',
        ]
      },
    ],
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    [
      'nuxt-global-var',
      {
        data: {
          // PREFIX: 'http://127.0.0.1:8000/storage',
          PREFIX: 'https://covid19-server-socialist.herokuapp.com/storage',
        }
      }
    ]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // baseURL:"http://127.0.0.1:8000",
    baseURL:"https://covid19-server-socialist.herokuapp.com",
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS:true
  },

  //todo:Added Value
  // router:{
  //   extendRoutes(routes,resolve){
  //     routes.push({
  //       name:"auth",
  //       path:"/auth/signup",
  //       component:resolve(__dirname,"pages/auth/login.vue")
  //     })
  //   }
  // }
}
