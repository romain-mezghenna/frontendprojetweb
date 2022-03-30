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
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
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

export default router
