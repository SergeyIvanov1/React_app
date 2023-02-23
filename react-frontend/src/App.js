import React from "react"
import {Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"

import AddTutorial from "./components/AddTutorial"
import TableComponent from "./components/TableComponent"
import Tutorial from "./components/Tutorial"
import Task from "./components/Task"
import TutorialsList from "./components/TutorialsList"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"
import TableTodoComponent from "./components/TableTodoComponent"
import Register from "./pages/Register.jsx"


function App() {
   return (
      <div className="container">
         <HeaderComponent/>
         <Routes>
            <Route path="/" element={<TutorialsList/>}/>
            <Route path="/tutorials" element={<TutorialsList/>}/>
            <Route path="/table" element={<TableComponent/>}/>
            <Route path="/add" element={<AddTutorial/>}/>
            <Route path="/tutorials/:id" element={<Tutorial/>}/>
            <Route path="/tasks/:id" element={<Task/>}/>
            <Route path="/todo" element={<TableTodoComponent/>}/>
            <Route path="/register" element={<Register/>}/>
         </Routes>

         <FooterComponent/>
      </div>
   )
}

export default App
