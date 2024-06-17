import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import "./index.css";
import SignUp from "./components/SignUp.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login.jsx";
import FireBaseProvider from "../context/Firebase.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <FireBaseProvider>
    <RouterProvider router={router} />
  </FireBaseProvider>
);
