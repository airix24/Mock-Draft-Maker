import { useState, useEffect } from "react";
import "../Styles/Contest.css";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import ViewDraft from "../Components/ViewDraft";
import Leaderboard from "../Components/Leaderboard";
import LotteryEnterContest from "../Components/LotteryEnterContest";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { convertTime } from "../utils/helpers";
import LotteryContestRules from "../Components/LotteryContestRules";

function LotteryContest(props) {
  const [showAuth, setShowAuth] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeUntilClose, setTimeUntilClose] = useState(0);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showLotteryEnterContest, setShowLotteryEnterContest] = useState(false);
  const [contestEntry, setContestEntry] = useState(null);
  const [showViewEntry, setShowViewEntry] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContestClosed, setIsContestClosed] = useState(false);
  const [draftResults, setDraftResults] = useState([]);
  // time is in UTC
  const CLOSE_TIME = new Date("June 22, 2023 23:00:00");

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
            return draft.contestsEntered.includes("lotteryContest");
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

    if (timeUntilClose > 0) {
      const interval = setInterval(() => {
        const timeDiff = closeDateLocalTimezone - new Date();
        setTimeUntilClose(timeDiff);
      }, 1000);

      return () => clearInterval(interval);
    }

    setIsContestClosed(true);
  }, [isContestClosed]);

  // set isContestClosed to true if timeUntilClose is less than 0
  useEffect(() => {
    if (timeUntilClose <= 0) {
      setIsContestClosed(true);
    } else {
      setIsContestClosed(false);
    }
  }, [timeUntilClose]);

  // get draft results
  useEffect(() => {
    const getDraftResults = async () => {
      const data = await getDocs(collection(db, "NBADraftResults2023"));
      return data.docs.map((doc) => doc.data());
    };
    getDraftResults().then((results) => {
      setDraftResults(results[0].results);
    });
  }, []);

  // function that removes mainContest from contestsEntered array of a draft in the database
  async function removeEntryFromLotteryContest() {
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
        if (draft.contestsEntered.includes("lotteryContest")) {
          const docRef = doc.ref; // Get document reference
          await updateDoc(docRef, { contestsEntered: [] });
        }
      }
      setShowViewEntry(false);
      setContestEntry(null);
    } catch (error) {
      console.error("Error removing lottery contest entry:", error);
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
          {showAuth ? (
            <Modal setShowSelf={setShowAuth}>
              <Auth setShowAuth={setShowAuth} />
            </Modal>
          ) : null}
          {showLeaderboard && (
            <Leaderboard
              setShowLeaderboard={setShowLeaderboard}
              isContestClosed={isContestClosed}
              draftResults={draftResults}
              league="NBA"
              prospectClass="NBA_2023"
            />
          )}
          {showLotteryEnterContest && (
            <LotteryEnterContest
              setShowLotteryEnterContest={setShowLotteryEnterContest}
              user={props.user}
              contestEntry={contestEntry}
              setContestEntry={setContestEntry}
              isContestClosed={isContestClosed}
              league="NBA"
              draftLength={14}
            />
          )}
          {showViewEntry && (
            <Modal setShowSelf={setShowViewEntry}>
              <ViewDraft
                draft={contestEntry}
                setShowViewEntry={setShowViewEntry}
                user={props.user}
                isViewingFromContestPage={true}
                removeEntryFromLotteryContest={removeEntryFromLotteryContest}
                isContestClosed={isContestClosed}
                draftResults={draftResults}
                league="NBA"
                prospectClass="NBA_2023"
              />
            </Modal>
          )}

          <div className="contest-container">
            <div className="contest-container-top">
              {" "}
              <h1 className="contest-header">NBA Draft Lottery Contest</h1>
              <h4 className="main-info light">
                Free Mock Draft Contest for the 2023 NBA Draft
              </h4>
              {!isContestClosed ? (
                <h4>Closes in: {convertTime(timeUntilClose)}</h4>
              ) : (
                <h4>Contest is Live!</h4>
              )}
            </div>
            <div className="contest-desc-div">
              {showInfo && <LotteryContestRules />}
            </div>
            <div className="toggle-info-div">
              <button
                className="toggle-info-btn"
                onClick={() => setShowInfo(!showInfo)}
              >
                {showInfo ? "Hide Info" : "More Info"}
              </button>
            </div>

            <div className="contest-lower">
              {!props.user && (
                <div className="contest-lower-content">
                  <h4>
                    {isContestClosed
                      ? "Must be signed in to view leaderboard"
                      : "Must be signed in to enter contest"}
                  </h4>
                  <button
                    onClick={() => setShowAuth(true)}
                    className="big-blue-btn"
                  >
                    Sign In
                  </button>
                </div>
              )}
              {props.user && contestEntry && (
                <div className="contest-lower-content">
                  {!isContestClosed && (
                    <div className="check-back-live-div">
                      <h4 className="check-back-live-reminder">
                        Make sure to check back during the draft to track your
                        results live on the leaderboard!
                      </h4>
                    </div>
                  )}
                  <button
                    className="med-blue-btn view-entry-btn"
                    onClick={() => setShowViewEntry(true)}
                  >
                    View Your Entry
                  </button>
                </div>
              )}
              {props.user && !contestEntry && !isContestClosed && (
                <div className="contest-lower-content">
                  <h4 className="light">
                    (Once you enter a mock draft, you are still able to edit it
                    up until the contest closes)
                  </h4>
                  <button
                    className="big-blue-btn"
                    onClick={() => setShowLotteryEnterContest(true)}
                  >
                    Enter
                  </button>
                </div>
              )}
              {props.user && isContestClosed && (
                <button
                  className="med-blue-btn leaderboard-btn"
                  onClick={() => setShowLeaderboard(true)}
                >
                  Leaderboard
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default LotteryContest;
