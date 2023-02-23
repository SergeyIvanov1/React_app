import http from "../http-common"

export default {
   getAll     : () => http.get("/tasks"),
   get        : id => http.get(`/tasks/${id}`),
   create     : data => http.post("/tasks", data),
   update     : (id, data) => http.put(`/tasks/${id}`, data),
   remove     : id => http.delete(`/tasks/${id}`),
   removeAll  : () => http.delete(`/tasks`),
   findByTitle: title => http.get(`/tasks?title=${title}`),
}
