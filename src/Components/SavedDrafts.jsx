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
    <div className="saved-drafts-screen">
      <h1>Saved Drafts</h1>
      {savedDraftsElements}
    </div>
  );
}

export default SavedDrafts;
