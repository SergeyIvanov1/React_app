import React, { useEffect, useState } from "react"
import "../index.css"
import { Link, NavLink } from "react-router-dom"
import AuthService from "../services/auth.service"

const menu = [
   { url: "/tasks", name: "List tasks" },
   { url: "/add", name: "Add task" },   
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

   return (
      <div>
         <div className="container">
            <header
               className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

               <div>
                  {currentUser && (
                     <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                           <Link to={"/profile"} className="nav-link">
                              {currentUser.username}
                           </Link>
                        </li>
                     </div>
                  )}
               </div>

               <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  {menu.map((x, i) =>
                     <li key={i}><NavLink
                        className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                        to={x.url}>{x.name}</NavLink></li>)}
               </ul>

            </header>
         </div>
      </div>
   )
}

export default HeaderComponent;
