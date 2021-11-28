import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'sign_in',
    component: SignIn
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import(/* webpackChunkName: "events" */ '../views/Events.vue')
  },
  {
    path: '/events/food',
    name: 'food_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue')
  },
  {
    path: '/events/games',
    name: 'game_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue')
  },
  {
    path: '/events/trips',
    name: 'trip_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue')
  },
  {
    path: '/events/webinar',
    name: 'webinar_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue')
  },
  {
    path: '/events/:eventId',
    name: 'single_event',
    component: () => import(/* webpackChunkName: "events" */ '../views/SpecificEventView.vue')

  },
  {
    path: '/games',
    name: 'games',
    component: () => import(/* webpackChunkName: "games" */ '../views/Games.vue')
  },
  {
    path: '/myAccount',
    name: 'my_account',
    component: () => import(/* webpackChunkName: "account" */ '../views/MyAccount.vue')
  },
  {
    path: '/admin/events/create',
    name: 'create_event',
    component: () => import(/* webpackChunkName: "events-admin" */ '../views/CreateEvent.vue')
  },
  {
    path: '/admin/events/edit/:eventId',
    name: 'edit_event',
    component: () => import(/* webpackChunkName: "events-admin" */ '../views/EditEvent.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue')
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
