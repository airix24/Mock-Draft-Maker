import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PastContestCard from "../Components/PastContestCard";
import ContestInfo from "../Components/ContestInfo";
import Leaderboard from "../Components/Leaderboard";
import ViewDraft from "../Components/ViewDraft";
import Modal from "../Components/Modal";
import "../Styles/PastContests.css";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";

function PastContests({ user }) {
  const [showContestInfo, setShowContestInfo] = useState(false);
  const [contestInfo, setContestInfo] = useState({}); // {name, info}
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showViewEntry, setShowViewEntry] = useState(false);
  const [draftResults, setDraftResults] = useState([]);
  const [contestEntry, setContestEntry] = useState(null);

  // get draft results from database
  useEffect(() => {
    const getDraftResults = async () => {
      const data = await getDocs(collection(db, "NFLDraftResults2023"));
      return data.docs.map((doc) => doc.data());
    };
    getDraftResults().then((results) => {
      setDraftResults(results[0].results);
    });
  }, []);

  // set contest entry if user has already entered. After this is done, set isLoading to false
  useEffect(() => {
    if (user) {
      const usersCollection = collection(db, "users");
      const savedDraftsCollection = collection(
        usersCollection,
        user.uid,
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
  }, [user]);

  return (
    <div className="past-contests-container">
      {showLeaderboard && (
        <Leaderboard
          setShowLeaderboard={setShowLeaderboard}
          isContestClosed={true}
          draftResults={draftResults}
        />
      )}
      {showContestInfo && (
        <ContestInfo
          setShowContestInfo={setShowContestInfo}
          contestInfo={contestInfo}
        />
      )}
      {showViewEntry && (
        <Modal setShowSelf={setShowViewEntry}>
          <ViewDraft
            draft={contestEntry}
            setShowViewEntry={setShowViewEntry}
            user={user}
            isViewingFromContestPage={true}
            isContestClosed={true}
            draftResults={draftResults}
          />
        </Modal>
      )}
      <div className="back-to-curr-contests-btn-div">
        <Link to="/contests">
          <button>Back to Current Contests</button>
        </Link>
      </div>
      <div className="past-contest-card-container">
        <PastContestCard
          name="2023 NFL Draft"
          closeTime={new Date("April 27, 2023 23:00:00")}
          image=""
          currentEntrants={35}
          prize={100}
          setShowLeaderboard={setShowLeaderboard}
          setShowContestInfo={setShowContestInfo}
          setContestInfo={setContestInfo}
          setShowViewEntry={setShowViewEntry}
          contestEntry={!!contestEntry}
          info={
            <div className="contest-info">
              <div className="contest-info-section">
                <h2>Scoring:</h2>
                <ul>
                  <li>
                    1 point awarded for each player correctly included in the
                    first round
                  </li>
                  <li>2 points awarded for each correct player/team match</li>
                </ul>
              </div>
              <div className="contest-info-section">
                <h2>Prize:</h2>
                <ul>
                  <li>1st place gets $100</li>
                </ul>
              </div>
              <div className="contest-info-section">
                <h2>Contest Details:</h2>
                <ul>
                  <li>
                    This contest is only for the first round of the draft.
                  </li>
                  <li>No trades are allowed.</li>
                  <li>
                    Only one entry is allowed per person. Using multiple
                    accounts to enter will result in disqualification.
                  </li>
                  <li>The contest is free to enter.</li>
                  <li>
                    The contest closes on April 27, 2023, at 6 PM CT (one hour
                    before the draft). After this time, you will not be able to
                    enter or edit your mock draft.
                  </li>
                  <li>
                    The winner will be determined by the highest score after the
                    first round.
                  </li>
                  <li>
                    If there is a tie for first, the prize money will be split
                    equally.
                  </li>
                  <li>
                    The winner will be contacted by email for payment
                    information.
                  </li>
                  <li>
                    If there is a trade that affects the first round draft
                    order, entries submitted before the trade will still have
                    the old order.
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

export default PastContests;
