import React from "react";
import "../Styles/ViewDraft.css";
import { FaArrowLeft } from "react-icons/fa";
import { findProspect } from "../util.js";

function ViewDraft(props) {
  const draftElements = props.currDraft.draft.map((team, index) => {
    const currProspect = findProspect(team.pick) ? findProspect(team.pick) : {};

    return (
      <div className="draft-element">
        <h2>{index + 1}.</h2>
        <h2>{team.team} -</h2>
        <h3>
          {currProspect.firstName} {currProspect.lastName}
        </h3>
      </div>
    );
  });

  return (
    <div className="outer-modal" onClick={() => props.setShowViewDraft(false)}>
      <div
        className="inner-modal inner-modal-view-draft"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-bar modal-bar">
          <FaArrowLeft
            className="icon"
            size={20}
            onClick={() => {
              props.setShowViewDraft(false);
              props.setShowSavedDrafts(true);
            }}
          />
        </div>
        <div className="modal-content modal-content-view-draft">
          <h2>{props.currDraft.name}</h2>
          <h3 className="light">{props.currDraft.date}</h3>
          {draftElements}
        </div>
      </div>
    </div>
  );
}

export default ViewDraft;
