import { useState, useEffect } from "react";
import "../Styles/SavedDrafts.css";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import Modal from "./Modal";
import ViewDraft from "./ViewDraft";

function SavedDrafts(props) {
  const [currDraft, setCurrDraft] = useState(null);
  const [savedDrafts, setSavedDrafts] = useState([]);

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
          <h2>{draft.draftName}</h2>
          <h4 className="light">{date}</h4>
          {draft.contestsEntered &&
            draft.contestsEntered.includes("mainContest") && (
              <h4 className="contest-indicator">Entered in Main Contest</h4>
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
      {currDraft !== null ? (
        <ViewDraft
          draft={currDraft}
          setCurrDraft={setCurrDraft}
          user={props.user}
        />
      ) : (
        <div className="saved-draft-container">
          <div className="saved-drafts-top">
            <h1>Saved Drafts</h1>
          </div>
          {savedDraftElements.length === 0 ? (
            <h3 className="no-saved-drafts-message light">No saved drafts</h3>
          ) : (
            <div className="saved-draft-card-list">{savedDraftElements}</div>
          )}
        </div>
      )}
    </Modal>
  );
}

export default SavedDrafts;
