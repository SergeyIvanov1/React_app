import {axiosInstance} from "http-common.js"

export const UserServices = {
   register: data => axiosInstance.post("/users", data),
   login   : data => axiosInstance.post("/users", data),
}

