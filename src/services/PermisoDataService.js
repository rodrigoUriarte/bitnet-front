import http from "../config.js";

class UserDataService {
  async getAll() {
    return http.get("/permisos");
  }

  get(id) {
    return http.get(`/permisos/${id}`);
  }

  create(data) {
    return http.post("/permisos", data);
  }

  update(id, data) {
    return http.put(`/permisos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/permisos/${id}`);
  }

  deleteAll() {
    return http.delete(`/permisos`);
  }

  findByTitle(title) {
    return http.get(`/permisos?title=${title}`);
  }
}

export default new UserDataService();