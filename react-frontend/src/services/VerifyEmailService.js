import {axiosInstance} from "../http-common"

export default {
   get        : data => axiosInstance.post("/auth/confirm_email", data),
}
