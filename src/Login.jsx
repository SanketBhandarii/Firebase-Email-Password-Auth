import React, { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./SignUp.css";
import { app } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

function Login() {
  const auth = getAuth(app);
  let email = useRef();
  let password = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(() => {
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

  return (
    <>
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
            <label htmlFor="lname">Password</label>
            <input
              type="password"
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
    </>
  );
}

export default Login;
