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
    <div className="start-screen">
      <div className="context">
        <div className="startup-menu-content">
          <button
            className="startup-btn"
            onClick={() => setShowDraftSettings(true)}
          >
            <h3>Be The GM</h3>
          </button>
          <Link to="/draft-board" className="startup-link">
            <button className="startup-btn">
              <h3>Mock Builder</h3>
            </button>
          </Link>
          <button
            className="startup-btn"
            onClick={() => setShowSavedDrafts(true)}
          >
            <h3>Saved Drafts</h3>
          </button>
          <Link to="/contest" className="startup-link">
            <button className="startup-btn contest-btn">
              <h3>Contest</h3>
            </button>
          </Link>
        </div>
      </div>
      {/* <div className="area">
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
      </div> */}
      {showDraftSettings && (
        <DraftSettings setShowDraftSettings={setShowDraftSettings} />
      )}
      {showSavedDrafts && (
        <SavedDrafts
          setShowSavedDrafts={setShowSavedDrafts}
          savedDrafts={props.savedDrafts}
          setSavedDrafts={props.setSavedDrafts}
          setShowViewDraft={setShowViewDraft}
          setCurrDraft={setCurrDraft}
        />
      )}
      {showViewDraft && (
        <ViewDraft
          setShowViewDraft={setShowViewDraft}
          setShowSavedDrafts={setShowSavedDrafts}
          currDraft={currDraft}
          setSavedDrafts={props.setSavedDrafts}
        />
      )}
    </div>
  );
}

export default StartupScreen;
