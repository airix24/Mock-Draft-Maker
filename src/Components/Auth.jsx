import { auth, googleProvider, db } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import "../Styles/Auth.css";

function Auth(props) {
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // User does not exist, so write their data to the database
        await setDoc(userDocRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        });
      }
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
    <div className="auth">
      {props.user ? (
        <div className="logout-div">
          <img
            className="user-photo"
            src={props.user.photoURL}
            alt="User Profile"
          />
          <h3 className="light user-email">{props.user.email}</h3>
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
        </div>
      ) : (
        <button
          className="google-login-button"
          onClick={() => {
            signInWithGoogle().then(() => {
              if (props.setShowAuth) {
                props.setShowAuth(false);
              }
            });
          }}
        >
          <img
            className="google-icon"
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google Icon"
          />
          <span className="google-button-text">Sign in with Google</span>
        </button>
      )}
    </div>
  );
}

export default Auth;
