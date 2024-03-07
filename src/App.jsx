import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Header from "./Components/Header";
import StartupScreen from "./Pages/StartupScreen";
import DraftBoard from "./Pages/DraftBoard";
import ContestPage from "./Pages/ContestPage";
import LotteryContest from "./Pages/LotteryContest";
import SecretAdminPage from "./Pages/SecretAdminPage";
import PastContests from "./Pages/PastContests";
import ContestLanding from "./Pages/ContestLanding";
import { auth } from "./config/firebase-config";
import SavedDraftsPage from "./Pages/SavedDraftsPage";
import Home from "./Pages/Home";

function App() {
  const [user, setUser] = useState(null);
  const [screenSize, setScreenSize] = useState(
    window.innerWidth < 420
      ? "mobile"
      : window.innerWidth < 790
      ? "tablet"
      : "desktop"
  );

  // Listen for changes in user authentication state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // handle screen size changes
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
      <Header user={user} screenSize={screenSize} />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home/>} />
          {/* <Route path="/" element={<StartupScreen user={user} />} /> */}
          <Route
            path="/draft-board"
            element={
              <DraftBoard
                screenSize={screenSize}
                setScreenSize={setScreenSize}
                user={user}
              />
            }
          />
          {/* <Route path="/contests" element={<LotteryContest user={user} />} /> */}
          <Route
            path="/contest-landing"
            element={<ContestLanding user={user} />}
          />
          {/* <Route path="/contests" element={<ContestPage user={user} />} /> */}
          <Route path="/past-contests" element={<PastContests user={user} />} />
          <Route path="/admin-page" element={<SecretAdminPage />} />
          <Route path="/saved-drafts" element={<SavedDraftsPage user={user} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
