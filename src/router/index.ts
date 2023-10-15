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
    component: () => import("../views/DashboardView.vue"),
    children: [
      { 
        path: '', 
        name: 'Dashboard',
        component: () => import("../views/Dashboard/HomeView.vue") 
      },
      { 
        path: 'plan', 
        name: 'Plan',
        component: () => import("../views/Dashboard/PlanView.vue") 
      },
      { 
        path: 'node', 
        name: 'Node',
        component: () => import("../views/Dashboard/NodeView.vue") 
      },
      { 
        path: 'order', 
        name: 'Order',
        component: () => import("../views/Dashboard/OrderView.vue") 
      },
      { 
        path: 'profile', 
        name: 'Profile',
        component: () => import("../views/Dashboard/ProfileView.vue") 
      },
      { 
        path: 'traffic', 
        name: 'Traffic',
        component: () => import("../views/Dashboard/TrafficView.vue") 
      },
      { 
        path: 'ticket', 
        name: 'Ticket',
        component: () => import("../views/Dashboard/TicketView.vue") 
      },
    ]
  }
]

const router = createRouter ({
  history: createWebHistory("/"),
  routes: routes,
})

export default router;