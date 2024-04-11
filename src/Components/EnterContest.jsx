import { useState, useEffect } from "react";
import Modal from "./Modal";
import "../Styles/EnterContest.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { incrementEntryCount } from "../utils/firebaseFunctions";

function EnterContest(props) {
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get saved drafts that are eligible for the current contest
  useEffect(() => {
    const getSavedDrafts = async () => {
      try {
        // get saved drafts collection reference for the current user
        const usersCollectionRef = collection(db, "users");
        const savedDraftsCollectionRef = collection(
          usersCollectionRef,
          props.user.uid,
          "savedDrafts"
        );

        // query saved drafts that match the current contest's prospect class and league
        const q = query(
          savedDraftsCollectionRef,
          where("prospectClass", "==", props.currContest.prospectClass),
          where("league", "==", props.currContest.league)
        );

        const querySnapshot = await getDocs(q);

        // filter saved drafts that match the current contest's draft length
        const filteredDrafts = querySnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter(
            (draft) => draft.draft.length === props.currContest.draftLength
          );

        setSavedDrafts(filteredDrafts);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };

    getSavedDrafts();
  }, [props.currContest, props.user.uid]);

  // enter the contest with the selected saved draft
  const handleEnterContest = async () => {
    const draftId = document.querySelector("select").value;
    const selectedDraft = savedDrafts.find((draft) => draft.id === draftId);
    const entriesCollectionRef = collection(
      db,
      "contests",
      props.currContest.id,
      "entries"
    );
    try {
      await setDoc(doc(entriesCollectionRef, props.user.uid), selectedDraft, {
        merge: true,
      }).then(() => {
        incrementEntryCount(props.currContest.id);
      });
      props.setShowEnterContest(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal setShowSelf={props.setShowEnterContest}>
      {isLoading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {props.isContestClosed ? (
            <div className="loading-container-for-modal">
              <h2 className="light">Contest is closed.</h2>
            </div>
          ) : (
            <>
              {savedDrafts.length === 0 ? (
                <div className="enter-contest-content">
                  <p className="light">
                    You have no saved drafts that are eligible for this contest.
                  </p>
                  <Link
                    to="/draft-board"
                    state={{
                      league: props.currContest.league,
                      prospectClass: props.currContest.prospectClass,
                      mode: "builder",
                      draftLength: props.currContest.draftLength,
                      draftData: null,
                    }}
                  >
                    <button className="med-blue-btn">Make a Mock Draft</button>
                  </Link>
                </div>
              ) : (
                <div className="enter-contest-content">
                  <h2>Choose a Saved Draft</h2>
                  <select>
                    {savedDrafts.map((draft, index) => (
                      <option key={index} value={draft.draftId}>
                        {draft.draftName}
                      </option>
                    ))}
                  </select>
                  <button
                    className="med-blue-btn"
                    onClick={() => {
                      handleEnterContest().then(() => {
                        props.setDraftJustEntered((prev) => !prev);
                      });
                    }}
                  >
                    Enter
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Modal>
  );
}

export default EnterContest;
