import React from "react";
import Modal from "./Modal";
import NFLFirstRoundInfo from "../ContestInfo/NFLFirstRoundInfo";
import "../Styles/ContestInfo.css";

function ContestInfo(props) {
  // object that maps contest names to contest info components
  const contestInfoComponents = {
    "Mock Draft Mayhem": <NFLFirstRoundInfo />,
  };

  return (
    <Modal setShowSelf={props.setShowMoreInfo}>
      <div className="contest-info-container">
        <div className="contest-info-top">
          <h1 className="contest-info-title">{props.currContest.name}</h1>
        </div>
        <div className="contest-info-content">
          {contestInfoComponents[props.currContest.name]}
        </div>
      </div>
    </Modal>
  );
}

export default ContestInfo;
