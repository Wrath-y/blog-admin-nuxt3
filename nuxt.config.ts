// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      meta: [
        // <meta name="viewport" content="width=device-width, initial-scale=1">
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        // <script src="https://myawesome-lib.js"></script>
        { src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1466336567692166', crossorigin: 'anonymous' }
      ],
      link: [
        // <link rel="stylesheet" href="https://myawesome-lib.css">
      ],
    }
  },

  routeRules: {
  },

  modules: [
    '@element-plus/nuxt'
  ],

  elementPlus: {
    themes: ['dark']
  },

  plugins: [],
})
