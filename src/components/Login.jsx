import React, { useRef, useState } from "react";
import "../styles/SignUp.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../context/Firebase";

function Login() {
  const email = useRef();
  const password = useRef();
  
  const [eyeShow, setEyeShow] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userFirstName, setUserFirstName] = useState(null);
  const firebase = useFirebase();

  async function fetchUserInfo(uid) {
    try {
      const userRef = doc(db, "users", uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        setUserFirstName(userData.fname);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    firebase
      .loginWithEmailAndPassword(email.current.value, password.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedIn(true);
        fetchUserInfo(user.uid); // Fetch user info using UID
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
    setUserFirstName(null);
  }

  return (
    <>
      {loggedIn ? (
        <div>
          <h3 id="wel">Welcome, {userFirstName}!</h3>
          <img
            src="https://media1.giphy.com/media/lXo8uSnIkaB9e/giphy.gif"
            width={300}
            alt="Welcome GIF"
          />
          <div className="inputGroup">
            <button onClick={() => logout()}>LogOut</button>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="addUser">
          <ToastContainer/>
          <form method="POST" onSubmit={handleSubmit}>
            <p>
              Don't have an account? <NavLink to={"/signup"}>SignUp</NavLink>
            </p>
            <br />
            <h3>Login</h3>
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
              <button type="submit">Login</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
