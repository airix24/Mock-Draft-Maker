import { useState, useRef } from "react";
import {
  FaArrowLeft,
  FaTrash,
  FaEdit,
  FaTimes,
  FaCheck,
  FaDownload,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/ViewDraftTop.css";
import { deleteDraft } from "../utils/firebaseFunctions";
import MockDraftImage from "./MockDraftImage";
import html2canvas from "html2canvas";

function ViewDraftTop(props) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const divRef = useRef(null);

  // make date readable in string form
  const date = new Date(
    props.draft.createdAt.seconds * 1000
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function handleDownload() {
    html2canvas(divRef.current).then((canvas) => {
      const link = document.createElement("a");
      link.download = "mock-mayhem.png";
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  return (
    <div
      className={`view-draft-top ${
        props.isViewingFromContestPage &&
        !props.isViewingFromLeaderboard &&
        "view-draft-top-contest-page"
      }`}
    >
      <MockDraftImage
        draft={props.draft.draft}
        divRef={divRef}
      ></MockDraftImage>
      {/* Left Side */}
      {(!props.isViewingFromContestPage || props.isViewingFromLeaderboard) && (
        <div className="idk-bro">
          <button
            className="icon-button-black"
            onClick={() => props.setCurrDraft(null)}
          >
            <FaArrowLeft className="icon" size={20} alt="back" />
          </button>
        </div>
      )}

      {/* Middle */}
      <div className="view-draft-info">
        <h3 className="view-draft-name">{props.draft.draftName}</h3>
        {!props.isContestClosed && <h4 className="light">{date}</h4>}
        {props.isContestEntry && !props.isViewingFromContestPage && (
          <h4 className="contest-indicator">Entered in Contest</h4>
        )}
        {props.isViewingFromContestPage &&
          !props.isContestClosed &&
          !props.isViewingFromLeaderboard && (
            <div className="view-draft-contest-page-btns">
              {/* <button
                className="view-draft-contest-page-btn"
                onClick={props.removeEntryFromMainContest}
              >
                Remove
              </button> */}
              {/* <Link to="/draft-board" state={props.draft}>
                <button className="view-draft-contest-page-btn">Edit</button>
              </Link> */}
            </div>
          )}
        {props.isContestClosed && (
          <h3>
            Score: <span style={{ color: "blue" }}>{props.totalScore}</span>
          </h3>
        )}
      </div>

      {/* Right Side */}
      {props.isViewingFromLeaderboard && (
        <div className="idk-bro">
          <button className={"icon-button-black"} onClick={handleDownload}>
            <FaDownload className="icon" size={20} alt="download" />
          </button>
        </div>
      )}
      {!props.isViewingFromContestPage && (
        <div className="idk-bro idk-bro-confirm-btns">
          {!showDeleteConfirm ? (
            <div className="view-draft-btns">
              {/* <button
                disabled={props.isContestEntry}
                className={`icon-button-black ${
                  props.isContestEntry && "disabled"
                }`}
                onClick={() => setShowDeleteConfirm(true)}
              >
                <FaTrash className="icon" size={20} alt="delete" />
              </button> */}
              {/* <Link to="/draft-board" state={props.draft} className="edit-link">
                <FaEdit className="icon" size={20} color={"black"} alt="edit" />
              </Link> */}
              <button className={"icon-button-black"} onClick={handleDownload}>
                <FaDownload className="icon" size={20} alt="download" />
              </button>
            </div>
          ) : (
            <div className="view-draft-btns">
              <button
                className="icon-button-black"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <FaTimes className="icon" size={20} alt="cancel" />
              </button>
              <button
                className="icon-button-black"
                onClick={() => {
                  deleteDraft(props.user.uid, props.draft.draftId);
                  props.setCurrDraft(null);
                }}
              >
                <FaCheck className="icon" size={20} alt="confirm" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewDraftTop;
