import React, { useRef, useState } from "react";
import "../styles/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

function SignUp() {

  let email = useRef();
  let password = useRef();
  let navigate = useNavigate();

  let [eyeShow, setEyeShow] = useState(false);
  let firebase = useFirebase();
  console.log(firebase);

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .signUpWithEmailAndPassword(email.current.value, password.current.value)
      .then(() => {
        toast.success(
          "Signup successful you will be redirected to login page",
          { position: "top-center" }
        );
        email.current.value = "";
        password.current.value = "";
      })
      .catch((error) => {
        toast.error("SignUp failed. Please check details", {
          position: "top-center",
        });
        email.current.value = "";
        password.current.value = "";
      });

    setTimeout(() => {
      navigate("/");
    }, 6000);
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
          <button type="submit">SignUp</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
