import http from "../config.js";

class PreguntaDataService {
  index(foro_id) {
    return http.get(`/foros/${foro_id}/preguntas`);
  }

  show(id) {
    return http.get(`/preguntas/${id}`);
  }

  store(data) {
    return http.post(`/foros/${data.foro_id}/preguntas`, data);
  }

  update(id, data) {
    return http.put(`/preguntas/${id}`, data);
  }

  destroy(id) {
    return http.delete(`/preguntas/${id}`);
  }
}

export default new PreguntaDataService();
