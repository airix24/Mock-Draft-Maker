import React from "react";
import "../Styles/SavedDrafts.css";
import { FaTimes } from "react-icons/fa";
// import DeleteConfirmation from "./DeleteConfirmation";

function SavedDrafts(props) {
  // const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const savedDraftElements = props.savedDrafts
    .map((draft, index) => {
      // show only the first 10 characters of the saved draft name
      const name =
        draft.name != null && draft.name.length > 30
          ? `${draft.name.slice(0, 30)}...`
          : draft.name;
      return (
        <div className="saved-draft-card" key={index}>
          <div
            className="saved-draft-info"
            onClick={() => {
              // props.setShowSavedDrafts(false);
              props.setShowViewDraft(true);
              props.setCurrDraft(draft);
            }}
          >
            <h2>{name}</h2>
            <h4 className="light">{draft.date}</h4>
          </div>
          {/* <button
            className="edit-draft-btn"
            onClick={() => {
              console.log("edit");
            }}
          >
            Edit
          </button>
          <button
            className="delete-draft-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirmation(true);
            }}
          >
            Delete
          </button> */}
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
