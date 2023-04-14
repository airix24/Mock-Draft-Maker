import React from "react";
import { FaTimes } from "react-icons/fa";

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
      >
        <div className="top-bar">
          <FaTimes
            className="icon"
            onClick={() => {
              props.setShowSelf(false);
            }}
            size={20}
          />
        </div>
        <div className="modal-content">{props.children}</div>
      </div>
    </div>
  );
}

export default Modal;
