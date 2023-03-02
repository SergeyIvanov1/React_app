// import {useState} from "react"
// import {useNavigate} from "react-router-dom"
// import {UserServices} from "services/User.js"

// export default () => {
//    const loadingState = useState(false)
//    const navigate = useNavigate()

//    const submit = (e) => {
//       e.preventDefault()
//       loadingState[1](true)
//       const data = new FormData(e.target)
//       UserServices.register(data).then(() => {
//          navigate("/")
//          loadingState[1](false)
//       }).catch((e) => loadingState[1](e.response?.data))
//    }

//    return <section>

//       <h3 className="text-center mb-5">Регистрация</h3>

//       <form className="w-25 mx-auto" onSubmit={submit}>
//          <div className="form-group">
//             <label className="w-100">Email
//                <input name={"email"} 
//                       type={"email"} 
//                       className="form-control" 
//                       placeholder="Email" required/>
//             </label>
//          </div>

//          <div className="form-group mt-2">
//             <label className="w-100">Username
//                <input name={"username"} 
//                       className="form-control" 
//                       placeholder="username" required/>
//             </label>
//          </div>

//          <div className="form-group  mt-2">
//             <label className="w-100">Имя
//                <input name={"firstName"} 
//                       className="form-control" 
//                       placeholder="Имя" required/>
//             </label>
//          </div>

//          <div className="form-group  mt-2">
//             <label className="w-100">Фамилия
//                <input name={"lastName"} 
//                       className="form-control" 
//                       placeholder="Фамилия" required/>
//             </label>
//          </div>

//          <div className="form-group mt-2">
//             <label className="w-100">Пароль
//                <input name={"password"} 
//                       type="password" 
//                       className="form-control" 
//                       placeholder="Пароль" required/>
//             </label>
//          </div>

//          <button type="submit" className="btn btn-primary mt-3">
//             {loadingState[0] === true && <div className="spinner-border-sm spinner-border"/>}
//             <span>Зарегистрироваться</span>
//          </button>

//          {typeof loadingState[0] === "object" && <div className="text-danger mt-2">
//             Не удалось зарегистрироваться, ошибка:
//             <br/>

//             {JSON.stringify(loadingState[0], null, 3)}
//          </div>}

//       </form>
//    </section>
// }
