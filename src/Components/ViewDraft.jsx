import { useState } from "react";
import { FaArrowLeft, FaTrash, FaEdit, FaTimes, FaCheck } from "react-icons/fa";
import "../Styles/ViewDraft.css";
import { findProspect, findTeam } from "../util";
import { db } from "../config/firebase-config";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function ViewDraft(props) {
  const isContestEntry = props.draft.contestsEntered.includes("mainContest");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // make date readable in string form
  const date = new Date(
    props.draft.createdAt.seconds * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // delete the draft from the database
  function deleteDraft() {
    const usersCollection = collection(db, "users");
    const savedDraftsCollection = collection(
      usersCollection,
      props.user.uid,
      "savedDrafts"
    );
    const draftDoc = doc(savedDraftsCollection, props.draft.draftId);
    deleteDoc(draftDoc);
    props.setCurrDraft(null);
  }

  return (
    <div className="view-draft">
      <div
        className={`view-draft-top ${
          props.isViewingFromContestPage && "view-draft-top-contest-page"
        }`}
      >
        {!props.isViewingFromContestPage && (
          <div className="idk-bro">
            <button
              className="icon-button-black"
              onClick={() => props.setCurrDraft(null)}
            >
              <FaArrowLeft className="icon" size={20} alt="back" />
            </button>
          </div>
        )}

        <div className="view-draft-info">
          <h3 className="view-draft-name">{props.draft.draftName}</h3>
          <h4 className="light">{date}</h4>
          {isContestEntry && !props.isViewingFromContestPage && (
            <h4 className="contest-indicator">Entered in Main Contest</h4>
          )}
          {props.isViewingFromContestPage && (
            <div className="view-draft-contest-page-btns">
              <button
                className="view-draft-contest-page-btn"
                onClick={props.removeEntryFromMainContest}
              >
                Remove
              </button>
              <Link to="/draft-board" state={props.draft}>
                <button className="view-draft-contest-page-btn">Edit</button>
              </Link>
            </div>
          )}
        </div>
        {!props.isViewingFromContestPage && (
          <div className="idk-bro">
            {!showDeleteConfirm ? (
              <div className="view-draft-btns">
                <button
                  className="icon-button-black"
                  onClick={() => setShowDeleteConfirm(true)}
                >
                  <FaTrash
                    className={`icon ${isContestEntry && "disabled"}`}
                    size={20}
                    alt="delete"
                  />
                </button>
                <Link to="/draft-board" state={props.draft}>
                  <FaEdit
                    className="icon"
                    size={20}
                    color={"black"}
                    alt="edit"
                  />
                </Link>
              </div>
            ) : (
              <div className="view-draft-btns">
                <button
                  className="icon-button-black"
                  onClick={() => setShowDeleteConfirm(false)}
                >
                  <FaTimes className="icon" size={20} alt="cancel" />
                </button>
                <button className="icon-button-black" onClick={deleteDraft}>
                  <FaCheck className="icon" size={20} alt="confirm" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="view-draft-mock-draft">
        {props.draft.draft.map((slot, index) => {
          const player = findProspect(slot.pick)
            ? findProspect(slot.pick)
            : "---";
          const team = findTeam(slot.team);
          return (
            <div className="view-draft-slot" key={index}>
              <img
                className="view-draft-slot-logo"
                src={team.logo}
                alt={`${team.teamName} logo`}
              ></img>
              <p className="view-draft-slot-pos">{index + 1}.</p>
              <p className="view-draft-slot-name">
                {player.firstName} {player.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewDraft;
