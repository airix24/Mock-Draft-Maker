import React from "react";
import Modal from "./Modal";
import "../Styles/ContestInfo.css";

function ContestInfo({ contestInfo, setShowContestInfo }) {
  return (
    <Modal setShowSelf={setShowContestInfo}>
      <div className="contest-info-container">
        <div className="contest-info-header">
          <h1 className="contest-info-name">{contestInfo.name} Contest</h1>
        </div>
        <div className="contest-info-details">{contestInfo.info}</div>
      </div>
    </Modal>
  );
}

export default ContestInfo;
