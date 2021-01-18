import Vue from 'vue'
import VueRouter from 'vue-router'
import TablaUsuarios from '../components/TablaUsuarios.vue'
import TablaPermisos from '../components/TablaPermisos.vue'
import TablaRoles from '../components/TablaRoles.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/usuarios',
    name: 'Usuarios',
    component: TablaUsuarios
  },
  {
    path: '/roles',
    name: 'Roles',
    component: TablaRoles
  },
  {
    path: '/permisos',
    name: 'Permisos',
    component: TablaPermisos
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
