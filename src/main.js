import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: 'AIzaSyCFpZuP7zxZeTqHqQvfhbDSfvJa_U-Kyr0',
  authDomain: 'fahmos.firebaseapp.com',
  projectId: 'fahmos',
  storageBucket: 'fahmos.appspot.com',
  messagingSenderId: '719976341701',
  appId: '1:719976341701:web:33eb6ad4ca1838d98850ac',
  measurementId: 'G-VSF1KXQCK5'
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
