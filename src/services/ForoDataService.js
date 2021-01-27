import http from "../config.js";

class ForoDataService {
  async index() {
    return http.get("/foros");
  }

  show(id) {
    return http.get(`/foros/${id}`);
  }

  store(data) {
    return http.post("/foros", data);
  }

  update(id, data) {
    return http.put(`/foros/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/foros/${id}`);
  }
 
}

export default new ForoDataService();