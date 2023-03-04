import React from "react";
import "../Styles/SavedDrafts.css";

function NewSavedDrafts(props) {
  const savedDraftElements = props.savedDrafts
    .map((draft, index) => {
      return (
        <div className="saved-draft-card" key={index}>
          <h2>{draft.name}</h2>
          <h4 className="light">{draft.date}</h4>
          <hr></hr>
        </div>
      );
    })
    .reverse();

  return (
    <div className="new-saved-drafts-screen">
      <div className="saved-drafts-container">
        <h1>Saved Drafts</h1>
        <hr></hr>
        {savedDraftElements.length === 0 ? (
          <h3 className="light">No saved drafts</h3>
        ) : (
          <div className="saved-draft-elements">{savedDraftElements}</div>
        )}
      </div>
    </div>
  );
}

export default NewSavedDrafts;
