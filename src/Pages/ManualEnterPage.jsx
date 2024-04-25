import { useState, useEffect } from "react";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import {
  checkIfUserEnteredContest,
  enterDraftIntoContest,
} from "../utils/firebaseFunctions";

function ManualEnterPage(props) {
  const [contests, setContests] = useState([]);
  const [userSavedDrafts, setUserSavedDrafts] = useState([]);
  const [contestID, setContestID] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedSavedDraft, setSelectedSavedDraft] = useState("");
  const [userEntered, setUserEntered] = useState(false);

  console.log(userSavedDrafts);

  // get all contests
  useEffect(() => {
    const getContests = async () => {
      const data = await getDocs(collection(db, "contests"));
      return data.docs.map((doc) => doc.data());
    };
    getContests().then((data) => {
      setContests(data);
    });
  }, []);

  // check if user is entered
  useEffect(() => {
    if (selectedUser && contestID) {
      checkIfUserEnteredContest(selectedUser, contestID).then((result) => {
        setUserEntered(result);
      });
    }
  }, [selectedUser, contestID]);

  // get all saved drafts for a user
  useEffect(() => {
    const getSavedDrafts = async () => {
      if (selectedUser) {
        // check if selectedUser is not null or undefined
        const data = await getDocs(
          collection(db, "users", selectedUser, "savedDrafts")
        );
        return data.docs.map((doc) => doc.data());
      }
      return []; // return an empty array if selectedUser is not defined
    };
    getSavedDrafts().then((data) => {
      setUserSavedDrafts(data);
    });
  }, [selectedUser]);

  return (
    <div className="secret-admin-page">
      {props.user && props.user.uid === "f0HuOsXS7XTsJtsXvh197eqBGgw2" ? (
        <div className="admin-main">
          <h1>Manual Enter Page</h1>
          <div className="admin-section manual-enter-section">
            <h2>Manually Enter Draft</h2>
            <h5>{selectedUser}</h5>
            <form className="manual-enter-form">
              {/* start with selecting a contest */}
              <label htmlFor="contest">Select a contest:</label>
              <select
                name="contest"
                id="contest"
                onChange={(e) => {
                  setContestID(e.target.value);
                }}
              >
                <option value="">Select a contest</option>
                {contests.map((contest) => (
                  <option key={contest.id} value={contest.id}>
                    {contest.name}
                  </option>
                ))}
              </select>
              {/* then type in uid of user */}
              <label htmlFor="user">Enter the user's uid:</label>
              <input
                type="text"
                id="user"
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                }}
              />

              {/* then select a saved draft */}
              <label htmlFor="savedDraft">Select a saved draft:</label>
              <select
                name="savedDraft"
                id="savedDraft"
                onChange={(e) => {
                  setSelectedSavedDraft(e.target.value);
                }}
              >
                <option value="">Select a saved draft</option>
                {userSavedDrafts.map((draft) => (
                  <option key={draft.draftId} value={draft.draftId}>
                    {draft.draftName}
                  </option>
                ))}
              </select>
              {/* finally, submit the draft */}
              <button
                className="med-blue-btn man-enter-btn"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  const draft = userSavedDrafts.find(
                    (draft) => draft.draftId === selectedSavedDraft
                  );
                  console.log(draft);
                  enterDraftIntoContest(selectedUser, contestID, draft);
                  console.log("entered draft");
                }}
              >
                Manually Enter
              </button>
            </form>
          </div>
          <div className="admin-section">
            <h2>Is user entered?</h2>
            {selectedUser && contestID && (
              <h1
                style={{
                  color: userEntered ? "green" : "red",
                }}
              >
                User: {selectedUser} is{" "}
                {userEntered ? "entered" : "NOT entered"}
              </h1>
            )}
          </div>
        </div>
      ) : (
        <div>You do not have access to this page</div>
      )}
    </div>
  );
}

export default ManualEnterPage;
