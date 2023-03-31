import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Header from "./Components/Header";
import StartupScreen from "./Pages/StartupScreen";
import DraftBoard from "./Pages/DraftBoard";

function App() {
  // mobile view: 254 x 462
  const [screenSize, setScreenSize] = useState(
    window.innerWidth < 360 ? "mobile" : window.innerWidth < 790 ? "tablet" : "desktop"
  );
  const [savedDrafts, setSavedDrafts] = useState(
    localStorage.getItem("savedDrafts")
      ? JSON.parse(localStorage.getItem("savedDrafts"))
      : []
  );

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
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <StartupScreen
              savedDrafts={savedDrafts}
              setSavedDrafts={setSavedDrafts}
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
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
