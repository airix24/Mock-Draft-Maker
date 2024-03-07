import React from "react";
import "../Styles/DropdownMenu.css";
import { Link } from "react-router-dom";

function DropdownMenu(props) {
  return (
    <div className="dropdown-menu">
      <Link
        to="/"
        className="dropdown-link"
        onClick={() => {
          props.setShowDropdownMenu(false);
        }}
      >
        Home
      </Link>
      <Link
        to="/draft-board"
        state={{
          league: "NFL",
          prospectClass: "NFL_2024",
          mode: "builder",
          draftLength: 32,
          draftData: null,
        }}
        className="dropdown-link"
        onClick={() => {
          props.setShowDropdownMenu(false);
        }}
      >
        Mock Draft Simulator
      </Link>
      <Link
        to="/contest-landing"
        className="dropdown-link"
        onClick={() => {
          props.setShowDropdownMenu(false);
        }}
      >
        Contests
      </Link>
      <Link
        to="/saved-drafts"
        className="dropdown-link"
        onClick={() => {
          props.setShowDropdownMenu(false);
        }}
      >
        Saved Drafts
      </Link>
      <div
        className="dropdown-link"
        onClick={() => {
          props.setShowDropdownMenu(false);
          props.setShowAuth(true);
        }}
      >
        {props.user ? <div>Account</div> : <div>Log In/Sign Up</div>}
      </div>
    </div>
  );
}

export default DropdownMenu;
