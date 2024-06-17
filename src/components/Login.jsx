import React, { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "../styles/SignUp.css";
import { app } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

function Login() {
  const auth = getAuth(app);
  let email = useRef();
  let password = useRef();

  let [eyeShow, setEyeShow] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.valu
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
            <div className="eye">
              <label htmlFor="lname">Password</label>
              {eyeShow ? (
                <i
                  class="fa-solid fa-eye-slash"
                  onClick={() => setEyeShow(!eyeShow)}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-eye"
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
    </>
  );
}

export default Login;
