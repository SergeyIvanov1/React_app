import React, { useEffect, useState } from "react"
import "../index.css"
import { Link, NavLink } from "react-router-dom"
import AuthService from "../services/auth.service"

const menu = [
   { url: "/add", name: "Add task" },
   { url: "/tasks", name: "List tasks" },
   { url: "/todo", name: "Todo table" }
]



const HeaderComponent = () => {
   const [currentUser, setCurrentUser] = useState(undefined)

   useEffect(() => {
      const user = AuthService.getCurrentUser()

      if (user) {
         setCurrentUser(user)
      }
   }, [])

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
   const leftMenu = [
      { url: "/profile", name: (currentUser ? currentUser.username : "no user") },
      // { url: "/#", name: (currentUser ? "Notifications " : "no user") },
      { url: "/teams", name: (currentUser ? "Teams" : "no teams") },
   ]

   return (
      <div>
         <div className="header-of-user py-3 mb-4 border-bottom">
            <div className="container text-center">
               <div className="row align-items-start">
                  <div className="col ">

                     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li className="nav-item">
                           <NavLink to={"/#"} className="nav-link px-2 link-dark">
                              <img src={require('../images/defaultAvatar.png')} className="img-fluid avatar" alt="" />
                           </NavLink>
                        </li>

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
                     </ul>
                    

                  </div>
                  {/* <div className="col">

                  </div> */}
                  <div className="col ">
                  </div>
                  <div className="col ">
                     <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        {menu.map((x, i) =>
                           <li key={i}><NavLink
                              className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                              to={x.url}>{x.name}</NavLink></li>)}
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default HeaderComponent;
