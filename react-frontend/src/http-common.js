import axios from "axios"
import {API} from "const/API"

export const axiosInstance = axios.create({
   baseURL: API,
   headers: {
      "Content-type": "application/json"
   }
})
