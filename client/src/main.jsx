import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import readAllTasks from "./services/readAllTasks.js";

import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Tasks from "./pages/Tasks.jsx";
import "./index.css";
import TaskDetail from "./pages/TaskDetail.jsx";

const router = createBrowserRouter([
  {
    element: <App />,

    children: [
      {
        path: "/",
        element: <Home />,
        loader: readAllTasks,
      },
      { path: "/tasks", element: <Tasks />, loader: readAllTasks },
      {
        path: "/task/:id",
        element: <TaskDetail />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
