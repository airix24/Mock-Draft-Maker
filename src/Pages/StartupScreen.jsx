import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/StartupScreen.css";
import DraftSettings from "../Components/DraftSettings";
import SavedDrafts from "../Components/SavedDrafts";
import ViewDraft from "../Components/ViewDraft";

function StartupScreen(props) {
  const [showDraftSettings, setShowDraftSettings] = useState(false);
  const [showSavedDrafts, setShowSavedDrafts] = useState(false);
  const [showViewDraft, setShowViewDraft] = useState(false);
  const [currDraft, setCurrDraft] = useState({});

  return (
    <div>
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
                Mock Builder
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
          setShowViewDraft={setShowViewDraft}
          setCurrDraft={setCurrDraft}
        />
      )}
      {showViewDraft && (
        <ViewDraft
          setShowViewDraft={setShowViewDraft}
          setShowSavedDrafts={setShowSavedDrafts}
          currDraft={currDraft}
        />
      )}
    </div>
  );
}

export default StartupScreen;
