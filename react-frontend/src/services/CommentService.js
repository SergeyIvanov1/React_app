import {axiosInstance} from "../http-common"

const exportedObject = {
   getAll     : id => axiosInstance.get(`/taskComments/task/${id}`),
   get        : id => axiosInstance.get(`/taskComments/${id}`),
   create     : data => axiosInstance.post("/taskComments", data),
   update     : (id, data) => axiosInstance.put(`/comments/${id}`, data),
   remove     : id => axiosInstance.delete(`/taskComments/${id}`),
   removeAll  : () => axiosInstance.delete(`/taskComments`),
   findByTitle: title => axiosInstance.get(`/taskComments?title=${title}`),
}

export default exportedObject;
