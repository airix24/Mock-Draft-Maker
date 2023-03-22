import { useState } from "react";
import "../Styles/ViewDraft.css";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { findProspect } from "../util.js";
import DeleteConfirmation from "./DeleteConfirmation";

function ViewDraft(props) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const draftElements = props.currDraft.draft.map((team, index) => {
    const currProspect = findProspect(team.pick) ? findProspect(team.pick) : {};
    return (
      <div className="draft-element" key={index}>
        <h2>{index + 1}.</h2>
        <h2>{team.team} -</h2>
        <h3>
          {currProspect.firstName} {currProspect.lastName}
        </h3>
      </div>
    );
  });

  return (
    <div
      className="outer-modal"
      onClick={() => {
        props.setShowViewDraft(false);
        props.setShowSavedDrafts(false);
      }}
    >
      {showDeleteConfirmation ? (
        <DeleteConfirmation
          setShowDeleteConfirmation={setShowDeleteConfirmation}
          currDraft={props.currDraft}
          setSavedDrafts={props.setSavedDrafts}
          setShowViewDraft={props.setShowViewDraft}
        />
      ) : null}
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
          <div className="view-draft-header">
            <div className="view-draft-top">
              <h2>{props.currDraft.name}</h2>
              <div className="view-draft-btns">
                <FaEdit className="icon disabled" size={20} />
                <FaTrash
                  className="icon"
                  size={20}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDeleteConfirmation(true);
                  }}
                />
              </div>
            </div>
            <h3 className="light">{props.currDraft.date}</h3>
          </div>
          {draftElements}
        </div>
      </div>
    </div>
  );
}

export default ViewDraft;
