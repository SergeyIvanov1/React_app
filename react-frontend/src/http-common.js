import axios from "axios"

export const axiosInstance = axios.create({
   baseURL: "http://89.108.102.201:8082/api",
   headers: {
      "Content-type": "application/json"
   }
})
