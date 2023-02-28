import React, {useState} from "react"
import TasklService from "../services/TaskService"

const AddTask = () => {
   const initialTaskState = {
      id         : null,
      title      : "",
      description: "",
      content: "",
      status: "",
      priority: "",
      hours: null,
    //   published  : false
   }
   // определяем и устанавливаем начальное состояние: task & submitted
   const [task, setTask] = useState(initialTaskState)
   const [submitted, setSubmitted] = useState(false)

   // функцию для отслеживания значений ввода и устанавливаем это состояние для изменений
   const handleInputChange = event => {
      const {name, value} = event.target
      setTask({...task, [name]: value})
   }

   const saveTask = () => {
      const data = {
         title      : task.title,
         description: task.description,
         content: task.content,
         status: task.status,
         priority: task.priority,
         hours: task.hours
      }

      // функция для получения Task состояния и отправки запроса POST в веб-API
      TasklService.create(data)
      .then(response => {
         setTask(response.data)
         setSubmitted(true)
         console.log(response.data)
      })
      .catch(e => {
         console.log(e)
      })
   }

   const newTask = () => {
      setTask(initialTaskState)
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
               <button className="btn btn-success" onClick={newTask}>
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
                     value={task.title}
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
                     value={task.description}
                     onChange={handleInputChange}
                     name="description"
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <input
                     type="text"
                     className="form-control"
                     id="content"
                     required
                     value={task.content}
                     onChange={handleInputChange}
                     name="content"
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <input
                     type="text"
                     className="form-control"
                     id="status"
                     required
                     value={task.status}
                     onChange={handleInputChange}
                     name="status"
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <input
                     type="text"
                     className="form-control"
                     id="priority"
                     required
                     value={task.priority}
                     onChange={handleInputChange}
                     name="priority"
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="hours">Hours</label>
                  <input
                     type="text"
                     className="form-control"
                     id="hours"
                     required
                     value={task.hours}
                     onChange={handleInputChange}
                     name="hours"
                  />
               </div>               
         
               <button onClick={saveTask} className="btn btn-success">
                  Submit
               </button>
            </div>
         )}
      </div>
   )
}

export default AddTask
