import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Header from "./Components/Header";
import StartupScreen from "./Pages/StartupScreen";
import DraftBoard from "./Pages/DraftBoard";
import Contest from "./Pages/Contest";

import { auth } from "./config/firebase-config";

function App() {
  const [screenSize, setScreenSize] = useState(
    window.innerWidth < 420
      ? "mobile"
      : window.innerWidth < 790
      ? "tablet"
      : "desktop"
  );
  const [savedDrafts, setSavedDrafts] = useState(
    localStorage.getItem("savedDrafts")
      ? JSON.parse(localStorage.getItem("savedDrafts"))
      : []
  );
  const [user, setUser] = useState(null);

  // Listen for changes in user authentication state
  useEffect(() => {
    // Listen for changes in user authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
      } else {
        // User is logged out
        setUser(null);
      }
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 360) {
        setScreenSize("mobile");
      } else if (window.innerWidth < 790) {
        setScreenSize("tablet");
      } else {
        setScreenSize("desktop");
      }
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="app">
      <Header user={user} />
      <Routes>
        <Route
          path="/"
          element={
            <StartupScreen
              savedDrafts={savedDrafts}
              setSavedDrafts={setSavedDrafts}
              user={user}
            />
          }
        />
        <Route
          path="/draft-board"
          element={
            <DraftBoard
              savedDrafts={savedDrafts}
              setSavedDrafts={setSavedDrafts}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              user={user}
            />
          }
        />
        <Route path="/contest" element={<Contest user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
