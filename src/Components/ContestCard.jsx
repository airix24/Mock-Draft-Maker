import { useEffect, useState } from "react";
// import ContestCountdown from "./ContestCountdown";
import { FaArrowRight } from "react-icons/fa";
import "../Styles/ContestCard.css";
import axios from "axios";
import NFLFirstRoundInfo from "../ContestInfo/NFLFirstRoundInfo";
import { db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";

function ContestCard(props) {
  const [isContestClosed, setIsContestClosed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [isUserEntered, setIsUserEntered] = useState(false);
  const [isTimeFetched, setIsTimeFetched] = useState(false);
  const [isUserChecked, setIsUserChecked] = useState(false);

  // object that maps contest names to contest info components
  const contestInfoComponents = {
    "Mock Draft Mayhem": <NFLFirstRoundInfo />,
  };

  // fetch current time and check if contest is closed
  useEffect(() => {
    const fetchCurrentTime = async () => {
      try {
        const response = await axios.get(
          "https://worldtimeapi.org/api/timezone/America/Chicago"
        );
        const { datetime } = response.data;
        const targetDate = props.closeTime;
        const currentDate = new Date(datetime);

        const diff = targetDate.seconds * 1000 - currentDate.getTime();

        if (diff > 0) {
          setIsContestClosed(false);
        }

        setIsTimeFetched(true);
      } catch (error) {
        console.error("Error fetching current time:", error);
      }
    };

    const intervalId = setInterval(fetchCurrentTime, 1000);

    return () => clearInterval(intervalId);
  }, [props.closeTime]);

  // check if user has entered the contest. If they have, set the current entry to the user's entry
  useEffect(() => {
    const checkUserEntered = async () => {
      try {
        if (!props.user) {
          setIsUserChecked(true);
          return;
        }
        const contestDocRef = doc(db, "contests", props.id);
        const entryDocRef = doc(contestDocRef, "entries", props.user.uid);

        const entryDoc = await getDoc(entryDocRef);

        if (entryDoc.exists()) {
          setIsUserEntered(true);

          // set the current user's entry to the user's entry
          props.setUserEntries({
            ...props.UserEntries,
            [props.id]: entryDoc.data(),
          });
        }

        setIsUserChecked(true);
      } catch (e) {
        console.error(e);
      }
    };

    checkUserEntered();
  }, [props.user, props.draftJustEntered, props.draftJustRemoved]);

  useEffect(() => {
    if (isTimeFetched && isUserChecked) {
      setLoading(false);
    }
  }, [isTimeFetched, isUserChecked]);

  return (
    <div
      className={`contest-card ${
        props.status === "upcoming" ? "upcoming-contest" : ""
      } 
      ${props.main ? "main-contest" : ""}`}
    >
      {props.status === "upcoming" && (
        <div className="upcoming-contest-overlay">
          <div className="coming-soon-ribbon">Coming Soon</div>
        </div>
      )}
      <h1 className="contest-card-title">{props.name}</h1>
      <div className="contest-card-top">
        <h2 className="contest-card-desc">{props.desc}</h2>
        <div className="contest-countdown"></div>
        <div className="contest-rules">{contestInfoComponents[props.name]}</div>
        <button
          className="more-info-button"
          onClick={() => {
            props.setCurrContest(props);
            props.setShowMoreInfo(true);
          }}
        >
          Full Rules
        </button>
      </div>
      <div className="contest-card-bottom">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            {isContestClosed ? (
              <button className="contest-card-button contest-card-main-button">
                <div>Leaderboard</div>
                <FaArrowRight size={25} className="leaderboard-arrow" />
              </button>
            ) : props.user && isUserEntered ? (
              <button
                className="contest-card-button"
                onClick={() => {
                  props.setCurrContest(props);
                  props.setShowViewDraft(true);
                }}
              >
                View Entry
              </button>
            ) : props.user && !isUserEntered ? (
              <button
                className="contest-card-button contest-card-main-button"
                onClick={() => {
                  props.setCurrContest(props);
                  props.setShowEnterContest(true);
                }}
              >
                Enter
              </button>
            ) : (
              <button
                className="contest-card-button"
                onClick={() => {
                  props.setShowAuth(true);
                }}
              >
                Sign In to Enter
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ContestCard;
