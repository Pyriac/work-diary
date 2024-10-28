import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import UserProvider from "./contexts/userContext.jsx";

import readAllTasks from "./services/readAllTasks.js";
import readTask from "./services/readTask.js";
import AddTasks from "./services/addTasks.js";
import profilServices from "./services/ProfilServices.js";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import Login from "./pages/Login.jsx";
import TaskDetail from "./pages/TaskDetail.jsx";
import Register from "./pages/Register.jsx";
import AddTask from "./pages/AddTask.jsx";
import Profil from "./pages/Profil.jsx";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
        loader: readAllTasks,
        errorElement: <Login />,
      },
      {
        path: "/profil",
        element: <Profil />,
        loader: profilServices.readProfil,
      },
      {
        path: "/tasks",
        element: <Tasks />,
        loader: readAllTasks,
      },
      {
        path: "/task/:id",
        element: <TaskDetail />,
        loader: readTask,
      },
      {
        path: "/add/task",
        element: <AddTask />,
        action: AddTasks,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
