import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import Modal from "./Modal";
import Auth from "../Components/Auth";
import DropdownMenu from "../Components/DropdownMenu";

function Header(props) {
  const [showAuth, setShowAuth] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);

  return (
    <div>
      <div className="header">
        {props.screenSize === "desktop" ? (
          <div className="desktop-header">
            <h1 className="header-title header-title-desktop">
              <Link to="/" className="link">
                Mock Mayhem
              </Link>
            </h1>
            <div className="nav">
              <Link
                to="/draft-board"
                state={{
                  league: "NFL",
                  prospectClass: "NFL_2024",
                  mode: "builder",
                  draftLength: 32,
                  draftData: null,
                }}
                className="nav-link"
              >
                Mock Draft Simulator
              </Link>
              <Link to="/contest-landing" className="nav-link">
                Contests
              </Link>
              <Link to="/saved-drafts" className="nav-link">
                Saved Drafts
              </Link>
            </div>
            <div
              className="profile-icon"
              onClick={() => {
                setShowAuth((prev) => !prev);
              }}
            >
              {props.user ? (
                <button className="icon-button">
                  <img
                    className="profile-icon-pic"
                    src={props.user.photoURL}
                    alt="user icon"
                  ></img>
                </button>
              ) : (
                <FaUserCircle className="icon" size={25} alt="user icon" />
              )}
            </div>
          </div>
        ) : (
          <>
          <div className="mobile-tablet-header">
            <h1 className="header-title">
              <Link to="/" className="link">
                Mock Mayhem
              </Link>
            </h1>
            
          </div>
          <div
              className="hamburger-container"
              onClick={() => {
                setShowDropdownMenu((prev) => !prev);
              }}
            >
              {showDropdownMenu ? (
                <FaTimes className="icon" size={25} alt="menu icon" />
              ) : (
                <FaBars className="icon" size={25} alt="menu icon" />
              )}
            </div>
          </>
        )}
      </div>
      {showAuth && (
        <Modal setShowSelf={setShowAuth}>
          <Auth user={props.user} setShowAuth={setShowAuth} />
        </Modal>
      )}
      {showDropdownMenu && (
        <DropdownMenu
          setShowDropdownMenu={setShowDropdownMenu}
          user={props.user}
          setShowAuth={setShowAuth}
        />
      )}
    </div>
  );
}

export default Header;
