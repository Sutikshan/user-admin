import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import { LoginPage } from "./app/auth/LoginPage.tsx";
import { Signup } from "./app/auth/Signup.tsx";
import { Customers } from "./app/home/customers.tsx";
import { Home } from "./app/home/home.tsx";
import { Overview } from "./app/home/overview.tsx";
import { Projects } from "./app/home/projects.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/home",
    element: <Home />,
    children: [
      {
        path: "overview",
        element: <Overview />,
        children: [],
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "customers",
        element: <Customers />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>
);
