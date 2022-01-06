import { boot } from 'quasar/wrappers'
import Vue from 'vue'
import GSignInButton from 'vue-google-signin-button'

 export default boot (({ app, router, Vue }) => {
    app.component(GSignInButton)
    // return GSignInButton({
    //       ref: divRef
    //     },

    //   )
    return GSignInButton
})

export { GSignInButton }
// export default ({ app, router, Vue }) => {
//     Vue.use(GSignInButton)
// }