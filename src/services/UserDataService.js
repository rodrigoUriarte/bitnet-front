import http from "../config.js";

class UserDataService {
  index() {
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

  getPreguntas(id) {
    return http.get(`/usuarios/${id}/preguntas`);
  }
}

export default new UserDataService();