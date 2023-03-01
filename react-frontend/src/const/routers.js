import TasksList from "components/TasksList"
import AddTask from "components/AddTask"
import Task from "components/Task"
import TableTodoComponent from "components/TableTodoComponent"
import Register from "pages/Register"
import Login from "pages/Login"
import Home from "components/Home"
import Login2 from "components/login2"
import Register2 from "components/Register2"
import Profile from "components/Profile"
import BoardUser from "components/BoardUser"
import BoardModerator from "components/BoardModerator"
import BoardAdmin from "components/BoardAdmin"
import React from "react"
import {Verify} from "pages/Verify"

export const ROUTERS = [
   {path: "/", element: <TasksList/>},
   {path: "/tasks", element: <TasksList/>},
   {path: "/add", element: <AddTask/>},
   {path: "/tasks/:id", element: <Task/>},
   {path: "/todo", element: <TableTodoComponent/>},
   {path: "/register", element: <Register/>},
   {path: "/login", element: <Login/>},
   {path: "/home", element: <Home/>},
   {path: "/login2", element: <Login2/>},
   {path: "/register2", element: <Register2/>},
   {path: "/profile", element: <Profile/>},
   {path: "/user", element: <BoardUser/>},
   {path: "/mod", element: <BoardModerator/>},
   {path: "/admin", element: <BoardAdmin/>},
   {path: "/verify/:token", element: <Verify/>},
]
