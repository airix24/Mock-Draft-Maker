import React from "react";
import Modal from "./Modal";
import NFLFirstRoundRules from "../ContestInfo/NFLFirstRoundRules";
import "../Styles/ContestInfo.css";

function ContestInfo(props) {
  // object that maps contest names to contest info components
  const contestRulesComponents = {
    "Mock Draft Mayhem": <NFLFirstRoundRules />,
  };

  return (
    <Modal setShowSelf={props.setShowMoreInfo}>
      <div className="contest-info-container">
        <div className="contest-info-top">
          <h1 className="contest-info-title">{props.currContest.name}</h1>
        </div>
        <div className="contest-info-content">
          {contestRulesComponents[props.currContest.name]}
        </div>
      </div>
    </Modal>
  );
}

export default ContestInfo;
