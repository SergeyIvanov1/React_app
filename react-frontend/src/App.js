import React, { useState, useEffect } from "react"
import {Routes, Route, Link} from "react-router-dom"
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

import AuthService from "./services/auth.service";

import Login2 from "./components/login2";
import Register2 from "./components/Register2";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };


// function App() {
   return (

      <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          bezKoder
        </Link>
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
         <HeaderComponent/>
         <Routes>
            <Route path="/" element={<TasksList/>}/>
            <Route path="/tasks" element={<TasksList/>}/>            
            <Route path="/add" element={<AddTask/>}/>            
            <Route path="/tasks/:id" element={<Task/>}/>
            <Route path="/todo" element={<TableTodoComponent/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>

            <Route path="/home" element={<Home/>} />
            <Route path="/login2" element={<Login2/>} />
            <Route path="/register2" element={<Register2/>} />

            {/* test data */}
            <Route path="/profile" element={<Profile/>} />
            <Route path="/user" element={<BoardUser/>} />
            <Route path="/mod" element={<BoardModerator/>} />
            <Route path="/admin" element={<BoardAdmin/>} />
         </Routes>

         <FooterComponent/>
      </div>
      </div>
   )
}


export default App
