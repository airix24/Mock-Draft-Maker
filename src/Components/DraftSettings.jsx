import React from "react";
import Modal from "./Modal";
import { Link } from "react-router-dom";
import "../Styles/DraftSettings.css";

function DraftSettings(props) {
  return (
    <Modal setShowSelf={props.setShowDraftSettings}>
      <div className="draft-settings-container">
        <Link
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
        </Link>
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
            prospectClass: "NFL_2023",
            mode: "builder",
            draftLength: 31,
            draftData: null,
          }}
        >
          <button className="draft-settings-btn">NFL 2023 First Round</button>
        </Link>
      </div>
    </Modal>
  );
}

export default DraftSettings;
