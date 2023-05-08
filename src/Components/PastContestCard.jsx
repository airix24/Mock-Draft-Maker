import React from "react";
import "../Styles/PastContestCard.css";

function PastContestCard({
  name,
  info,
  closeTime,
  currentEntrants,
  setShowLeaderboard,
  setShowContestInfo,
  setContestInfo,
  setShowViewEntry,
  contestEntry,
}) {
  return (
    <div className="past-contest-card card">
      <h2 className="past-contest-card-name">{name}</h2>
      <h4 className="past-contest-card-close-date light">
        {closeTime.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </h4>
      <h4 className="past-contest-card-entrants">
        Entrants: {currentEntrants}
      </h4>
      <div className="past-contest-btn-container">
        <button
          className="past-contest-card-info-btn"
          onClick={() => {
            setContestInfo({
              name: name,
              info: info,
            });
            setShowContestInfo(true);
          }}
        >
          More Info
        </button>
        <button
          className="past-contest-card-info-btn"
          onClick={() => {
            setShowLeaderboard(true);
          }}
        >
          View Leaderboard
        </button>
        {contestEntry && (
          <button
            className="past-contest-card-info-btn"
            onClick={() => {
              setShowViewEntry(true);
            }}
          >
            View Your Entry
          </button>
        )}
      </div>
    </div>
  );
}

export default PastContestCard;
