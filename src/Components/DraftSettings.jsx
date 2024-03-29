import React from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import "../Styles/DraftSettings.css";

function DraftSettings(props) {
  return (
    <Modal setShowSelf={props.setShowDraftSettings}>
      <div className="draft-settings-container">
        {/* <Link
          to="/draft-board"
          state={{
            league: "NBA",
            prospectClass: "NBA_2023",
            mode: "builder",
            draftLength: 14,
            draftData: null,
          }}
        >
          <button className="draft-settings-btn">NBA 2023 Lottery</button>
        </Link> */}
        {/* <Link
          to="/draft-board"
          state={{
            league: "NBA",
            prospectClass: "NBA_2023",
            mode: "builder",
            draftLength: 30,
            draftData: null,
          }}
        >
          <button className="draft-settings-btn">NBA 2023 First Round</button>
        </Link> */}
        <Link
          to="/draft-board"
          state={{
            league: "NFL",
            prospectClass: "NFL_2024",
            mode: "builder",
            draftLength: 32,
            draftData: null,
          }}
        >
          <button className="draft-settings-btn">NFL 2024 First Round</button>
        </Link>
        <button className="draft-settings-btn disabled second-rnd-btn">NFL 2024 Second Round<span>(will open after day one)</span></button>
      </div>
    </Modal>
  );
}

export default DraftSettings;
