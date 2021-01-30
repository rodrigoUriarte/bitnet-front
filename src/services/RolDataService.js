import http from "../config.js";

class RolDataService {
  index() {
    return http.get("/roles");
  }

  show(id) {
    return http.get(`/roles/${id}`);
  }

  store(data) {
    return http.post("/roles", data);
  }

  update(id, data) {
    return http.put(`/roles/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/roles/${id}`);
  }
}

export default new RolDataService();