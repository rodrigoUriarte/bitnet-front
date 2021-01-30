import Vue from 'vue'
import VueRouter from 'vue-router'
import TablaUsuarios from '../components/TablaUsuarios.vue'
import TablaPermisos from '../components/TablaPermisos.vue'
import TablaRoles from '../components/TablaRoles.vue'
import TablaForos from '../components/TablaForos.vue'
import TablaPreguntas from '../components/TablaPreguntas.vue'
import TablaRespuestas from '../components/TablaRespuestas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
  },
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
  {
    path: '/foros',
    name: 'Foros',
    component: TablaForos
  },
  {
    path: '/preguntas',
    name: 'Preguntas',
    component: TablaPreguntas,
  },

  {
    path: '/foros/:foro_id/preguntas',
    name: 'PreguntasPorForo',
    component: TablaPreguntas,
    props: true
  },

  {
    path: '/preguntas/:pregunta_id/respuestas',
    name: 'RespuestasPorPregunta',
    component: TablaRespuestas,
    props: true
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
