import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"
import Profile from "../views/Profile.vue"
import Logout from "../views/Logout.vue"

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path:'/login',
    name:'Login',
    component: Login
  },
  {
    path: '/register',
    name:"Register",
    component : Register
  },
  {
    path: '/profile',
    name: 'Profile',
    component : Profile
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/astres',
    name: 'Astres',
    component: () => import( /* webpackChunkName: "about" */ '../views/AstreView.vue')
  },
  {
    path: '/ships',
    name: 'Lanceurs',
    component: () => import( /* webpackChunkName: "about" */ '../views/LanceurView.vue')
  },
  {
    path: '/companies',
    name: 'Companies',
    component: () => import( /* webpackChunkName: "about" */ '../views/CompanieView.vue')
  },
  {
    path: '/reservations',
    name:'Reservations',
    component: () => import( /* webpackChunkName: "about" */ '../views/ReservationView.vue')
  },
  {
    path: '/newvol',
    name: 'AddVol',
    component: () => import( /* webpackChunkName: "about" */ '../views/AddVolView.vue')
  },
  {
    path: '/newastre',
    name: 'AddAstre',
    component: () => import( /* webpackChunkName: "about" */ '../views/AddAstreView.vue')
  },
  {
    path: '/newlanceur',
    name: 'AddLanceur',
    component: () => import( /* webpackChunkName: "about" */ '../views/AddLanceurView.vue')
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/', '/login', '/register', '/astres', '/ships', '/companies'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');
  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next('/login');
  } else {
    next();
  }
});

export default router
