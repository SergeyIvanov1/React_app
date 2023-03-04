import React, { useState } from "react"
import TasklService from "../../services/TaskService"

const AddTask = () => {
   const initialTaskState = {
      id: null,
      title: "",
      description: "",
      content: "",
      status: "To Do",
      priority: "Medium",
      hours: null,
      //   published  : false
   }
   // определяем и устанавливаем начальное состояние: task & submitted
   const [task, setTask] = useState(initialTaskState)
   const [submitted, setSubmitted] = useState(false)

   // функцию для отслеживания значений ввода и устанавливаем это состояние для изменений
   const handleInputChange = event => {
      const { name, value } = event.target
      setTask({ ...task, [name]: value })
   }

   const saveTask = () => {
      const data = {
         title: task.title,
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
               <h2>Adding а task</h2>
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

               <div class="form-group">
                  <label for="exampleFormControlTextarea1">Content</label>
                  <textarea 
                     className="form-control"
                     id="exampleFormControlTextarea1"
                     rows="3"
                     name="content"
                     value={task.content}
                     onChange={handleInputChange}
                     placeholder="Full description"
                     required>
                  </textarea>
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
                     name="hours" />
               </div>

               <div className="form-group">
                  <label htmlFor="content">Status</label>
                  <select className="form-select form-select-md" aria-label=".form-select-md example" required>
                     <option selected>{task.status}</option>
                     <option value={task.status}>To Do</option>
                     <option value={task.status}>In progress</option>
                     <option value={task.status}>Code review</option>
                     <option value={task.status}>Tests</option>
                     <option value={task.status}>Done</option>
                  </select>
               </div>

               <div className="form-group">
                  <label htmlFor="content">Priority</label>
                  <select className="form-select form-select-md" aria-label=".form-select-md example" required>
                     <option selected>{task.priority}</option>
                     <option value={task.priority}>Low</option>
                     <option value={task.priority}>Medium</option>
                     <option value={task.priority}>High</option>
                  </select>
               </div>

               <button onClick={saveTask} className="adding btn btn-success">
                  Add
               </button>
            </div>
         )}
      </div>
   )
}

export default AddTask
