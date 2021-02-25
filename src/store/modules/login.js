import http from "../../config.js";

// initial state
const state = () => ({
  user: null,
});

// getters
const getters = {
    isLogged: state => !!state.user
};

// actions
const actions = {
  login({ commit }, credentials) {
    return http.post("/login", credentials)
    .then(({ data }) => {
      commit("setUserData", data);
    });
  },

  logout({ commit }) {
    commit("clearUserData");
  },
};

// mutations
const mutations = {
  setUserData(state, userData) {
    state.user = userData;
    localStorage.setItem("user", JSON.stringify(userData));
    window.Permissions = userData.permissions;
    http.defaults.headers.common.Authorization = `Bearer ${userData.token}`;
  },

  clearUserData() {
    localStorage.removeItem("user");
    delete window.Permissions;
    location.reload();
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
