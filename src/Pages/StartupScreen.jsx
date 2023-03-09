import React from "react";
import { Link } from "react-router-dom";
import "../Styles/StartupScreen.css";
import DraftSettings from "../Components/DraftSettings";
import SavedDrafts from "../Components/SavedDrafts";

function StartupScreen(props) {
  const [showDraftSettings, setShowDraftSettings] = React.useState(false);
  const [showSavedDrafts, setShowSavedDrafts] = React.useState(false);

  return (
    <>
      <div className="context">
        <div className="startup-menu-content">
          <button
            className="startup-btn disabled"
            onClick={() => setShowDraftSettings(true)}
          >
            <h3>Be The GM</h3>
          </button>
          <button className="startup-btn">
            <h3>
              <Link to="/draft-board" className="startup-link">
                Playground
              </Link>
            </h3>
          </button>
          <button
            className="startup-btn"
            onClick={() => setShowSavedDrafts(true)}
          >
            <h3>Saved Drafts</h3>
          </button>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      {showDraftSettings && (
        <DraftSettings setShowDraftSettings={setShowDraftSettings} />
      )}
      {showSavedDrafts && (
        <SavedDrafts
          setShowSavedDrafts={setShowSavedDrafts}
          savedDrafts={props.savedDrafts}
        />
      )}
    </>
  );
}

export default StartupScreen;
