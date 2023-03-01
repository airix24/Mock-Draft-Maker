import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { findProspect } from "../util";

function DisplayDraft(props) {
  const draftPickElements = props.displayedDraft.draft.map((slot, index) => {
    const prospect = findProspect(slot.pick) ? findProspect(slot.pick) : null;
    return (
      <div className="card draft-pick-card" key={index}>
        <h3>{index + 1}.</h3>
        <h3>{slot.team}</h3>
        {prospect ? (
          <h3>
            {prospect.firstName} {prospect.lastName}
          </h3>
        ) : (
          <h3>----</h3>
        )}
      </div>
    );
  });

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowDisplayDraft(false)}
    >
      <div className="inner-modal inner-modal-display-draft" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar display-draft-bar">
          <FaArrowLeft
            className="icon"
            size={20}
            onClick={() => {
              props.setShowDisplayDraft(false);
              props.setShowSavedDrafts(true);
            }}
          />
        </div>
        <div className="modal-content display-draft-content">
          <h1>{props.displayedDraft.name}</h1>
          <h3 className="light">{props.displayedDraft.date}</h3>
          <div className="draft-pick-cards">{draftPickElements}</div>
        </div>
      </div>
    </div>
  );
}

export default DisplayDraft;
