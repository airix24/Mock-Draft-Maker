import { useState, useEffect, useRef } from "react";
import "../Styles/LeaderboardPage.css";
import Modal from "../Components/Modal";
import ViewDraft from "../Components/ViewDraft";
import Footer from "../Components/Footer";
import { db } from "../config/firebase-config";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  orderBy,
  startAfter,
  limit,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

function LeaderboardPage(props) {
  const { contestId } = useParams();
  const [contest, setContest] = useState({});
  const [entries, setEntries] = useState([]);
  const [userEntry, setUserEntry] = useState(null);
  const [showViewDraft, setShowViewDraft] = useState(false);
  const [currEntry, setCurrEntry] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const didRun = useRef(false);
  const [loadMoreTrigger, setLoadMoreTrigger] = useState(0);
  const [hasMoreEntries, setHasMoreEntries] = useState(true);
  const [loading, setLoading] = useState(true);

  // get contest document
  useEffect(() => {
    const fetchContest = async () => {
      try {
        const contestDocRef = doc(db, "contests", contestId);
        const contestDoc = await getDoc(contestDocRef);
        if (contestDoc.exists()) {
          setContest(contestDoc.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching contest:", error);
      }
    };

    fetchContest();
  }, []);

  useEffect(() => {
    const fetchEntriesBatch = async () => {
      const entriesCollection = collection(
        db,
        "contests",
        contestId,
        "entries"
      );
      const batchSize = 5;
      let entriesQuery = query(entriesCollection, orderBy("score", "desc"));
      if (lastDoc) {
        entriesQuery = query(entriesQuery, startAfter(lastDoc));
      }
      entriesQuery = query(entriesQuery, limit(batchSize + 1)); // Fetch one extra entry
      const entriesSnapshot = await getDocs(entriesQuery);
      const newEntries = entriesSnapshot.docs.map((entryDoc) =>
        entryDoc.data()
      );
      if (newEntries.length > batchSize) {
        setHasMoreEntries(true); // There are more entries to load
        newEntries.pop(); // Remove the extra entry
        setLastDoc(entriesSnapshot.docs[entriesSnapshot.docs.length - 2]); // Set lastDoc to the second last document
      } else {
        setHasMoreEntries(false); // No more entries to load
        if (!entriesSnapshot.empty) {
          setLastDoc(entriesSnapshot.docs[entriesSnapshot.docs.length - 1]);
        }
      }
      setEntries((prevEntries) => [...prevEntries, ...newEntries]);
      setLoading(false);
    };

    if (!didRun.current) {
      didRun.current = true;
      fetchEntriesBatch();
    } else if (loadMoreTrigger > 0) {
      fetchEntriesBatch();
    }
  }, [loadMoreTrigger]);

  const loadMoreEntries = () => {
    setLoadMoreTrigger((prevTrigger) => prevTrigger + 1);
  };

  // get user entry
  useEffect(() => {
    const fetchUserEntry = async () => {
      try {
        if (!props.user) {
          return;
        }
        const contestDocRef = doc(db, "contests", contestId);
        const entryDocRef = doc(contestDocRef, "entries", props.user.uid);
        const entryDoc = await getDoc(entryDocRef);
        if (entryDoc.exists()) {
          setUserEntry(entryDoc.data());
        }
      } catch (error) {
        console.error("Error fetching user entry:", error);
      }
    };

    fetchUserEntry();
  }, [props.user]);

  // map entries into basic divs for now
  const entryDivs = entries.map((entry, index) => {
    return (
      <div
        className={`leaderboard-page-entry-div ${
          ""
          // props.user.uid === entry.userUid ? "leaderboard-user-entry" : ""
        }`}
        key={entry.draftId}
        onClick={() => {
          setCurrEntry(entry);
          setShowViewDraft(true);
        }}
      >
        <div className="leaderboard-page-rank-name">
          <p className="leaderboard-page-rank">{index + 1}.</p>
          <p>{entry.draftName}</p>
        </div>
        <div className="score-div">
          <p className="leaderboard-page-entry-div-score">{entry.score}</p>
        </div>
      </div>
    );
  });

  return (
    <div className="leaderboard-page">
      {showViewDraft && (
        <Modal setShowSelf={setShowViewDraft}>
          <ViewDraft
            draft={currEntry}
            setShowViewDraft={setShowViewDraft}
            user={props.user}
            isViewingFromContestPage={true}
            isContestEntry={true}
            league={contest.league}
            prospectClass={contest.prospectClass}
            draftResults={[]}
            currContestId={contestId}
            isViewingFromLeaderboard={true}
          />
        </Modal>
      )}
      <div className="leaderboard-page-container">
        {/* <div className="leaderboard-page-header">
          <h1>{contest.name}</h1>
        </div> */}
        <div className="leaderboard-page-main-content">
          <div className="leaderboard-page-board">
            <div className="leaderboard-page-board-top">
              <h2>Leaderboard</h2>
              <h4>Total Entries: {contest.entryCount}</h4>
            </div>
            <div className="leaderboard-page-board-bottom">
              {entryDivs}
              {!loading && hasMoreEntries && (
                <div className="loadmore-div">
                  <button
                    className="leaderboard-page-load-more med-blue-btn"
                    onClick={loadMoreEntries}
                  >
                    Load More
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="leaderboard-page-entry">
            {userEntry ? (
              <div>
                {/* <div className="leaderboard-page-entry-top">
                  <h2>Your Entry</h2>
                </div> */}
                <div className="leaderboard-page-entry-bottom">
                  <ViewDraft
                    draft={userEntry}
                    setShowViewDraft={setShowViewDraft}
                    user={props.user}
                    isViewingFromContestPage={true}
                    isContestEntry={true}
                    league={contest.league}
                    prospectClass={contest.prospectClass}
                    draftResults={[]}
                    currContestId={contestId}
                    isViewingFromLeaderboard={true}
                  />
                </div>
              </div>
            ) : (
              <div className="no-entry-div light">
                <p>You do not have an entry or you are not signed in</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default LeaderboardPage;
