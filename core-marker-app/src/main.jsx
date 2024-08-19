import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ErrorPage from "./error-page";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/home",
    element: <Home />,
    loader: async () => {
      const response = await fetch("/api/check-auth", {
        credentials: "include",
      });
      const data = await response.json();
      if (!data.isAuthenticated) {
        throw new Response(null, {
          status: 302,
          headers: { Location: "/login" },
        });
      }
      return null;
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
