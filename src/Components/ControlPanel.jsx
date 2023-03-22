import React from "react";
import "../Styles/ControlPanel.css";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaSyncAlt,
  FaExchangeAlt,
  FaSlidersH,
  FaSave,
  FaEraser,
} from "react-icons/fa";

function ControlPanel(props) {
    function getLabelAndIcon() {
        if (props.isSimulating) {
          if (props.mode === "builder") {
            return {
              label: "Stop",
              icon: <FaStop size={20} />,
            };
          } else {
            return {
              label: "Pause",
              icon: <FaPause size={20} />,
            };
          }
        } else {
          if (props.mode === "builder") {
            return {
              label: "Simulate",
              icon: <FaPlay size={20} />,
            };
          } else {
            if (props.isDraftStarted()) {
              return {
                label: "Resume",
                icon: <FaPlay size={20} />,
              };
            } else {
              return {
                label: "Start",
                icon: <FaPlay size={20} />,
              };
            }
          }
        }
      }

  return (
    <div className="control-panel">
      <div className="control-panel-btns">
        <div className={`control-panel-btn ${props.isUserPick() || props.isDraftFinished() ? "disabled" : ""}`}
            onClick={() => props.setIsSimulating(!props.isSimulating)}
        >
          {getLabelAndIcon().icon}
          <p>{getLabelAndIcon().label}</p>
        </div>
        <div className="control-panel-btn" onClick={() => props.clearDraft()}>
          {props.mode === "builder" ? (
            <FaEraser size={20} />
          ) : (
            <FaSyncAlt size={20} />
          )}
          <p>{props.mode === "builder" ? "Clear" : "Restart"}</p>
        </div>
        <div className="control-panel-btn disabled">
          <FaExchangeAlt size={20} />
          <p>Trade</p>
        </div>
        <div className="control-panel-btn disabled">
          <FaSlidersH size={20} />
          <p>Settings</p>
        </div>
        {props.mode === "builder" || props.isDraftFinished() ? (
          <div
            className={`control-panel-btn ${
              props.isSimulating ? "disabled" : ""
            }`}
            onClick={() => props.setShowSaveScreen(true)}
          >
            <FaSave size={20} />
            <p>Save</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ControlPanel;
