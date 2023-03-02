import React, { useEffect, useState } from "react"
import { Link, Route, Routes } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
// import {Calendar2Check} from "react-bootstrap-icons"
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
         <nav className="navbar navbar-expand navbar-light bg-light">
            {/* <Link to={"/"} className="navbar-brand">
               bezKoder
            </Link> */}


            <div className="navbar-nav mr-auto">
               <li className="nav-item">
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
                     <Link to={"/profile"} className="nav-link">
                        {currentUser.username}
                     </Link>
                  </li>
                  <li className="nav-item">
                     <a href="/login" className="nav-link" onClick={logOut}>
                        LogOut
                     </a>
                  </li>
               </div>
            ) : (
               <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                     <Link to={"/login2"} className="nav-link">
                        Login
                     </Link>
                  </li>

                  <li className="nav-item">
                     <Link to={"/register2"} className="nav-link">
                        Sign Up
                     </Link>
                  </li>
               </div>
            )}
         </nav>

         <div className="container">
            {currentUser ? (
            <HeaderComponent/>) : (<div></div>)}
            
            <Routes>
               {ROUTERS.map(x => <Route {...x}/>)}
            </Routes>
            
            <FooterComponent />
         </div>
      </div>
   )
}


export default App
