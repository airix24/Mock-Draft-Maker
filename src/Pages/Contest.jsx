import { useState, useEffect } from "react";
import "../Styles/Contest.css";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import ViewDraft from "../Components/ViewDraft";
import ViewEntrants from "../Components/ViewEntrants";
import EnterContest from "../Components/EnterContest";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc } from "firebase/firestore";

function Contest(props) {
  const [showAuth, setShowAuth] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeUntilClose, setTimeUntilClose] = useState(0);
  const [showEntrants, setShowEntrants] = useState(false);
  const [showEnterContest, setShowEnterContest] = useState(false);
  const [contestEntry, setContestEntry] = useState(null);
  const [showViewEntry, setShowViewEntry] = useState(null);

  //calculate time until contest closes (4/27/23 7 PM ET), updates every second
  useEffect(() => {
    const closeDate = new Date("April 27, 2023 18:00:00");
    const timeDiff = closeDate - new Date();
    setTimeUntilClose(timeDiff);
    const interval = setInterval(() => {
      const timeDiff = closeDate - new Date();
      setTimeUntilClose(timeDiff);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  //function that converts milliseconds to days, hours, minutes, seconds, returns a string
  function convertTime(time) {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  // checks to see if user has a saved draft in the database that is entered in the main contest, if so, sets the contestEntry state to that draft
  useEffect(() => {
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
        } catch (e) {
          console.error(e);
        }
      };
      getSavedDrafts();
    }
  }, [props.user]);

  async function removeEntryFromMainContest() {
    try {
      const usersCollection = collection(db, "users");
      const savedDraftsCollection = collection(
        usersCollection,
        props.user.uid,
        "savedDrafts"
      );
      const data = await getDocs(savedDraftsCollection);
      // Update Firestore documents for each saved draft
      for (const doc of data.docs) {
        const draft = doc.data();
        if (draft.contestsEntered.includes("mainContest")) {
          const docRef = doc.ref; // Get document reference
          await updateDoc(docRef, { contestsEntered: [] });
          // Remove entry with the same id from the mainContestEntries collection (doesn't work)
          // const mainContestEntriesCollection = collection(db, "mainContestEntries");
          // const mainContestEntriesData = await getDocs(mainContestEntriesCollection);
          // for (const entry of mainContestEntriesData.docs) {
          //   console.log(entry.data, draft.id)
          //   if (entry.id === draft.id) {
          //     await entry.ref.delete();
          //   }
          // }
        }
      }
      setShowViewEntry(false);
      setContestEntry(null);
      console.log("Main contest entry removed successfully.");
    } catch (error) {
      console.error("Error removing main contest entry:", error);
    }
  }

  const contestDesc =
    "Enter this contest and see how your first round mock draft stacks up against others. May the most accurate mock win!";
  const tradeDesc = "No trades are allowed";
  const scoringDesc =
    ": 1 point awarded for each player correctly included in the first round, 2 points for every correct player/team pair. (E.G. if you correctly mock Bryce Young to the Panthers, you will receive 3 points in total, 1 for having Young in the first round, and 2 for having him go to the Panthers)";
  const maxEntiesDesc = "One entry max";
  const feeDesc = "Free to enter";
  const closeDateDesc =
    "Contest closes on 4/27/23 at 7 PM ET (One hour before the draft)";

  return (
    <div className="contest-screen">
      {showEntrants && <ViewEntrants setShowEntrants={setShowEntrants} />}
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
        <h4>Closes in: {convertTime(timeUntilClose)}</h4>
        <div className="contest-desc-div">
          <h4 className="main-info">{contestDesc}</h4>
          {showInfo ? (
            <div className="more-info-div">
              <ul className="more-info-list">
                <li className="more-info-li">
                  <span className="bold">Scoring</span>
                  {scoringDesc}
                </li>
                <li className="more-info-li">{tradeDesc}</li>
                <li className="more-info-li">{maxEntiesDesc}</li>
                <li className="more-info-li">{feeDesc}</li>
                <li className="more-info-li">{closeDateDesc}</li>
                <button onClick={() => setShowInfo(false)}>Hide Info</button>
              </ul>
            </div>
          ) : (
            <button onClick={() => setShowInfo(true)}>More Info</button>
          )}
        </div>
        {/* when the draft is on and after it's over, display a leaderboard instead or button to get to leaderboard */}
        {props.user && contestEntry ? (
          <div className="already-entered">
            <h4 className="already-entered-text">You are Entered</h4>
            <button
              className="med-blue-btn view-entry-btn"
              onClick={() => setShowViewEntry(true)}
            >
              View Your Entry
            </button>
            <button onClick={() => setShowEntrants(true)}>Leaderboard</button>
          </div>
        ) : props.user ? (
          <div className="contest-btns">
            <h5>(Once you enter a mock draft, you are still able to edit it up until the contest closes)</h5>
            <button
              className="big-blue-btn"
              onClick={() => setShowEnterContest(true)}
            >
              Enter
            </button>
            <button onClick={() => setShowEntrants(true)}>Leaderboard</button>
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
  );
}

export default Contest;
