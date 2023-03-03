import React from "react";
import "../Styles/SideMenu.css";

function SideMenu(props) {
  return (
    <div className="whole-screen" onClick={() => props.setShowSideMenu(false)}>
      <div className="side-menu" onClick={(e) => e.stopPropagation()}>
        <ul>
          <li
            onClick={() => {
              props.setShowSideMenu(false);
              props.setShowSavedDrafts(true);
            }}
          >
            View Saved Drafts
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
