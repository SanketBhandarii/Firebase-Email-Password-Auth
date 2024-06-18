import React, { useRef, useState } from "react";
import "../styles/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../context/Firebase";

function SignUp() {
  let email = useRef();
  let password = useRef();
  let fname = useRef();
  let lname = useRef();
  let navigate = useNavigate();

  let [eyeShow, setEyeShow] = useState(false);
  let firebase = useFirebase();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const userCredential = await firebase.signUpWithEmailAndPassword(
        email.current.value,
        password.current.value
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fname: fname.current.value,
        lname: lname.current.value,
        email: email.current.value,
      });

      toast.success(
        "Signup successful! You will be redirected to the login page.",
        { position: "top-center" }
      );

      email.current.value = "";
      password.current.value = "";
      fname.current.value = "";
      lname.current.value = "";

      setTimeout(() => {
        navigate("/");
      }, 3000); // Redirect after 3 seconds
    } catch (error) {
      console.error("Error during sign up:", error);
      toast.error("SignUp failed. Please check details.", {
        position: "top-center",
      });
    }
  }

  return (
    <div className="addUser">
      <form method="POST" onSubmit={(event) => handleSubmit(event)}>
        <p>
          Already have an account? <NavLink to={"/"}>Login</NavLink>
        </p>
        <br />
        <h3>Sign Up</h3>

        <div className="inputGroup">
          <label htmlFor="fname">First Name</label>
          <input
            type="text"
            id="fname"
            name="fname"
            autoComplete="off"
            placeholder="First Name"
            ref={fname}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="lname">Last Name</label>
          <input
            type="text"
            id="lname"
            name="lname"
            autoComplete="off"
            placeholder="Last Name"
            ref={lname}
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
            <label htmlFor="password">Password</label>
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
