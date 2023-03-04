import React from "react";
import { Link } from "react-router-dom";
import "../Styles/StartupScreen.css";

function StartupScreen() {
  return (
    <>
      <div className="context">
        <div className="startup-menu-content">
          <button className="startup-btn disabled">
            <h3>
              <Link to="/" className="startup-link">Be The GM</Link>
            </h3>
          </button>
          <button className="startup-btn">
            <h3>
              <Link to="/draft-board" className="startup-link">Playground</Link>
            </h3>
          </button>
          <button className="startup-btn">
            <h3>
              <Link to="/saved-drafts" className="startup-link">Saved Drafts</Link>
            </h3>
          </button>
        </div>
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}

export default StartupScreen;
