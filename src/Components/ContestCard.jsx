import React from "react";
import "../Styles/ContestCard.css";

function ContestCard({
  name,
  info,
  closeTime,
  image,
  currentEntrants,
  prize,
  fee,
  setContestInfo,
  setShowContestInfo,
}) {
  return (
    <div className="contest-card card">
      {/* overlay to show contest is not ready yet */}
      <div className="coming-soon-overlay">
        <span className="coming-soon-label">Coming Soon</span>
      </div>
      
      <div className="contest-card-top">
        <h3 className="contest-card-name">{name}</h3>
        <h4 className="contest-card-close-date">
          {closeTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>
      </div>
      <img className="contest-card-image" src={image} alt="contest" />
      <div className="contest-card-info-bar">
        <h4 className="contest-card-fee">Entry: ${fee}</h4>
        {/* <h4 className="contest-card-entrants">
          Current Entrants: {currentEntrants}
        </h4> */}
        <h4 className="contest-card-prize">Prizes: ${prize}</h4>
      </div>

      <button
        className="contest-card-info-btn"
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
      <button className="contest-card-enter-btn">Enter</button>
    </div>
  );
}

export default ContestCard;
