import http from "../config.js";

class UserDataService {
  async getAll() {
    return http.get("/usuarios");
  }

  get(id) {
    return http.get(`/usuarios/${id}`);
  }

  create(data) {
    return http.post("/usuarios", data);
  }

  update(id, data) {
    return http.put(`/usuarios/${id}`, data);
  }

  delete(id) {
    return http.delete(`/usuarios/${id}`);
  }

  deleteAll() {
    return http.delete(`/usuarios`);
  }

  findByTitle(title) {
    return http.get(`/usuarios?title=${title}`);
  }
}

export default new UserDataService();