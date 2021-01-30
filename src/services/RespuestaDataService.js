import http from "../config.js";

class RespuestaDataService {
  index(pregunta_id) {
    return http.get(`/preguntas/${pregunta_id}/respuestas`);
  }

  show(id) {
    return http.get(`/respuestas/${id}`);
  }

  store(data) {
    return http.post(`/preguntas/${data.pregunta_id}/respuestas`, data);
  }

  update(id, data) {
    return http.put(`/respuestas/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/respuestas/${id}`);
  }
}

export default new RespuestaDataService();
