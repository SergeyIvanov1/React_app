import {axiosInstance} from "../http-common"

export default {
   getAll     : () => axiosInstance.get("/todo/tasks"),
   get        : id => axiosInstance.get(`/todo/tasks/${id}`),
   create     : data => axiosInstance.post("/todo/tasks", data),
   update     : (id, data) => axiosInstance.put(`/todo/tasks/${id}`, data),
   remove     : id => axiosInstance.delete(`/todo/tasks/${id}`),
   removeAll  : () => axiosInstance.delete(`/todo/tasks`),
   findByTitle: title => axiosInstance.get(`/todo/tasks?title=${title}`),
}
