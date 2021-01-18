import http from "../config.js";

class UserDataService {
  async getAll() {
    return http.get("/roles");
  }

  get(id) {
    return http.get(`/roles/${id}`);
  }

  create(data) {
    return http.post("/roles", data);
  }

  update(id, data) {
    return http.put(`/roles/${id}`, data);
  }

  delete(id) {
    return http.delete(`/roles/${id}`);
  }

  deleteAll() {
    return http.delete(`/roles`);
  }

  findByTitle(title) {
    return http.get(`/roles?title=${title}`);
  }
}

export default new UserDataService();