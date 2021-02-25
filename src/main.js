import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import axios from "axios";
import store from "./store";

Vue.config.productionTip = false;

var mixin = {
  methods: {
    $can(permissionName) {
      return Permissions.indexOf(permissionName) !== -1;
    },
  },
};

Vue.mixin(mixin);

new Vue({
  vuetify,
  store,
  router,

  created() {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      const userData = JSON.parse(userInfo);
      this.$store.commit("login/setUserData", userData);
    }
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          this.$store.dispatch("login/logout");
        }
        return Promise.reject(error);
      }
    );
  },

  render: (h) => h(App),
}).$mount("#app");
