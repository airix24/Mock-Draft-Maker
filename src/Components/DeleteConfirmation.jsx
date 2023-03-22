import React from "react";
import "../Styles/DeleteConfirmation.css";
import { FaTimes } from "react-icons/fa";

function DeleteConfirmation(props) {
  return (
    <div
      className="outer-modal outer-modal-delete-confirm"
      onClick={(e) => {
        e.stopPropagation();
        props.setShowDeleteConfirmation(false);
      }}
    >
      <div
        className="inner-modal inner-modal-delete-confirm"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowDeleteConfirmation(false)}
          />
        </div>
        <div className="modal-content">
          <h2>Are you sure you want to delete this draft?</h2>
          <div className="delete-confirm-btns">
            <button
              className="delete-confirm-btn"
              onClick={() => {
                // update local storage item "savedDrafts" so that the current draft is removed
                const savedDrafts = JSON.parse(
                    localStorage.getItem("savedDrafts")
                    ),
                    updatedDrafts = savedDrafts.filter(
                        (draft) => draft.id !== props.currDraft.id
                    );
                localStorage.setItem("savedDrafts", JSON.stringify(updatedDrafts));
                // update the state of savedDrafts
                props.setSavedDrafts(updatedDrafts);
                // close the delete confirmation modal
                props.setShowDeleteConfirmation(false);
                props.setShowViewDraft(false);
              }}
            >
              Yes
            </button>
            <button onClick={() => props.setShowDeleteConfirmation(false)}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;
