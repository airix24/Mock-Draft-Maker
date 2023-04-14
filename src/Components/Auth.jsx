import { useState } from "react";
import { auth, googleProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FaTimes } from "react-icons/fa";
import "../Styles/Auth.css";

// log in with email and password
function Auth(props) {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   async function signIn() {
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  async function signInWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  }

  async function logOut() {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* <input
            type="email"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button onClick={signIn}>Sign In</button> */}

      {/* <button onClick={signInWithGoogle}>Sign in with Google</button> */}

      {props.user ? (
        <button
          onClick={() => {
            logOut();
            if (props.setShowAuth) {
              props.setShowAuth(false);
            }
          }}
        >
          Log Out
        </button>
      ) : (
        <button
          className="google-login-button"
          onClick={() => {
            signInWithGoogle();
            if (props.setShowAuth) {
              props.setShowAuth(false);
            }
          }}
        >
          <img
            className="google-icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="Google Icon"
          />
          <span className="google-button-text">Log in with Google</span>
        </button>
      )}
    </div>
  );
}

export default Auth;
