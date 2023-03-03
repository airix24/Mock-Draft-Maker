import React from "react";
import { FaTimes } from "react-icons/fa";
import "../Styles/TradeScreen.css";

function TradeScreen(props) {
  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowTradeScreen(false)}
    >
      <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowTradeScreen(false)}
          />
        </div>
        <div className="modal-content">
          <h1>Trade Screen</h1>
          <div className="trade-container">
            <div className="trade-team-container">
                <h2>Other Team</h2>
            </div>
            <div className="trade-team-container">
                <h2>User Team</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TradeScreen;
