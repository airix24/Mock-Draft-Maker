import { useState } from "react";
import "../Styles/ControlPanel.css";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaSyncAlt,
  // FaExchangeAlt,
  FaSlidersH,
  FaSave,
  FaEraser,
} from "react-icons/fa";

function ControlPanel(props) {
  const [showSettings, setShowSettings] = useState(false);

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
      {props.mode === "editor" ? (
        <div className="control-panel-btns">
          <button
            className="control-panel-btn save-changes-btn icon-button"
            onClick={() => props.setShowSaveScreen(true)}
          >
            <FaSave size={20} />
            <p>Save Changes</p>
          </button>
        </div>
      ) : (
        <div className="control-panel-btns">
          <button
            className={`control-panel-btn icon-button ${
              props.isUserPick() || props.isDraftFinished() ? "disabled" : ""
            }`}
            type="button"
            onClick={() => props.setIsSimulating(!props.isSimulating)}
          >
            {getLabelAndIcon().icon}
            <p>{getLabelAndIcon().label}</p>
          </button>
          <button
            className={`control-panel-btn icon-button ${
              props.isDraftStarted() ? "" : "disabled"
            }`}
            onClick={() => props.clearDraft()}
          >
            {props.mode === "builder" ? (
              <FaEraser size={20} />
            ) : (
              <FaSyncAlt size={20} />
            )}
            <p>{props.mode === "builder" ? "Clear" : "Restart"}</p>
          </button>
          {/* <div
          className={`control-panel-btn disabled ${props.isSimulating && "disabled"}`}
          onClick={() => props.setShowTradeScreen(true)}
        >
          <FaExchangeAlt size={20} />
          <p>Trade</p>
        </div> */}

          <div
            className="control-panel-settings"
            onMouseEnter={() => setShowSettings(true)}
            onMouseLeave={() => setShowSettings(false)}
            onClick={() => setShowSettings(!showSettings)}
          >
            <button className="control-panel-btn control-panel-settings-btn icon-button">
              <FaSlidersH size={20} />
              <p>Settings</p>
            </button>
            {showSettings && (
              <div className="settings-pop-up">
                <div className="speed-slider">
                  <p>Speed</p>
                  <input
                    type="range"
                    min="0"
                    max="4000"
                    step="100"
                    value={Math.abs(props.speed - 4000)}
                    onChange={(e) => {
                      props.setSpeed(4000 - e.target.value);
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {props.mode === "builder" || props.isDraftFinished() ? (
            <button
              className={`control-panel-btn icon-button ${
                props.isSimulating ? "disabled" : ""
              }`}
              onClick={() => props.setShowSaveScreen(true)}
            >
              <FaSave size={20} />
              <p>Save</p>
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}

export default ControlPanel;
