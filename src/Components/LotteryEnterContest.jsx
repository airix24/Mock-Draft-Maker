import { useState, useEffect } from "react";
import Modal from "./Modal";
import "../Styles/EnterContest.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function LotteryEnterContest(props) {
  // get saved drafts from database
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const filteredDrafts = data.docs
          .map((doc) => doc.data())
          .filter(
            (draft) => draft.league === "NBA" && draft.draft.length === 14
          );
        setSavedDrafts(filteredDrafts);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getSavedDrafts();
  }, []);

  const lotteryEnterContest = async () => {
    if (!props.contestEntry) {
      const mockId = document.querySelector("select").value;
      const mockDraft = savedDrafts.find((draft) => draft.draftId === mockId);
      const contestsEntered = mockDraft.contestsEntered;
      contestsEntered.push("lotteryContest");
      try {
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
      props.setShowLotteryEnterContest(false);
    } else {
      console.log("You have already entered this contest.");
    }
  };

  return (
    <Modal setShowSelf={props.setShowLotteryEnterContest}>
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
                      league: "NBA",
                      prospectClass: "NBA_2023",
                      mode: "builder",
                      draftLength: 14,
                      draftData: null,
                    }}
                  >
                    <button className="med-blue-btn">Go to Mock Builder</button>
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
                    onClick={lotteryEnterContest}
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

export default LotteryEnterContest;
