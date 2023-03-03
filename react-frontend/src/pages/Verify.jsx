import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import verifyEmailService from "services/VerifyEmailService"

export const Verify = () => {

   //достаём из параметров токен
   const { token } = useParams()
   console.log({ token })
   //используем навигатор для перемещения по сайту
   const navigator = useNavigate()
   //создаём состояния загрузки
   const successState = useState("loading")

   //после рендера страницы сразу шлём запрос на сервер
   useEffect(() => {
      verifyEmailService.get({ token })
         .then(() => {
            successState[1]("success")
            setTimeout(() => { navigator("/login") }, 3000)
            // return () => clearTimeout(timer);
         })
         .catch(() => successState[1]("failed"))
   }, [])

   const textProcess = {
      loading: "Confirmation of existing mail is in progress...",
      success: "We are thank you for registration and suggest passing to a login page.",
      failed: "Confirmation a mail is failed.",
   }

   return (<div>
      <h3>Confirmation of existing mail</h3>

      <div>{textProcess[successState[0]]}</div>
   </div>)
}
