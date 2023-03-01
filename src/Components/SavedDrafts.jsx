import React from "react";
import { FaTimes } from "react-icons/fa";

function SavedDrafts(props) {
  const savedDraftsElements = props.savedDrafts.map((draft, index) => {
    return (
      <div className="saved-draft-card card" key={index}>
        <h2>{draft.name}</h2>
        <h4>{draft.date}</h4>
      </div>
    );
  });

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowSavedDrafts(false)}
    >
      <div
        className="inner-modal inner-modal-saved-drafts"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-bar modal-bar">
          <FaTimes className="icon" size={20} onClick={() => props.setShowSavedDrafts(false)} />
        </div>
        <div className="modal-content saved-drafts-content">
          <h1>Saved Drafts</h1>
          {savedDraftsElements}
        </div>
      </div>
    </div>
  );
}

export default SavedDrafts;
