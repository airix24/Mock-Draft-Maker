import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";

function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/" className="link" >Mock Draft Machine</Link>
      </h1>
    </div>
  );
}

export default Header;
