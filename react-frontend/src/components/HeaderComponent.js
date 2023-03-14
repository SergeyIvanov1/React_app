import React, { useEffect, useState } from "react"
import "../index.css"
import { Link, NavLink } from "react-router-dom"
import AuthService from "../services/auth.service"
import { Calendar2Check } from "react-bootstrap-icons"
import { Bell } from "react-bootstrap-icons"

const menu = [
   { url: "/add", name: "Add task" },
   { url: "/tasks", name: "List tasks" },
   { url: "/todo", name: "Todo table" }
]

const HeaderComponent = () => {
   const [currentUser, setCurrentUser] = useState(undefined)
   const [showModeratorBoard, setShowModeratorBoard] = useState(false)
   const [showAdminBoard, setShowAdminBoard] = useState(false)

   const leftMenu = [
      { url: "/teams", name: (currentUser ? "Teams" : "no teams") },
   ]

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

   {
      currentUser && (
         <div className="navbar-nav ml-auto">

            <li className="nav-item">
               <Link to={"/profile"} className="nav-link">
                  Notifications <span className="badge text-bg-secondary">4</span>
               </Link>
            </li>
         </div>
      )
   }

   return (
      <div >
         <nav className="navbar navbar-expand d-flex flex-wrap"
         style={{ backgroundColor: 'rgb(250, 240, 228)' }}
         >
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
            </div>

            {currentUser ? (
               <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                     <Link to={"/login"} className="nav-link" onClick={logOut}>
                        Log Out
                     </Link>
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

            <div className="col  "></div>
            <div className="col  "></div>
            <div className="col  "></div>

            {currentUser ? (
               <div className="col  border">
                  <div className="collapse navbar-collapse " id="navbarNavDarkDropdown">
                     <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                           <button className="btn  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                              Team name
                           </button>
                           <ul className="dropdown-menu ">
                              {menu.map((x, i) =>
                                 <li key={i}>
                                    <NavLink
                                       className="dropdown-item"
                                       to={x.url}>{x.name}
                                    </NavLink>
                                 </li>)}
                           </ul>
                        </li>
                     </ul>
                  </div>
               </div>
            ) : (
               <div className="col  "></div>
            )}

            {currentUser ? (
               <div className="col  ">
                  <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                     {leftMenu.map((x, i) =>
                        <li key={i}>
                           <NavLink
                              className={x => "  nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                              to={x.url}>{x.name}
                           </NavLink>
                        </li>)}

                     <li className="nav-item ">
                        <NavLink to={"/#"} className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}>
                           <Bell /> <span className="badge text-bg-secondary">4</span>
                        </NavLink>
                     </li>
                  </ul>
               </div>
            ) : (
               <div className="col  "></div>
            )}

            <div className="col  ">
               <div className="collapse navbar-collapse " id="navbarNavDarkDropdown">
                  <ul className="navbar-nav ">
                     <li className="nav-item dropdown">
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                           <img src={require('../images/defaultAvatar.png')} className="img-fluid avatar" alt="" />
                        </button>
                        <ul className="dropdown-menu ">
                           <Link to={"/profile"} className="dropdown-item">
                              {currentUser ? currentUser.username : "User is not logined"}
                           </Link>

                           {showModeratorBoard && (
                              <li className="nav-item">
                                 <Link to={"/mod"} className="dropdown-item">
                                    Moderator Board
                                 </Link>
                              </li>
                           )}

                           {showAdminBoard && (
                              <li className="nav-item">
                                 <Link to={"/admin"} className="dropdown-item">
                                    Admin Board
                                 </Link>
                              </li>
                           )}

                           {currentUser && (
                              <li className="nav-item">
                                 <Link to={"/user"} className="dropdown-item">
                                    User content
                                 </Link>
                              </li>
                           )}
                           <li><a className="dropdown-item" href="#">Settings</a></li>

                        </ul>
                     </li>
                  </ul>
               </div>
            </div>

         </nav >
         {/* <div className="header-of-user py-3 mb-4 border-bottom">
            <div className="container text-center">
               <div className="row align-items-start">
                  <div className="col border">
                     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {menu.map((x, i) =>
                           <li key={i}><NavLink
                              className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                              to={x.url}>{x.name}</NavLink></li>)}
                     </ul>
                  </div>

                  <div className="col border">
                     
                     </div>

                  <div className="col border">
                     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">

                        {leftMenu.map((x, i) =>
                           <li key={i}>
                              <NavLink
                                 className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                                 to={x.url}>{x.name}
                              </NavLink>
                           </li>)}
                        <li className="nav-item">
                           <NavLink to={"/#"} className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}>
                              Notifications <span className="badge text-bg-secondary">4</span>
                           </NavLink>
                        </li>
                        <li className="nav-item">
                           <NavLink to={"/#"} className="nav-link px-2 link-dark">
                              <img src={require('../images/defaultAvatar.png')} className="img-fluid avatar" alt="" />
                           </NavLink>
                        </li>

                     </ul>
                  </div>
                  {/* <div className="col">

                  </div> */}
         {/* </div>
            </div>
         </div> */}
      </div>
   )
}

export default HeaderComponent;
