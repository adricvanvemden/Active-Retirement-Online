import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { db } from './firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/global.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user === undefined) {
      next({ path: '/' })
    } else if (to.meta.requiresAdmin) {
      if (store.state.user.userRole !== 'admin') {
        next({ path: '/404' })
      } else next()
    } else next()
  } else next()
})

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid
    getUser(uid)
  } else {
    store.dispatch('setUser', undefined)
  }
})

async function getUser (userId) {
  const docRef = doc(db, 'users', userId)
  const docSnap = await getDoc(docRef)
  if (docSnap.exists()) {
    store.dispatch('setUser', docSnap.data())
  }
}

new Vue({
  router,
  store,
  el: '#app',
  name: 'App',
  methods: {
    makeToast (id, variant, title, text, noAutoHide, delay, to) {
      this.$bvToast.toast(text, {
        id: id,
        title: title,
        variant: variant,
        appendToast: true,
        noAutoHide: noAutoHide,
        autoHideDelay: delay,
        to: to,
        toaster: 'b-toaster-bottom-right'
      })
    },
    hideToast (id) {
      this.$bvToast.hide(id)
    }
  },
  render: h => h(App)
}).$mount('#app')
