import React from "react";
import "../Styles/Header.css";
import { FaBars, FaTimes } from "react-icons/fa";

function Header(props) {
  return (
    <div className="header">
      <h1>Mock Draft Machine</h1>
      <FaBars
        className="icon header-icon"
        size={20}
        onClick={() => props.setShowSideMenu((prev) => !prev)}
      />
    </div>
  );
}

export default Header;
