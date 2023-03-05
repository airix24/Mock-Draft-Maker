import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Header from "./Components/Header";
import StartupScreen from "./Pages/StartupScreen";
import DraftBoard from "./Pages/DraftBoard";
import NewSavedDrafts from "./Pages/SavedDrafts";

function App() {
  const [savedDrafts, setSavedDrafts] = useState(
    localStorage.getItem("savedDrafts")
      ? JSON.parse(localStorage.getItem("savedDrafts"))
      : []
  );

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<StartupScreen />} />
        <Route
          path="/draft-board"
          element={<DraftBoard savedDrafts={savedDrafts} setSavedDrafts={setSavedDrafts} />}
        />
        <Route
          path="/saved-drafts"
          element={<NewSavedDrafts savedDrafts={savedDrafts} />}
        />
      </Routes>
    </div>
  );
}

export default App;
