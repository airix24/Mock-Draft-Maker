import { useState, useEffect } from "react";
import "../Styles/Contest.css";
import Auth from "../Components/Auth";

function Contest(props) {
  const [showAuth, setShowAuth] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [timeUntilClose, setTimeUntilClose] = useState(0);

  //calculate time until contest closes (4/27/23 6 PM ET), updates every second
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

  const contestDesc =
    "Enter this contest and see how your mock draft stacks up against others. May the most accurate mock win!";
  const tradeDesc = "No trades are allowed";
  const scoringDesc =
    ": 1 point awarded for each player correctly included in the first round, 2 points for every correct player/team pair. (E.G. if you correctly mock Bryce Young to the Panthers, you will receive 3 points in total, 1 for having Young in the first round, and 2 for having him go to the Panthers)";
  const maxEntiesDesc = "One entry max";
  const feeDesc = "Free to enter";
  const closeDateDesc =
    "Contest closes on 4/27/23 at 6 PM ET (One hour before the draft)";

  return (
    <div className="contest-screen">
      <div className="contest-container">
        {showAuth ? <Auth setShowAuth={setShowAuth} /> : null}
        <h1 className="contest-header">Mock Draft Contest 2023</h1>
        <h4>Closes in: {convertTime(timeUntilClose)}</h4>
        <div className="contest-desc">
          <h3>{contestDesc}</h3>
          {showInfo ? (
            <div>
              <p>
                <span>Scoring</span>
                {scoringDesc}
              </p>
              <p>{tradeDesc}</p>
              <p>{maxEntiesDesc}</p>
              <p>{feeDesc}</p>
              <p>{closeDateDesc}</p>
              <button onClick={() => setShowInfo(false)}>Hide Info</button>
            </div>
          ) : (
            <button onClick={() => setShowInfo(true)}>More Info</button>
          )}
        </div>
        {/* when the draft is on and after it's over, display a leaderboard instead or button to get to leaderboard */}
        {props.user ? (
          <div className="contest-btns">
            <button className="big-blue-btn disabled">Enter</button>
            <button className="disabled">View Entrants</button>
          </div>
        ) : (
          <div>
            <div className="contest-btns">
              <h3>You must be signed in to enter the contest</h3>
              <button onClick={() => setShowAuth(true)} className="big-blue-btn">Sign In</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contest;
