import {useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import verifyEmailService from "services/VerifyEmailService"

export const Verify = () => {

   //достаём из параметров токен
   const {token} = useParams()
   //используем навигатор для перемещения по сайту
   const navigator = useNavigate()
   //создаём состояния загрузки
   const successState = useState("loading")

//после рендера страницы сразу шлём запрос на сервер
   useEffect(() => {
      verifyEmailService.get({token}).then(() => {
         successState[1]("success")
         setTimeout(() => {navigator("/login")}, 3000)
      })
      .catch(() => successState[1]("failed"))
   }, [])

   const textProcess = {
      loading: "идёт подтверждение...",
      success: "почта подтверждена",
      failed : "не удалось подтвердить почту",
   }

   return (<div>
      <h5>Подтверждение email</h5>

      <div>{textProcess[successState[0]]}</div>
   </div>)
}
