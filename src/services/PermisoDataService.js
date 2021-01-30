import http from "../config.js";

class PermisoDataService {
  index() {
    return http.get("/permisos");
  }

  show(id) {
    return http.get(`/permisos/${id}`);
  }

  store(data) {
    return http.post("/permisos", data);
  }

  update(id, data) {
    return http.put(`/permisos/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/permisos/${id}`);
  }
}

export default new PermisoDataService();