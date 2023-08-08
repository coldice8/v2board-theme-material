import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: () => import("../views/HomeView.vue")
  },
  {
    path: '/login',
    name: 'Login View',
    component: () => import("../views/LoginView.vue")
  }
]

const router = createRouter ({
  history: createWebHistory("/"),
  routes: routes,
})

export default router;