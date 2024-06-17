import React, { useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import "./SignUp.css";
import { app } from "../../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

function SignUp() {
  const auth = getAuth(app);
  let email = useRef();
  let password = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then(toast.success("Sign Up Successful", { position: "top-center" }))
      .catch((err) => console.log(err));
    email.current.value = "";
    password.current.value = "";
  }

  return (
    <div className="addUser" onSubmit={(event) => handleSubmit(event)}>
      <form method="POST">
        <p>
          Already have an account? <NavLink to={"/"}>Login</NavLink>
        </p>
        <br />
        <h3>Sign Up</h3>
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
            type="text"
            id="password"
            name="password"
            autoComplete="off"
            placeholder="Password"
            ref={password}
            required
          />
        </div>

        <div className="inputGroup">
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
