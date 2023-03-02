// import React, {useState} from "react"
// import VerifyEmailService from "../services/VerifyEmailService"

// const VerifyToken = () => {
//    const initialTokenRequestState = {    
//       token      : ""
//    }
//    // определяем и устанавливаем начальное состояние: TokenRequest & submitted
//    const [tokenRequest, setTokenRequest] = useState(initialTokenRequestState)
//    const [submitted, setSubmitted] = useState(false)

//    // функцию для отслеживания значений ввода и устанавливаем это состояние для изменений
//    const handleInputChange = event => {
//       const {name, value} = event.target
//       setTokenRequest({...tokenRequest, [name]: value})
//    }

//    const saveTokenRequest = () => {
//       const data = {
//         token      : tokenRequest.token
//       }

//       // функция для получения TokenRequest состояния и отправки запроса POST в веб-API
//       VerifyEmailService.create(data)
//       .then(response => {
//          setTokenRequest(response.data)
//          setSubmitted(true)
//          console.log(response.data)
//       })
//       .catch(e => {
//          console.log(e)
//       })
//    }

//    const newTokenRequest = () => {
//       setTokenRequest(initialTokenRequestState)
//       setSubmitted(false)
//    }

//    // Для return, мы проверяем submitted состояние, если оно истинно,
//    // мы снова показываем кнопку «Добавить» для создания нового учебника.
//    // В противном случае появится форма с кнопкой «Отправить» .
//    return (
//       <div className="submit-form">
//          {submitted ? (
//             <div>
//                <h4>You submitted successfully!</h4>
//                <button className="btn btn-success" onClick={newTokenRequest}>
//                   Add
//                </button>
//             </div>
//          ) : (
//             <div>
//                <div className="form-group">
//                   <label htmlFor="token">token</label>
//                   <input
//                      type="text"
//                      className="form-control"
//                      id="token"
//                      required
//                      value={tokenRequest.token}
//                      onChange={handleInputChange}
//                      name="token"
//                   />
//                </div>              
         
//                <button onClick={saveTokenRequest} className="btn btn-success">
//                   Submit
//                </button>
//             </div>
//          )}
//       </div>
//    )
// }

// export default VerifyToken
