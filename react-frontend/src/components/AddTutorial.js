import React, {useState} from "react"
import TutorialDataService from "../services/TutorialService"

const AddTutorial = () => {
   const initialTutorialState = {
      id         : null,
      title      : "",
      description: "",
      published  : false
   }
   // определяем и устанавливаем начальное состояние: tutorial & submitted
   const [tutorial, setTutorial] = useState(initialTutorialState)
   const [submitted, setSubmitted] = useState(false)

   // функцию для отслеживания значений ввода и устанавливаем это состояние для изменений
   const handleInputChange = event => {
      const {name, value} = event.target
      setTutorial({...tutorial, [name]: value})
   }

   const saveTutorial = () => {
      const data = {
         title      : tutorial.title,
         description: tutorial.description
      }

      // функция для получения tutorial состояния и отправки запроса POST в веб-API
      TutorialDataService.create(data)
      .then(response => {
         setTutorial(response.data)
         setSubmitted(true)
         console.log(response.data)
      })
      .catch(e => {
         console.log(e)
      })
   }

   const newTutorial = () => {
      setTutorial(initialTutorialState)
      setSubmitted(false)
   }

   // Для return, мы проверяем submittedсостояние, если оно истинно,
   // мы снова показываем кнопку «Добавить» для создания нового учебника.
   // В противном случае появится форма с кнопкой «Отправить» .
   return (
      <div className="submit-form">
         {submitted ? (
            <div>
               <h4>You submitted successfully!</h4>
               <button className="btn btn-success" onClick={newTutorial}>
                  Add
               </button>
            </div>
         ) : (
            <div>
               <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                     type="text"
                     className="form-control"
                     id="title"
                     required
                     value={tutorial.title}
                     onChange={handleInputChange}
                     name="title"
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input
                     type="text"
                     className="form-control"
                     id="description"
                     required
                     value={tutorial.description}
                     onChange={handleInputChange}
                     name="description"
                  />
               </div>

               <button onClick={saveTutorial} className="btn btn-success">
                  Submit
               </button>
            </div>
         )}
      </div>
   )
}

export default AddTutorial
