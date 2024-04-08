import React, { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import ContestCard from "../Components/ContestCard";
import ContestInfo from "../Components/ContestInfo";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import EnterContest from "../Components/EnterContest";
import ViewDraft from "../Components/ViewDraft";
import "../Styles/ContestPage.css";
import { db } from "../config/firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

function ContestPage(props) {
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showEnterContest, setShowEnterContest] = useState(false);
  const [showViewDraft, setShowViewDraft] = useState(false);
  const [currContest, setCurrContest] = useState(null);
  const [contests, setContests] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [draftJustEntered, setDraftJustEntered] = useState(false);
  const [draftJustRemoved, setDraftJustRemoved] = useState(false);

  // fetch contests with status of "open" or "upcoming" or "live"
  useEffect(() => {
    const getContests = async () => {
      try {
        const contestsCollection = collection(db, "contests");
        const querySnapshot = await getDocs(
          query(
            contestsCollection,
            where("status", "in", ["open", "upcoming", "live"])
          )
        );

        const contestsData = querySnapshot.docs.map((doc) => doc.data());
        setContests(contestsData);
      } catch (e) {
        console.error(e);
      }
    };

    getContests();
  }, []);

  // map contests to ContestCard components
  const ContestElements = contests.map((contest) => {
    return (
      <ContestCard
        key={contest.id}
        {...contest}
        setShowAuth={setShowAuth}
        setShowMoreInfo={setShowMoreInfo}
        setShowEnterContest={setShowEnterContest}
        setCurrContest={setCurrContest}
        setShowViewDraft={setShowViewDraft}
        setUserEntries={setUserEntries}
        user={props.user}
        draftJustEntered={draftJustEntered}
        draftJustRemoved={draftJustRemoved}
      />
    );
  });

  return (
    <>
      {showViewDraft && (
        <Modal setShowSelf={setShowViewDraft}>
          <ViewDraft
            draft={userEntries[currContest.id]}
            setShowViewDraft={setShowViewDraft}
            user={props.user}
            isViewingFromContestPage={true}
            isContestEntry={true}
            league={currContest.league}
            prospectClass={currContest.prospectClass}
            draftResults={[]}
            currContestId={currContest.id}
            setDraftJustRemoved={setDraftJustRemoved}
          />
        </Modal>
      )}
      {showEnterContest && (
        <EnterContest
          user={props.user}
          setShowEnterContest={setShowEnterContest}
          currContest={currContest}
          setDraftJustEntered={setDraftJustEntered}
        />
      )}
      {showAuth && (
        <Modal setShowSelf={setShowAuth}>
          <Auth user={props.user} setShowAuth={setShowAuth} />
        </Modal>
      )}
      {showMoreInfo && (
        <ContestInfo
          currContest={currContest}
          setShowMoreInfo={setShowMoreInfo}
        />
      )}
      <div className="contest-page">
        <div className="contest-elements">{ContestElements}</div>
      </div>
      <Footer />
    </>
  );
}

export default ContestPage;
