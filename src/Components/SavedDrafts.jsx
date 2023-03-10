import { useState } from "react";
import "../Styles/SavedDrafts.css";
import { FaTimes } from "react-icons/fa";

function SavedDrafts(props) {
  const savedDraftElements = props.savedDrafts
    .map((draft, index) => {
      return (
        <div className="saved-draft-card" onClick={() => {
          props.setShowSavedDrafts(false);
          props.setShowViewDraft(true);
          props.setCurrDraft(draft);
        }} key={index}>
          <h2>{draft.name}</h2>
          <h4 className="light">{draft.date}</h4>
          <hr></hr>
        </div>
      );
    })
    .reverse();

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowSavedDrafts(false)}
    >
      <div
        className="inner-modal inner-modal-saved-drafts"
        onClick={(e) => e.stopPropagation(e)}
      >
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowSavedDrafts(false)}
          />
        </div>
        <div className="idk">
          <h1>Saved Drafts</h1>
        </div>
        <hr></hr>
        <div className="modal-content saved-drafts-content">
          {savedDraftElements.length === 0 ? (
            <h3 className="light">No saved drafts</h3>
          ) : (
            <div className="">{savedDraftElements}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedDrafts;
