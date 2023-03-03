import React from "react";
import "../Styles/SaveScreen.css";
import { FaTimes } from "react-icons/fa";

function SaveScreen(props) {
  return (
    <div className="outer-modal" onClick={() => props.setShowSaveScreen(false)}>
      <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowSaveScreen(false)}
          />
        </div>
        <div className="modal-content">
          <h3 className="save-text">Enter a name for your draft</h3>
          <form className="save-form" onSubmit={(e) => {
            e.preventDefault();
            props.saveDraft(e.target[0].value);
          }}>
            <input type="text" className="save-bar" />
            <button className="save-btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveScreen;
