import { auth, googleProvider, db } from "../config/firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";
import "../Styles/Auth.css";

function Auth(props) {
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
              const user = auth.currentUser;
              const usersCollection = collection(db, "users");
              getDocs(usersCollection).then((querySnapshot) => {
                const userExists = querySnapshot.docs.some(
                  (doc) => doc.data().uid === user.uid
                );
                if (!userExists) {
                  // Use setDoc() to set the document data with the custom document ID
                  setDoc(doc(db, "users", user.uid), {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                  });
                }
              });
            });
            if (props.setShowAuth) {
              props.setShowAuth(false);
            }
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
