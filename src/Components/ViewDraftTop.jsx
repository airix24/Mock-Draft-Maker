import { useState, useRef } from "react";
import {
  FaArrowLeft,
  FaTrash,
  FaEdit,
  FaTimes,
  FaCheck,
  FaDownload,
  FaCopy,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/ViewDraftTop.css";
import {
  deleteDraft,
  removeDraftFromContest,
} from "../utils/firebaseFunctions";
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

  function handleCopy() {
    html2canvas(divRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        const clipboardItem = new ClipboardItem({ 'image/png': blob });
        navigator.clipboard.write([clipboardItem]).then(() => {
          alert('Image copied to clipboard');
        }).catch((error) => {
          console.error('Error copying image to clipboard:', error);
        });
      });
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
        league={props.draft.league ? props.draft.league : "NFL"}
        prospectClass={
          props.draft.prospectClass ? props.draft.prospectClass : "NFL_2023"
        }
      ></MockDraftImage>
      {/* Left Side */}
      <div className="view-draft-btns">
        {/* <button className="icon-button-black" onClick={handleCopy}>
          <FaCopy className="icon" size={20} alt="copy" />
        </button> */}
        <button className={"icon-button-black"} onClick={handleDownload}>
          <FaDownload className="icon" size={20} alt="download" />
        </button>
      </div>

      {/* {(props.isViewingFromContestPage || props.isViewingFromLeaderboard) && (
        <div className="idk-bro-contest"></div>
      )} */}

      {/* {(!props.isViewingFromContestPage || props.isViewingFromLeaderboard) && (
        <div className="idk-bro">
          <button
            className="icon-button-black"
            onClick={() => props.setCurrDraft(null)}
          >
            <FaArrowLeft className="icon" size={20} alt="back" />
          </button>
        </div>
      )} */}

      {/* {!props.isViewingFromContestPage && <div className="idk-bro"></div>} */}

      {/* Middle */}
      <div className="view-draft-info">
        <h3 className="view-draft-name">{props.draft.draftName}</h3>
        {!props.isViewingFromLeaderboard && <h4 className="light">{date}</h4>}
        {/* {props.isContestEntry && !props.isViewingFromContestPage && (
          <h4 className="contest-indicator">Entered in Contest</h4>
        )} */}
        {props.isViewingFromContestPage &&
          !props.isContestClosed &&
          !props.isViewingFromLeaderboard &&
          props.isContestEntry && (
            <div className="view-draft-contest-page-btns">
              {/* <button
                className="view-draft-contest-page-btn"
                onClick={() => {
                  removeDraftFromContest(
                    props.user.uid,
                    props.currContestId
                  ).then(() => {
                    alert("Entry removed from contest. Refresh if the page doesn't update.");
                    props.setDraftJustRemoved(true);
                  });
                  props.setShowViewDraft(false);
                }}
              >
                Remove
              </button> */}
              {/* <Link
                to="/draft-board"
                state={{
                  league: props.draft.league ? props.draft.league : "NFL",
                  prospectClass: props.draft.prospectClass
                    ? props.draft.prospectClass
                    : "NFL_2023",
                  mode: "editor",
                  draftLength: props.draft.draftLength
                    ? props.draft.draftLength
                    : 31,
                  draftData: props.draft,
                }}
              >
                <button className="view-draft-contest-page-btn">Edit</button>
              </Link> */}
            </div>
          )}
        {props.isViewingFromLeaderboard && (
          <h3>
            Score: <span style={{ color: "" }}>{props.draft.score}</span>
          </h3>
        )}
      </div>

      {/* Right Side */}
      {(props.isViewingFromContestPage || props.isViewingFromLeaderboard) && (
        <div className="view-draft-btns">
            {/* <button className={"icon-button-black"} onClick={handleDownload}>
              <FaDownload className="icon" size={20} alt="download" />
            </button> */}
        </div>
      )}
      {!props.isViewingFromContestPage && (
        <div className="idk-bro">
          {!showDeleteConfirm ? (
            <div className="view-draft-btns">
              {!props.isContestEntry && (
                <>
                  <button
                    disabled={props.isContestEntry}
                    className={`icon-button-black ${
                      props.isContestEntry && "disabled"
                    }`}
                    onClick={() => setShowDeleteConfirm(true)}
                  >
                    <FaTrash className="icon" size={20} alt="delete" />
                  </button>
                  {props.draft.prospectClass === "NFL_2024" && (
                    <Link
                      to="/draft-board"
                      state={{
                        league: props.draft.league ? props.draft.league : "NFL",
                        prospectClass: props.draft.prospectClass
                          ? props.draft.prospectClass
                          : "NFL_2023",
                        mode: "editor",
                        draftLength: props.draft.draftLength
                          ? props.draft.draftLength
                          : 31,
                        draftData: props.draft,
                      }}
                      className="edit-link"
                    >
                      <FaEdit
                        className="icon"
                        size={20}
                        color={"black"}
                        alt="edit"
                      />
                    </Link>
                  )}
                </>
              )}
              {/* <button
                className="icon-button-black"
                onClick={handleCopy}
              >
                <FaCopy className="icon" size={20} alt="copy" />
              </button>
              <button className={"icon-button-black"} onClick={handleDownload}>
                <FaDownload className="icon" size={20} alt="download" />
              </button> */}
            </div>
          ) : (
            // if showDeleteConfirm is true, show the confirm delete buttons
            <div className="view-draft-btns">
              <button
                className="icon-button-black"
                onClick={() => setShowDeleteConfirm(false)}
              >
                <FaTimes className="icon" size={20} alt="cancel" />
              </button>
              <button
                className="icon-button-black"
                onClick={async () => {
                  await deleteDraft(props.user.uid, props.draft.draftId).then(
                    () => {
                      props.setIsDraftJustDeleted(props.draft.draftId);
                      props.setCurrDraft(null);
                    }
                  );
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
