import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import VueLetterAvatar from 'vue-letter-avatar';


// Vue.use(VueLetterAvatar);
// import axios from 'src/boot/axios'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */
function extendConf (conf) {
  // make sure my-component boot file is registered
  conf.boot.push('~quasar-app-extension-my-component/src/boot/my-component.js')

  // make sure boot & component files get transpiled
  // conf.build.transpileDependencies.push(/quasar-app-extension-my-component[\\/]src/)

  // make sure my-component css goes through webpack to avoid ssr issues
  // conf.css.push('~quasar-app-extension-my-component/src/component/MyComponent.sass')
}

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })
  return Router
})
