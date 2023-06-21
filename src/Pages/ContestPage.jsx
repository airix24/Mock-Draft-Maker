import { useState, useEffect } from "react";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import ContestCard from "../Components/ContestCard";
import ContestInfo from "../Components/ContestInfo";
import EnterContest from "../Components/EnterContest";
import ViewDraft from "../Components/ViewDraft";
import "../Styles/ContestPage.css";
import lotteryLogo from "../Assets/lottery.svg";
import { db } from "../config/firebase-config";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

function ContestPage({ user }) {
  const [showAuth, setShowAuth] = useState(false);
  const [showEnterContest, setShowEnterContest] = useState(false);
  const [showViewDraft, setShowViewDraft] = useState(false);
  const [showContestInfo, setShowContestInfo] = useState(false);

  const [contestEntry, setContestEntry] = useState(null);

  const [loading, setLoading] = useState(true);

  const [contest, setContest] = useState({
    closeTime: new Date("2023-06-22T18:00:00"),
    draftLength: 14,
    entryFee: 0,
    id: "B9jMFTTGDoVmjv1AgLlz",
    image: lotteryLogo,
    info: "idk bro, imma need to write a lot here. LOTTERY",
    league: "NBA",
    name: "2023 NBA Lottery",
    prospectClass: "NBA_2023",
    status: "upcoming",
    totalPrizes: 0,
    isUserEntered: false,
  });

  const openModal = (modal) => {
    switch (modal) {
      case "auth":
        setShowAuth(true);
        break;
      case "contestInfo":
        setShowContestInfo(true);
        break;
      case "enterContest":
        setShowEnterContest(true);
        break;
      case "viewDraft":
        setShowViewDraft(true);
        break;
      default:
        break;
    }
  };

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
            return draft.contestsEntered.includes(contest.id);
          });
          if (enteredDraft) {
            setContestEntry(enteredDraft);
          }
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      };
      getSavedDrafts();
    } else {
      setLoading(false);
    }
  }, [user]);

  const removeEntryFromContest = async () => {
    console.log("removing entry from contest");
  };
  
  return (
    <div className="contest-page-container">
      {showAuth && (
        <Modal setShowSelf={setShowAuth}>
          <Auth setShowAuth={setShowAuth} />
        </Modal>
      )}
      {showEnterContest && (
        <EnterContest
          setShowEnterContest={setShowEnterContest}
          user={user}
          setContest={setContest}
          contest={contest}
        />
      )}
      {showViewDraft && (
        <Modal setShowSelf={setShowViewDraft}>
          <ViewDraft
            draft={contestEntry}
            setShowViewEntry={setShowViewDraft}
            user={user}
            isViewingFromContestPage={true}
            removeEntryFromContest={removeEntryFromContest}
            draftResults={[]}
            league={contest.league}
            prospectClass={contest.prospectClass}
            currContestId={contest.id}
          />
        </Modal>
      )}
      {showContestInfo && (
        <ContestInfo
          setShowContestInfo={setShowContestInfo}
          name={contest.name}
          info={contest.info}
        />
      )}
      {loading ? (
        <div className="loading-container">
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className="contest-card-container">
          <ContestCard
            name={contest.name}
            closeTime={contest.closeTime}
            image={contest.image}
            prize={contest.totalPrizes}
            fee={contest.entryFee}
            status={contest.status}
            info={contest.info}
            user={user}
            openModal={openModal}
            isUserEntered={contest.isUserEntered}
          />
          {/* {contestElements.length > 0 ? (
            contestElements
          ) : (
            <div className="no-contests-container">
              <h1 className="no-contests-header">No Contests Available</h1>
              <p className="no-contests-text">
                Check back later for more contests!
              </p>
            </div>
          )} */}
        </div>
      )}
      {/* <Link to="/past-contests">
        <button className="view-past-contests-btn">View Past Contests</button>
      </Link> */}
    </div>
  );
}

export default ContestPage;
