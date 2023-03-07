import {axiosInstance} from "../http-common"

export default {
   getAll     : () => axiosInstance.get("/tags"),
   get        : id => axiosInstance.get(`/tags/${id}`),
   create     : data => axiosInstance.post("/tags", data),
   update     : (id, data) => axiosInstance.put(`/tags/${id}`, data),
   remove     : id => axiosInstance.delete(`/tags/${id}`),
   removeAll  : () => axiosInstance.delete(`/tags`),
   // findByTitle: title => axiosInstance.get(`/todo/tags?title=${title}`),
}
