import { boot } from 'quasar/wrappers'
import VueLetterAvatar from 'vue-letter-avatar';

export default boot( ({ app }) => {
	app.use(VueLetterAvatar);
})

export { VueLetterAvatar }