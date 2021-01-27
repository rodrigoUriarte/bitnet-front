import http from "../config.js";

class UserDataService {
  async index() {
    return http.get("/usuarios");
  }

  show(id) {
    return http.get(`/usuarios/${id}`);
  }

  store(data) {
    return http.post("/usuarios", data);
  }

  update(id, data) {
    return http.put(`/usuarios/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/usuarios/${id}`);
  }
}

export default new UserDataService();