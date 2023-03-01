import React from "react";

function SideMenu(props) {
  return (
    <div className="whole-screen">
      <div className="side-menu">
        <ul>
          <li onClick={() => {
            props.setShowSideMenu(false);
            props.setShowSavedDrafts(true);
          }}>View Saved Drafts</li>
        </ul>
      </div>
    </div>
  );
}

export default SideMenu;
