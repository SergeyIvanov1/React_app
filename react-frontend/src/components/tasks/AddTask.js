import React, { useState, useEffect } from "react"
import TaskService from "../../services/TaskService"
import TagService from "../../services/TagService"

const maxCountElements = 3;

const AddTask = () => {
   const initialTaskState = {
      id: "",
      title: "",
      description: "",
      content: "",
      hours: "",
      status: "To Do",
      priority: "Medium",
      actualStartDate: "",
      actualEndDate: "",
      tags: []
      //   published  : false
   }
   // определяем и устанавливаем начальное состояние: task & submitted
   const [task, setTask] = useState(initialTaskState)
   // const [task.tags, setTaskTags] = useState([])
   const [tags, setTags] = useState([])
   const [choosedTag, setChoosedTag] = useState()
   const [submitted, setSubmitted] = useState(false)

   useEffect(() => {
      retrieveTags();
   }, []);

   const retrieveTags = () => {
      TagService.getAll()
         .then(response => {
            if (Array.isArray(response.data)) {
               setTags(response.data)
            } else {
               console.log('Массив tags c сервера не получен. Объект data пустой')
            }
         })
         .catch(e => {
            console.log(e);
         });
   };

   const refreshList = () => {
      retrieveTags()
   }

   // функцию для отслеживания значений ввода и устанавливаем это состояние для изменений
   const handleInputChange = event => {
      const { name, value } = event.target
      setTask({ ...task, [name]: value })
   }

   function handleAddingTag(tag) {
      if (task.tags.length < maxCountElements && !(task.tags.includes(tag))) {
         setTask(prevTask => ({
            ...prevTask, tags: [...prevTask.tags, tag]
         }));
      }
   }

   function handleChoosingTag(tag) {
      setChoosedTag(tag)
      console.log('tag = ' + tag)
   }

   function removeTag(tag) {
      console.log('task.tags = ' + task.tags)
      let filteredArray = task.tags.filter(item => item !== tag)
      setTask({ ...task, tags: filteredArray })
      console.log('after method work task.tags = ' + task.tags)
      setChoosedTag()
   }


   const saveTask = () => {
      const data = {
         title: task.title,
         description: task.description,
         content: task.content,
         status: task.status,
         priority: task.priority,
         hours: task.hours,
         actualStartDate: task.actualStartDate,
         actualEndDate: task.actualEndDate,
         tags: task.tags
      }

      // функция для получения Task состояния и отправки запроса POST в веб-API
      TaskService.create(data)
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
      <div >


         {submitted ? (
            <div>
               <h4>You submitted successfully!</h4>
               <button className="btn btn-success" onClick={newTask}>
                  Add
               </button>
            </div>
         ) : (
            <div className="container">
               <form className="row g-3">
                  <h2>Adding а task</h2>
                  <div className="form-group col-md-6">
                     <label htmlFor="title">Title</label>
                     <input
                        type="text"
                        className="form-control"
                        id="title"
                        required
                        value={task.title}
                        onChange={handleInputChange}
                        name="title" />
                  </div>

                  <div className="form-group col-md-3">
                     <label htmlFor="StartDate">Start date</label>
                     <input
                        type="datetime-local"
                        className="form-control"
                        id="StartDate"
                        required
                        // value={task.actualStartDate}
                        onChange={handleInputChange}
                        name="actualStartDate" />
                  </div>

                  <div className="form-group col-md-3">
                     <label htmlFor="EndDate">End date</label>
                     <input
                        type="datetime-local"
                        className="form-control"
                        id="EndDate"
                        required
                        // value={task.actualEndDate}
                        onChange={handleInputChange}
                        name="actualEndDate" />
                  </div>

                  <div className="form-group col-md-6">
                     <label htmlFor="description">Description</label>
                     <textarea
                        className="form-control"
                        id="description"
                        rows="4"
                        name="description"
                        value={task.description}
                        onChange={handleInputChange}
                        placeholder="Short description"
                        required>
                     </textarea>
                  </div>

                  <div className="form-group col-md-3">
                     <label htmlFor="tags">Tags</label>
                     {task.tags && task.tags.map((tag) => {
                        return (
                           <div className="tag" style={{ color: tag.color }}>
                              <div className="form-check">
                                 <input className="form-check-input"
                                    type="radio"
                                    onChange={() => handleChoosingTag(tag)}
                                    value={tag}
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1" />

                                 <label className="form-check-label"
                                    htmlFor="flexRadioDefault1">
                                    {tag.name}
                                 </label>
                              </div>
                           </div>
                        )
                     })}

                  </div>
                  <div className="form-group col-md-2">
                     <label htmlFor="actions">Actions</label>
                     <button className="btn btn-primary col-md-12  "
                        type="button" data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasRight"
                        aria-controls="offcanvasRight">Added tag
                     </button>
                  
                     <button
                        id="flexRadioDefault1"
                        className="col-md-12 adding btn btn-success"
                        style={{ backgroundColor: "red" }}
                        onClick={() => removeTag(choosedTag)}
                        disabled=
                        // "true"
                        {!choosedTag}
                        >
                        Remove tag
                     </button>
                  </div>



                  <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                     <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasRightLabel">Add tags</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                     </div>
                     <div className="offcanvas-body">
                        {tags && tags.map((tag) => {
                           return (
                              <div className="col-md-8 adding btn" >
                                 <button className="btn btn-primary col-md-12  "
                                    style={{ backgroundColor: tag.color, color: "black" }}
                                    value={tag}
                                    name="tags"
                                    onClick={() => handleAddingTag(tag)}
                                    type="button" >
                                    {tag.name}

                                 </button>
                              </div>
                           )
                        })}
                     </div>
                  </div>

                  <div className="form-group">
                     <label htmlFor="exampleFormControlTextarea1">Content</label>
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

                  <div className="form-group col-md-4">
                     <label htmlFor="status" className="form-label">Status</label>
                     <select className="form-select" id="status" required>
                        <option defaultValue>{task.status}</option>
                        {/* <option value={task.status}>To Do</option> */}
                        <option value={task.status}>In progress</option>
                        <option value={task.status}>Code review</option>
                        <option value={task.status}>Tests</option>
                        <option value={task.status}>Done</option>
                     </select>
                  </div>

                  <div className="col-md-4">
                     <label htmlFor="priority" className="form-label">Priority</label>
                     <select className="form-select" id="priority" required>
                        <option defaultValue>{task.priority}</option>
                        <option value={task.priority}>Low</option>
                        {/* <option value={task.priority}>Medium</option> */}
                        <option value={task.priority}>High</option>
                     </select>
                  </div>

                  <div className="form-group col-md-4">
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

                  <button onClick={saveTask} className="col-md-3 adding btn btn-success">
                     Add
                  </button>
               </form>
            </div>
         )}

      </div>
   )
}

export default AddTask
