import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/scss/global.scss'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  methods: {
    makeToast (id, variant, title, text, noAutoHide, delay) {
      this.$bvToast.toast(text, {
        id: id,
        title: title,
        variant: variant,
        appendToast: true,
        noAutoHide: noAutoHide,
        autoHideDelay: delay,
        toaster: 'b-toaster-bottom-right'
      })
    },
    hideToast (id) {
      this.$bvToast.hide(id)
    }
  },
  render: h => h(App)
}).$mount('#app')
