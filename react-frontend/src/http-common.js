import axios from "axios"

export const axiosInstance = axios.create({
   baseURL: "http://localhost:8082/api",
//    baseURL: "http://89.108.102.201:8082/api",
   // baseURL: "http://194.58.108.53:8082/api",
   headers: {
      "Content-type": "application/json"
   }
})
