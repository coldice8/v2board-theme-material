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
    children: [
      { 
        path: '', 
        component: () => import("../views/Dashboard/HomeView.vue") 
      },
      { 
        path: 'plan', 
        component: () => import("../views/Dashboard/PlanView.vue") 
      },
      { 
        path: 'node', 
        component: () => import("../views/Dashboard/NodeView.vue") 
      },
      { 
        path: 'order', 
        component: () => import("../views/Dashboard/OrderView.vue") 
      },
    ]
  }
]

const router = createRouter ({
  history: createWebHistory("/"),
  routes: routes,
})

export default router;