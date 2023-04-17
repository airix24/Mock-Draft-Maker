import { useState, useEffect } from "react";
import Modal from "./Modal";
import "../Styles/EnterContest.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function EnterContest(props) {
  // get saved drafts from database
  const [savedDrafts, setSavedDrafts] = useState([]);

  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(
    usersCollection,
    props.user.uid,
    "savedDrafts"
  );

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
  }, []);

  // add the mock id to the collection, "mainContestEntries", and add the contest to the mock draft's "contestsEntered" array (commented out adding to mainContestEntries collection)
  const EnterContest = async () => {
    if (!props.contestEntry) {
      // const mainContestEntriesCollection = collection(db, "mainContestEntries");
      const mockId = document.querySelector("select").value;
      const mockDraft = savedDrafts.find((draft) => draft.draftId === mockId);
      const contestsEntered = mockDraft.contestsEntered;
      contestsEntered.push("mainContest");
      try {
        // await addDoc(mainContestEntriesCollection, {
        //   draft: mockDraft,
        // });
        await updateDoc(
          doc(db, "users", props.user.uid, "savedDrafts", mockId),
          {
            contestsEntered: contestsEntered,
          }
        ).then(() => {
          props.setContestEntry(mockDraft);
        });
      } catch (e) {
        console.error(e);
      }
      props.setShowEnterContest(false);
    } else {
      console.log("You have already entered this contest.");
    }
  };

  return (
    <Modal setShowSelf={props.setShowEnterContest}>
      {savedDrafts.length === 0 ? (
        <div className="enter-contest-content">
          <p className="light">
            You have no saved drafts. Create and save a mock draft to enter the
            contest.
          </p>
          <Link to="/draft-board">
            <button className="med-blue-btn">Go to Mock Builder</button>
          </Link>
        </div>
      ) : (
        <div className="enter-contest-content">
          <h2>Choose a Draft</h2>
          <select>
            {savedDrafts.map((draft, index) => (
              <option key={index} value={draft.draftId}>
                {draft.draftName}
              </option>
            ))}
          </select>
          <button className="med-blue-btn" onClick={EnterContest}>
            Enter
          </button>
        </div>
      )}
    </Modal>
  );
}

export default EnterContest;
