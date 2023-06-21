import { useState, useEffect } from "react";
import "../Styles/SavedDrafts.css";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Modal from "./Modal";
import ViewDraft from "./ViewDraft";

function SavedDrafts(props) {
  const [currDraft, setCurrDraft] = useState(null);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currLeague, setCurrLeague] = useState("NFL");

  // get the saved drafts collection from the database
  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(
    usersCollection,
    props.user.uid,
    "savedDrafts"
  );

  // get the saved drafts from the database
  useEffect(() => {
    const getSavedDrafts = async () => {
      try {
        const data = await getDocs(savedDraftsCollection);
        setSavedDrafts(data.docs.map((doc) => doc.data()));
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getSavedDrafts();
  }, [currDraft]);

  // create a div for each saved draft
  // sort the drafts by date
  const savedDraftElements = savedDrafts
    .map((draft, index) => {
      // NBA tab gets all drafts with a league of NBA, NFL tab gets all drafts with a league of NFL and all drafts with no league
      if (
        (currLeague === "NBA" && draft.league !== "NBA") ||
        (currLeague === "NFL" && draft.league !== "NFL" && draft.league)
      ) {
        return;
      }
      // format the date
      const date = new Date(draft.createdAt.seconds * 1000).toLocaleDateString(
        "en-US",
        {
          year: "numeric",
          month: "long",
          day: "numeric",
        }
      );
      return (
        <button
          key={index}
          className="saved-draft-card"
          onClick={() => {
            setCurrDraft(draft);
          }}
        >
          <h2 className="saved-draft-name">{draft.draftName}</h2>
          <h4 className="saved-draft-date light">{date}</h4>
          {draft.contestsEntered && draft.contestsEntered.length > 0 && (
            <h4 className="contest-indicator">Entered in Contest</h4>
          )}
        </button>
      );
    })
    .sort((a, b) => {
      return (
        new Date(b.props.children[1].props.children) -
        new Date(a.props.children[1].props.children)
      );
    });

  return (
    <Modal setShowSelf={props.setShowSavedDrafts}>
      {isLoading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {currDraft !== null ? (
            <ViewDraft
              draft={currDraft}
              setCurrDraft={setCurrDraft}
              user={props.user}
              league={currDraft.league ? currDraft.league : "NFL"}
              prospectClass={
                currDraft.prospectClass ? currDraft.prospectClass : "NFL_2023"
              }
            />
          ) : (
            <div className="saved-draft-container">
              <div className="saved-drafts-top">
                <h1 className="saved-drafts-title">Saved Drafts</h1>
                <div className="saved-drafts-league-selector">
                  <button
                    className={`league-selector-button ${
                      currLeague === "NFL" ? "saved-drafts-selected" : ""
                    }`}
                    onClick={() => {
                      setCurrLeague("NFL");
                    }}
                  >
                    NFL
                  </button>
                  <button
                    className={`league-selector-button ${
                      currLeague === "NBA" ? "saved-drafts-selected" : ""
                    }`}
                    onClick={() => {
                      setCurrLeague("NBA");
                    }}
                  >
                    NBA
                  </button>
                </div>
              </div>
              {savedDraftElements.length === 0 ? (
                <h3 className="no-saved-drafts-message light">
                  No saved drafts
                </h3>
              ) : (
                <div className="saved-draft-card-list">
                  {savedDraftElements}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

export default SavedDrafts;
