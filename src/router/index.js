import { createRouter, createWebHashHistory } from 'vue-router'
import { useAuthStore } from "@/store/pinia";
import HomeView from '../views/HomeView.vue'
import InputView from '../views/InputView.vue'
import ReportView from '../views/ReportView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'users',
    // 
    component: () => import(/* webpackChunkName: "about" */ '../views/UsersView.vue'),
    meta: { requiresAuth: true } //todo - add authorisation check to make sure requester is admin
  },
  {
    path: '/input',
    name: 'input',
    component: () => import(/* webpackChunkName: "about" */ '../views/InputView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/reports',
    name: 'reports',
    component: () => import(/* webpackChunkName: "about" */ '../views/ReportView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/adminreports',
    name: 'adminreports',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminReportView.vue'),
    meta: { requiresAuth: true } //todo - add authorisation check to make sure requester is admin
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route requires authentication and the user is not authenticated
  if (to.matched.some(record => record.meta.requiresAuth) && !useAuthStore().getAuthToken) {
    // Redirect to the login page
    next({ name: 'home' });
  } else {
    // Allow the navigation
    next();
  }
});

export default router
