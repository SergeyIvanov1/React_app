import React, { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { Calendar2Check } from "react-bootstrap-icons"
import HeaderComponent from "./components/HeaderComponent"
import FooterComponent from "./components/FooterComponent"

import AuthService from "./services/auth.service"
import { ROUTERS } from "const/routers"

const App = () => {
   const [showModeratorBoard, setShowModeratorBoard] = useState(false)
   const [showAdminBoard, setShowAdminBoard] = useState(false)
   const [currentUser, setCurrentUser] = useState(undefined)

   useEffect(() => {
      const user = AuthService.getCurrentUser()

      if (user) {
         setCurrentUser(user)
         setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"))
         setShowAdminBoard(user.roles.includes("ROLE_ADMIN"))
      }
   }, [])

   const logOut = () => {
      AuthService.logout()
   }


   // function App() {
   return (

      <div>
         <nav className="navbar navbar-expand  bg-light">

            
            <Link to="/"
               className="task-tracking d-flex align-items-center mb-2 mb-md-0 text-dark text-decoration-none">
               <Calendar2Check color="orange" size={36} /><span className="nameProgect">Task tracking</span>
            </Link>

            <div className="navbar-nav mr-auto">

               <li className="home-element nav-item">
                  <Link to={"/home"} className="nav-link">
                     Home
                  </Link>
               </li>

               {showModeratorBoard && (
                  <li className="nav-item">
                     <Link to={"/mod"} className="nav-link">
                        Moderator Board
                     </Link>
                  </li>
               )}

               {showAdminBoard && (
                  <li className="nav-item">
                     <Link to={"/admin"} className="nav-link">
                        Admin Board
                     </Link>
                  </li>
               )}

               {currentUser && (
                  <li className="nav-item">
                     <Link to={"/user"} className="nav-link">
                        User
                     </Link>
                  </li>
               )}
            </div>

            {currentUser ? (
               <div className="navbar-nav ml-auto">

                  <li className="nav-item">
                     <a href="/login" className="nav-link" onClick={logOut}>
                        LogOut
                     </a>
                  </li>
               </div>
            ) : (
               <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                     <Link to={"/login"} className="nav-link">
                        Login
                     </Link>
                  </li>

                  <li className="nav-item">
                     <Link to={"/register"} className="nav-link">
                        Sign Up
                     </Link>
                  </li>
               </div>
            )}
           
               
            
         </nav>

         <div className="container">
            {currentUser ? (
               <HeaderComponent />) : (<div></div>)}

            <Routes>
               {ROUTERS.map((x, i) => <Route key={i} {...x} />)}
            </Routes>

            <FooterComponent />
         </div>
      </div>
   )
}


export default App
