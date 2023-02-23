import {axiosInstance} from "../http-common"

export default {
   getAll     : () => axiosInstance.get("/tasks"),
   get        : id => axiosInstance.get(`/tasks/${id}`),
   create     : data => axiosInstance.post("/tasks", data),
   update     : (id, data) => axiosInstance.put(`/tasks/${id}`, data),
   remove     : id => axiosInstance.delete(`/tasks/${id}`),
   removeAll  : () => axiosInstance.delete(`/tasks`),
   findByTitle: title => axiosInstance.get(`/tasks?title=${title}`),
}
