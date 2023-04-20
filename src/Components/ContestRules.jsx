import React from "react";

function ContestRules(props) {
  // Contest info
  const tradeDesc = "No trades are allowed";
  const scoringDesc =
    ": 1 point awarded for each player correctly included in the first round, 2 points for every correct player/team pair. (E.G. if you correctly mock Bryce Young to the Panthers, you will receive 3 points in total, 1 for having Young in the first round, and 2 for having him go to the Panthers)";
  const maxEntiesDesc = "One entry max";
  const feeDesc = "Free to enter";
  const closeDateDesc =
    "Contest closes on 4/27/23 at 6 PM CT (One hour before the draft)";

  return (
    <div className="more-info-div">
      <ul className="more-info-list">
        <li className="more-info-li">
          <span className="bold">Scoring</span>
          {scoringDesc}
        </li>
        <li className="more-info-li">{tradeDesc}</li>
        <li className="more-info-li">{maxEntiesDesc}</li>
        <li className="more-info-li">{feeDesc}</li>
        <li className="more-info-li">{closeDateDesc}</li>
        <button onClick={() => props.setShowInfo(false)}>Hide Info</button>
      </ul>
    </div>
  );
}

export default ContestRules;
