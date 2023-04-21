import { useState, useEffect } from "react";
import "../Styles/Contest.css";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import ViewDraft from "../Components/ViewDraft";
import Leaderboard from "../Components/Leaderboard";
import EnterContest from "../Components/EnterContest";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { convertTime } from "../util";
import ContestRules from "../Components/ContestRules";

function Contest(props) {
  const [showAuth, setShowAuth] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeUntilClose, setTimeUntilClose] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showEnterContest, setShowEnterContest] = useState(false);
  const [contestEntry, setContestEntry] = useState(null);
  const [showViewEntry, setShowViewEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // time is in UTC
  const CLOSE_TIME = new Date("April 27, 2023 23:00:00");

  // set contest entry if user has already entered. After this is done, set isLoading to false
  useEffect(() => {
    setIsLoading(true);
    if (props.user) {
      const usersCollection = collection(db, "users");
      const savedDraftsCollection = collection(
        usersCollection,
        props.user.uid,
        "savedDrafts"
      );
      const getSavedDrafts = async () => {
        try {
          const data = await getDocs(savedDraftsCollection);
          const savedDrafts = data.docs.map((doc) => doc.data());
          const enteredDraft = savedDrafts.find((draft) => {
            return draft.contestsEntered.includes("mainContest");
          });
          if (enteredDraft) {
            setContestEntry(enteredDraft);
          }
          setIsLoading(false);
        } catch (e) {
          console.error(e);
        }
      };
      getSavedDrafts();
    } else {
      setIsLoading(false);
    }
  }, [props.user]);

  // set time until close, and update every second
  useEffect(() => {
    const localTimezoneOffset = new Date().getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const closeDateUTC = new Date(CLOSE_TIME);
    const closeDateLocalTimezone = new Date(closeDateUTC - localTimezoneOffset); // Adjust for local timezone
    const timeDiff = closeDateLocalTimezone - new Date();
    setTimeUntilClose(timeDiff);
    const interval = setInterval(() => {
      const timeDiff = closeDateLocalTimezone - new Date();
      setTimeUntilClose(timeDiff);
    }, 1000);
    setIsLoading(false);
    return () => clearInterval(interval);
  }, []);

  // function that removes mainContest from contestsEntered array of a draft in the database
  async function removeEntryFromMainContest() {
    try {
      const usersCollection = collection(db, "users");
      const savedDraftsCollection = collection(
        usersCollection,
        props.user.uid,
        "savedDrafts"
      );
      const data = await getDocs(savedDraftsCollection);
      // Loop through all saved drafts and remove mainContest from contestsEntered array
      for (const doc of data.docs) {
        const draft = doc.data();
        if (draft.contestsEntered.includes("mainContest")) {
          const docRef = doc.ref; // Get document reference
          await updateDoc(docRef, { contestsEntered: [] });
        }
      }
      setShowViewEntry(false);
      setContestEntry(null);
    } catch (error) {
      console.error("Error removing main contest entry:", error);
    }
  }

  return (
    <div className="contest-screen">
      {isLoading ? (
        <div className="loading-contest">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          {showLeaderboard && <Leaderboard setShowLeaderboard={setShowLeaderboard} />}
          {showEnterContest && (
            <EnterContest
              setShowEnterContest={setShowEnterContest}
              user={props.user}
              contestEntry={contestEntry}
              setContestEntry={setContestEntry}
            />
          )}
          {showViewEntry && (
            <Modal setShowSelf={setShowViewEntry}>
              <ViewDraft
                draft={contestEntry}
                setShowViewEntry={setShowViewEntry}
                user={props.user}
                isViewingFromContestPage={true}
                removeEntryFromMainContest={removeEntryFromMainContest}
              />
            </Modal>
          )}

          <div className="contest-container">
            {showAuth ? (
              <Modal setShowSelf={setShowAuth}>
                <Auth setShowAuth={setShowAuth} />
              </Modal>
            ) : null}
            <h1 className="contest-header">Mock Draft Contest 2023</h1>
            {timeUntilClose > 0 && (
              <h4>Closes in: {convertTime(timeUntilClose)}</h4>
            )}
            <div className="contest-desc-div">
              <h4 className="main-info">
                Enter this contest and see how your first round mock draft
                stacks up against others. May the most accurate mock win!
              </h4>
              {showInfo ? (
                <ContestRules setShowInfo={setShowInfo} />
              ) : (
                <button onClick={() => setShowInfo(true)}>More Info</button>
              )}
            </div>
            {/* once the draft has started, display a leaderboard instead or button to get to leaderboard */}

            <div className="contest-lower">
              {timeUntilClose <= 0 ? (
                <div>
                  <h1>It's contest Time</h1>
                  <button
                    className="med-blue-btn view-entry-btn"
                    onClick={() => setShowViewEntry(true)}
                  >
                    View Your Entry
                  </button>
                  <button onClick={() => setShowLeaderboard(true)}>
                    Leaderboard
                  </button>
                </div>
              ) : props.user && contestEntry ? (
                <div className="already-entered">
                  <h4 className="already-entered-text">You are Entered</h4>
                  <button
                    className="med-blue-btn view-entry-btn"
                    onClick={() => setShowViewEntry(true)}
                  >
                    View Your Entry
                  </button>
                  <button onClick={() => setShowLeaderboard(true)}>
                    Leaderboard
                  </button>
                </div>
              ) : props.user ? (
                <div className="contest-btns">
                  <h5>
                    (Once you enter a mock draft, you are still able to edit it
                    up until the contest closes)
                  </h5>
                  <button
                    className="big-blue-btn"
                    onClick={() => setShowEnterContest(true)}
                  >
                    Enter
                  </button>
                  <button onClick={() => setShowLeaderboard(true)}>
                    Leaderboard
                  </button>
                </div>
              ) : (
                <div>
                  <div className="contest-btns">
                    <h4>You must be signed in to enter the contest</h4>
                    <button
                      onClick={() => setShowAuth(true)}
                      className="big-blue-btn"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Contest;
