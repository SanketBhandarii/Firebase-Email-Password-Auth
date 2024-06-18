import React, { useEffect, useRef, useState } from "react";
import "../styles/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

function Login() {
  let email = useRef();
  let password = useRef();

  let [eyeShow, setEyeShow] = useState(false);
  let [loggedIn, setLoggedIn] = useState(false);
  let firebase = useFirebase();

  useEffect(() => {
   setLoggedIn(localStorage.getItem("loggedIn"))
  }, [])

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .loginWithEmailAndPassword(email.current.value, password.current.value)
      .then(() => {
        setLoggedIn(true);
        localStorage.setItem("loggedIn", loggedIn);
        toast.success("Login Successful", { position: "top-center" });
        email.current.value = "";
        password.current.value = "";
      })
      .catch((error) => {
        toast.error("Login failed. Please check details", {
          position: "top-center",
        });
        email.current.value = "";
        password.current.value = "";
      });
  }

  function logout() {
    firebase.logout();
    setLoggedIn(false);
    localStorage.removeItem("loggedIn", loggedIn);
  }

  return (
    <>
      {loggedIn ? (
        <div>
          <h3 id="wel">Welcome </h3>
          <img src="https://media1.giphy.com/media/lXo8uSnIkaB9e/giphy.gif" width={400}/>
          <div className="inputGroup">
            <button onClick={() => logout()}>LogOut</button>
          </div>
        </div>
      ) : (
        <div className="addUser" onSubmit={(event) => handleSubmit(event)}>
          <form method="POST">
            <p>
              Don't have an account? <NavLink to={"/signup"}>SignUp</NavLink>
            </p>
            <br />
            <h3>Login </h3>
            <div className="inputGroup">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Email"
                ref={email}
                required
              />
            </div>
            <div className="inputGroup">
              <div className="eye">
                <label htmlFor="lname">Password</label>
                {eyeShow ? (
                  <i
                    className="fa-solid fa-eye-slash"
                    onClick={() => setEyeShow(!eyeShow)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye"
                    onClick={() => setEyeShow(!eyeShow)}
                  ></i>
                )}
              </div>
              <input
                type={eyeShow ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="off"
                placeholder="Password"
                ref={password}
                required
              />
            </div>

            <div className="inputGroup">
              <button type="submit">Login</button>
            </div>
          </form>
          <ToastContainer />
        </div>
      )}
    </>
  );
}

export default Login;
