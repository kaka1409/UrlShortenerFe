import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/HomePage.vue'
import Login from '@/views/LoginPage.vue'
import Register from '@/views/RegisterPage.vue'
import NotFound from '@/views/404NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
    },

    {
      path: '/home',
      name: 'home',
      component: Home,
    },

    {
      path: '/login',
      name: 'login',
      component: Login,
    },

    {
      path: '/register',
      name: 'register',
      component: Register,
    },

    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFound,
    }
  ],
})

export default router
