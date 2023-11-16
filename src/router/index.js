import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import Favorite from '@/views/Favorite.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: HomeView },
  { path: '/favorite', component: Favorite }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
