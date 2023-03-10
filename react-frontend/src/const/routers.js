import TasksList from "components/tasks/kanban/TasksList"
import AddTask from "components/tasks/AddTask"
import Task from "components/tasks/Task"
import TableTodoComponent from "components/tasks/TableTodoComponent"
// import Register from "pages/Register"
// import Login from "pages/Login"
import Home from "components/Home"
import Login from "components/security/login"
import Register from "components/security/Register"
import Profile from "components/Profile"
import TeamsComponent from "../components/TeamsComponent"
import BoardUser from "components/users/BoardUser"
import BoardModerator from "components/users/BoardModerator"
import BoardAdmin from "components/users/BoardAdmin"
import React from "react"
import {Verify} from "pages/Verify"

export const ROUTERS = [
   {path: "/", element: <Home/>},
   {path: "/tasks", element: <TasksList/>},
   {path: "/add", element: <AddTask/>},
   {path: "/tasks/:id", element: <Task/>},
   {path: "/todo", element: <TableTodoComponent/>},
   {path: "/register", element: <Register/>},
   {path: "/login", element: <Login/>},
   {path: "/home", element: <Home/>},
   {path: "/profile", element: <Profile/>},
   {path: "/user", element: <BoardUser/>},
   {path: "/mod", element: <BoardModerator/>},
   {path: "/admin", element: <BoardAdmin/>},
   {path: "/verify/:token", element: <Verify/>},
   {path: "/teams", element: <TeamsComponent/>},
]
