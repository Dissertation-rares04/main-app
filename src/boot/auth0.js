import { boot } from 'quasar/wrappers'
import { auth0 } from 'core_app/auth0'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(({ app, router }) => {
  app.config.globalProperties.$router = router

  app.use(auth0)

  app.config.globalProperties.$auth0 = auth0
})

export { auth0 }
