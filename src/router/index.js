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
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events',
    name: 'events',
    component: () => import(/* webpackChunkName: "events" */ '../views/Events.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/food',
    name: 'food_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/games',
    name: 'game_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/trips',
    name: 'trip_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/webinar',
    name: 'webinar_events',
    component: () => import(/* webpackChunkName: "events" */ '../views/EventsFiltered.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/:eventId',
    name: 'single_event',
    component: () => import(/* webpackChunkName: "events" */ '../views/SpecificEventView.vue'),
    meta: { requiresAuth: true }

  },
  {
    path: '/games',
    name: 'games',
    component: () => import(/* webpackChunkName: "games" */ '../views/Games.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/myAccount',
    name: 'my_account',
    component: () => import(/* webpackChunkName: "account" */ '../views/User.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/events/create/event',
    name: 'create_event',
    component: () => import(/* webpackChunkName: "events-admin" */ '../views/CreateEvent.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/games/bridge',
    name: 'bridge',
    component: () => import(/* webpackChunkName: "games" */ '../views/JoinBridge.vue')
  },
  {
    path: '/games/reversi',
    name: 'reversi',
    component: () => import(/* webpackChunkName: "games" */ '../views/JoinReversi.vue')
  },
  {
    path: '/games/chess',
    name: 'chess',
    component: () => import(/* webpackChunkName: "games" */ '../views/JoinChess.vue')
  },
  {
    path: '/events/edit/:eventId',
    name: 'edit_event',
    component: () => import(/* webpackChunkName: "events-admin" */ '../views/EditEvent.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/user/:userId',
    name: 'user',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
