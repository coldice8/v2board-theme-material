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
  },
  {
    path: '/dashboard',
    name: 'Dashboard View',
    component: () => import("../views/DashboardView.vue"),
    children: []
  }
]

const router = createRouter ({
  history: createWebHistory("/"),
  routes: routes,
})

export default router;