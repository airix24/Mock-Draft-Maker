import React from "react";
import Modal from "./Modal";
import "../Styles/EnterContest.css";
import { Link } from "react-router-dom";

function EnterContest(props) {
  // get saved drafts from local storage
  //   const savedDrafts = JSON.parse(localStorage.getItem("savedDrafts")) || [];
  const savedDrafts = [];
  console.log(savedDrafts);

  return (
    <Modal setShowSelf={props.setShowEnterContest}>
      {savedDrafts.length === 0 ? (
        <div className="enter-contest-content">
          <p className="light">
            You have no saved drafts. Create and save a mock draft to enter the
            contest.
          </p>
          <Link to="/draft-board">
            <button>Go to Mock Builder</button>
          </Link>
        </div>
      ) : (
        <div className="enter-contest-content">
          <h2>Choose a Draft</h2>
          <select>
            {savedDrafts.map((draft) => (
              <option key={draft.id}>{draft.name}</option>
            ))}
          </select>
          <button>Enter</button>
        </div>
      )}
    </Modal>
  );
}

export default EnterContest;
