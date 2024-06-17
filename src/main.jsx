import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import SignUp from './SignUp.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './Login.jsx'

const router = createBrowserRouter([
  {
    path : "/",
    element : <Login/>
  },
  {
    path : "/signup",
    element : <SignUp/>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
