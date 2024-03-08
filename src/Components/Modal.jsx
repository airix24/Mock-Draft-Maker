import React from "react";
import { FaTimes } from "react-icons/fa";
import "../Styles/Modal.css";

function Modal(props) {
  return (
    <div
      className="outer-modal"
      onClick={() => {
        props.setShowSelf(false);
      }}
    >
      <div
        className="inner-modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        aria-modal="true"
      >
        <div className="modal-top-bar">
          <button
            className="icon-button"
            onClick={() => {
              props.setShowSelf(false);
            }}
          >
            <FaTimes className="icon" size={20} alt="close modal" />
          </button>
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
