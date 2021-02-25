import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Dashboard from "../components/Dashboard.vue";
import TablaUsuarios from "../components/TablaUsuarios.vue";
import TablaPermisos from "../components/TablaPermisos.vue";
import TablaRoles from "../components/TablaRoles.vue";
import TablaForos from "../components/TablaForos.vue";
import TablaPreguntas from "../components/TablaPreguntas.vue";
import TablaRespuestas from "../components/TablaRespuestas.vue";

Vue.use(VueRouter);

const routes = [

  {
    path: "/",
    name: "Home",
    component: Home,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/usuarios",
    name: "Usuarios",
    component: TablaUsuarios,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/roles",
    name: "Roles",
    component: TablaRoles,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/permisos",
    name: "Permisos",
    component: TablaPermisos,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/foros",
    name: "Foros",
    component: TablaForos,
    meta: {
      requiresAuth: true
    },
  },
  {
    path: "/preguntas",
    name: "Preguntas",
    component: TablaPreguntas,
    meta: {
      requiresAuth: true
    },
  },

  {
    path: "/foros/:foro_id/preguntas",
    name: "PreguntasPorForo",
    component: TablaPreguntas,
    props: true,
    meta: {
      requiresAuth: true
    },
  },

  {
    path: "/preguntas/:pregunta_id/respuestas",
    name: "RespuestasPorPregunta",
    component: TablaRespuestas,
    props: true,
    meta: {
      requiresAuth: true
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {

  const loggedIn = localStorage.getItem("user");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
    return;
  }
  next();
  
});

export default router;
