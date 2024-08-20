import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Post from "./pages/Post"; // Import the PostPage component
import ErrorPage from "./error-page";
import Login from "./pages/Login";
import FeedbackForm from "./pages/Feedback";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "post",
        element: <Post />, // Add the route for the PostPage
      },
      {
        path: "login",
        element: <Login />, // Add the route for the PostPage
      },
      {
        path: "Feedback",
        element: <FeedbackForm />,
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
