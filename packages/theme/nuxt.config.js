import webpack from 'webpack';

export default {
  mode: 'universal',
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  head: {
    title: 'Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'crossorigin'
      },
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        as: 'style'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Raleway:300,400,400i,500,600,700|Roboto:300,300i,400,400i,500,700&display=swap',
        media: 'print',
        onload: 'this.media=\'all\''
      }
    ]
  },
  loading: { color: '#fff' },
  plugins: [],
  buildModules: [
    // to core
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources',
    ['@vue-storefront/nuxt', {
      // @core-development-only-start
      coreDevelopment: true,
      // @core-development-only-end
      useRawSource: {
        dev: [
          '@vue-storefront/magento-composables',
          '@vue-storefront/core'
        ],
        prod: [
          '@vue-storefront/magento-composables',
          '@vue-storefront/core'
        ]
      }
    }],
    // @core-development-only-start
    ['@vue-storefront/nuxt-theme', {
      generate: {
        replace: {
          apiClient: '@vue-storefront/magento-api',
          composables: '@vue-storefront/magento-composables'
        }
      }
    }],
    // @core-development-only-end
    /* project-only-start
    ['@vue-storefront/nuxt-theme'],
    project-only-end */
    ['@vue-storefront/magento-composables/nuxt', {
      api: 'https://demo.site-builder.app/graphql',
      websites: {
        base: {
          code: 'base',
          defaultStoreGroup: 'main_website_store',
          storeGroups: {
            // eslint-disable-next-line @typescript-eslint/camelcase,camelcase
            main_website_store: {
              code: 'main_website_store',
              defaultStore: 'default',
              stores: {
                default: {code: 'default'},
                en: {code: 'en'}
              }
            }
          }
        }
      },
      defaultStore: 'default'
    }]
  ],
  modules: [
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'vue-scrollto/nuxt'
  ],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          welcome: 'Welcome 1'
        },
        de: {
          welcome: 'Welcome 2'
        }
      }
    }
  },
  styleResources: {
    scss: [require.resolve('@storefront-ui/shared/styles/_helpers.scss', { paths: [process.cwd()] })]
  },
  build: {
    transpile: [
      'vee-validate/dist/rules'
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.VERSION': JSON.stringify({
          // eslint-disable-next-line global-require
          version: require('./package.json').version,
          lastCommit: process.env.LAST_COMMIT || ''
        })
      })
    ]
  },
  router: {
    scrollBehavior (_to, _from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { x: 0, y: 0 };
      }
    }
  }
};
