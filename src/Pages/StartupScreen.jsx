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

  const adminId = import.meta.env.VITE_MY_UID;

  return (
    <div className="start-screen-container">
      <div className="startup-menu-btns">
        {/* <Link to="/draft-board" className="startup-link">
          <button className="startup-btn" tabIndex={-1}>
            <h3>Mock Builder</h3>
          </button>
        </Link> */}
        <button
          className="startup-btn"
          onClick={() => setShowDraftSettings(true)}
        >
          <h3>Mock Builder</h3>
        </button>
        <button
          className={`startup-btn ${props.user ? "" : "disabled"}`}
          onClick={() => setShowSavedDrafts(true)}
        >
          <h3>Saved Drafts</h3>
        </button>
        <Link to="/contests" className="startup-link">
          <button className="startup-btn" tabIndex={-1}>
            <h3>Contests</h3>
          </button>
        </Link>

        {props.user && props.user.uid === adminId && (
          <Link to="/admin-page" className="startup-link">
            <button className="startup-btn" tabIndex={-1}>
              <h3>Secret Admin Page</h3>
            </button>
          </Link>
        )}
      </div>
      <div className="contact-div light">
        {/* <h4 className="contact-twitter">
          Twitter:{" "}
          <a
            className="twitter-link light"
            href="https://twitter.com/Mock_Mayhem"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Mock_Mayhem
          </a>
        </h4> */}
        <h4 className="contact-email">Email: MockMayhem1@gmail.com</h4>
      </div>
      {showDraftSettings && (
        <DraftSettings setShowDraftSettings={setShowDraftSettings} />
      )}
      {showSavedDrafts && (
        <SavedDrafts
          setShowSavedDrafts={setShowSavedDrafts}
          setShowViewDraft={setShowViewDraft}
          setCurrDraft={setCurrDraft}
          user={props.user}
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
