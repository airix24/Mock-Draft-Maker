import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import "../Styles/EnterContest.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function EnterContest({ user, setContest, contest, setShowEnterContest }) {
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDraftId, setSelectedDraftId] = useState(
    savedDrafts.length > 0 ? savedDrafts[0].draftId : ""
  );

  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(
    usersCollection,
    user.uid,
    "savedDrafts"
  );

  useEffect(() => {
    if (
      contest &&
      contest.league &&
      contest.prospectClass &&
      contest.draftLength
    ) {
      const getSavedDrafts = async () => {
        try {
          const querySnapshot = await getDocs(savedDraftsCollection);
          const filteredDrafts = querySnapshot.docs
            .map((doc) => doc.data())
            .filter(
              (draft) =>
                draft.league === contest.league &&
                draft.prospectClass === contest.prospectClass &&
                draft.draft.length === contest.draftLength
            );
          setSavedDrafts(filteredDrafts);
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      };
      getSavedDrafts();
    }
  }, [contest, savedDraftsCollection]);

  // const handleEnterContest = async (contestId, draftId, isUserEntered) => {
  //   if (isUserEntered) {
  //     setShowEnterContest(false);
  //     return;
  //   }
  //   const selectedDraft = savedDrafts.find(
  //     (draft) => draft.draftId === draftId
  //   );
  //   const contestsEntered = [...selectedDraft.contestsEntered, contestId];
  //   try {
  //     await updateDoc(doc(db, "users", user.uid, "savedDrafts", draftId), {
  //       contestsEntered: contestsEntered,
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setContest({ ...contest, isUserEntered: true });
  //   setShowEnterContest(false);
  // };

  return (
    <Modal setShowSelf={setShowEnterContest}>
      {isLoading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
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
                  league: contest.league,
                  prospectClass: contest.prospectClass,
                  mode: "builder",
                  draftLength: contest.draftLength,
                  draftData: null,
                }}
              >
                <button className="med-blue-btn">Go to Mock Builder</button>
              </Link>
            </div>
          ) : (
            <div className="enter-contest-content">
              <label htmlFor="draftSelect">Select a Saved Draft:</label>
              <select
                id="draftSelect"
                value={selectedDraftId}
                onChange={(e) => setSelectedDraftId(e.target.value)}
              >
                {savedDrafts.map((draft, index) => (
                  <option key={index} value={draft.draftId}>
                    {draft.draftName}
                  </option>
                ))}
              </select>
              <button
                className="med-blue-btn"
                onClick={() =>
                  handleEnterContest(
                    contest.id,
                    selectedDraftId,
                    contest.isUserEntered
                  )
                }
              >
                Enter
              </button>
            </div>
          )}
        </>
      )}
    </Modal>
  );
}

export default EnterContest;
