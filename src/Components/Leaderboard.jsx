import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Modal from "./Modal";
import ViewDraft from "./ViewDraft";
import "../Styles/Leaderboard.css";
import { query, where, getDocs as getDocsQuery } from "firebase/firestore";
import { findProspect, findTeam } from "../utils/helpers";
import { FaTrophy } from "react-icons/fa";

function Leaderboard(props) {
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currDraft, setCurrDraft] = useState(null);

  const getUsers = async () => {
    const data = await getDocs(collection(db, "users"));
    return data.docs.map((doc) => doc.data());
  };

  const getDrafts = async (user) => {
    const q = query(
      collection(db, "users", user.uid, "savedDrafts"),
      where("contestsEntered", "array-contains", "mainContest")
    );
    const data = await getDocsQuery(q);
    return data.docs.map((doc) => doc.data());
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const entryNamesData = await Promise.all(usersData.map(getDrafts));
        const entriesData = entryNamesData.flat();
        const sortedEntries = entriesData.sort((a, b) => {
          const aScore = calculateDraftScore(a.draft);
          const bScore = calculateDraftScore(b.draft);
          return bScore - aScore;
        });
        setUsers(usersData);
        setEntries(sortedEntries);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, []);

  function calculatePoints(playerId, teamAbr) {
    let points = 0;
    let playerFound = false;
    for (let i = 0; i < props.draftResults.length; i++) {
      const pick = props.draftResults[i];
      if (pick.player === playerId && pick.team === teamAbr) {
        points += 3;
        playerFound = true;
        break;
      } else if (pick.player === playerId) {
        points += 1;
        playerFound = true;
        // no need to continue looping if player is found
        break;
      }
    }
    return points;
  }

  function calculateDraftScore(draft) {
    return draft.reduce((total, slot) => {
      const player = findProspect(slot.pick) ? findProspect(slot.pick) : "---";
      const team = findTeam(slot.team);
      const pts = calculatePoints(player.id, team.abr);
      return total + pts;
    }, 0);
  }

  return (
    <Modal setShowSelf={props.setShowLeaderboard}>
      {isLoading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {currDraft ? (
            <ViewDraft
              draft={currDraft}
              setCurrDraft={setCurrDraft}
              user={props.user}
              isViewingFromContestPage={true}
              draftResults={props.draftResults}
              isContestClosed={props.isContestClosed}
              isViewingFromLeaderboard={true}
            />
          ) : (
            <>
              <div className="leaderboard-view-entries-top">
                <h1 className="leaderboard-view-entries-header">
                  {props.isContestClosed
                    ? "Leaderboard"
                    : `Total Entries: ${entries.length}`}
                </h1>
              </div>

              <div className="entry-card-container">
                {entries.map((entry, index) => {
                  const totalScore = calculateDraftScore(entry.draft);
                  return (
                    <div
                      className="entry-card"
                      key={index}
                      onClick={() => {
                        setCurrDraft(entry);
                      }}
                    >
                      <div className="entry-card-left">
                        <h4 className="entry-card-rank">{index + 1}.</h4>
                        <h4 className="entry-card-name">{entry.draftName}</h4>
                        {index === 0 && (
                          <FaTrophy className="entry-card-trophy" color="blue" />
                        )}
                      </div>

                      <h4 className="entry-card-score">{totalScore}</h4>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
}

export default Leaderboard;
