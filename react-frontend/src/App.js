import React from "react"
import {Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddTask from "./components/AddTask"
// import TableComponent from "./components/TableComponent"
// import Tutorial from "./components/Tutorial"
import Task from "./components/Task"
import TasksList from "./components/TasksList"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"
import TableTodoComponent from "./components/TableTodoComponent"
import Register from "./pages/Register.jsx"
import Login from "pages/Login"


function App() {
   return (
      <div className="container">
         <HeaderComponent/>
         <Routes>
            <Route path="/" element={<TasksList/>}/>
            <Route path="/tasks" element={<TasksList/>}/>
            {/* <Route path="/table" element={<TableComponent/>}/> */}
            {/* <Route path="/add" element={<AddTutorial/>}/> */}            
            {/* <Route path="/tutorials/:id" element={<Tutorial/>}/> */}
            <Route path="/add" element={<AddTask/>}/>            
            <Route path="/tasks/:id" element={<Task/>}/>
            <Route path="/todo" element={<TableTodoComponent/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
         </Routes>

         <FooterComponent/>
      </div>
   )
}

export default App
