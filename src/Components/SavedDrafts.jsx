import React from "react";

function SavedDrafts(props) {
  const savedDraftsElements = props.savedDrafts.map((draft) => {
    return (
      <div>
        <h2>{draft.name}</h2>
        <h4>{draft.date}</h4>
      </div>
    );
  });

  return (
    <div
      className="outer-modal"
      onClick={(e) => {
        // e.stopPropagation();
        props.setShowSavedDrafts(false);
      }}
    >
      <div className="inner-modal" onClick={(e) => e.stopPropagation()} >
        <h1>Saved Drafts</h1>
        {savedDraftsElements}
      </div>
    </div>
  );
}

export default SavedDrafts;
