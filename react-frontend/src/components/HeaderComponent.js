import React from "react"
import {Calendar2Check} from "react-bootstrap-icons"
import "../index.css"
import {Link, NavLink} from "react-router-dom"

const menu = [
   {url: "", name: "Home"},
   {url: "/features", name: "Features"},
   {url: "/add", name: "Add"},
   {url: "/table", name: "Table"},
   {url: "/todo", name: "Todo"},
   {url: "/FAQs", name: "FAQs"},
   {url: "/About", name: "About"}
]

export default () => {

   return (
      <div>
         <div className="container">
            <header
               className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
               <Link to="/"
                     className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                  <Calendar2Check color="orange" size={36}/><span className="nameProgect">Task tracking</span></Link>


               <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                  {menu.map((x, i) =>
                     <li key={i}><NavLink
                        className={x => "nav-link px-2 " + (x.isActive ? "link-dark" : "link-secondary")}
                        to={x.url}>{x.name}</NavLink></li>)}
               </ul>

               <div className="col-md-3 text-end">
                  <Link to="/" className="btn btn-outline-primary me-2">Login</Link>
                  <Link to="/register" className="btn btn-primary">Sign-up</Link>
               </div>
            </header>
         </div>
      </div>
   )
}
