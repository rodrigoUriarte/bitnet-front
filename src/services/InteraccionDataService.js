import http from "../config.js";

class InteraccionDataService {
  index() {
    return http.get("/interacciones");
  }

  show(id) {
    return http.get(`/interacciones/${id}`);
  }

  store(data) {
    return http.post("/interacciones", data);
  }

  update(id, data) {
    return http.put(`/interacciones/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/interacciones/${id}`);
  }
}

export default new InteraccionDataService();