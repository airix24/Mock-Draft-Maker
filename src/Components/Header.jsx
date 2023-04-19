import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { FaUserCircle } from "react-icons/fa";
import Modal from "./Modal";
import Auth from "../Components/Auth";

function Header(props) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div>
      <div className="header">
        <h1>
          <Link to="/" className="link">
            Mock Mayhem
          </Link>
        </h1>
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
      {showAuth && (
        <Modal setShowSelf={setShowAuth}>
          <Auth user={props.user} setShowAuth={setShowAuth} />
        </Modal>
      )}
    </div>
  );
}

export default Header;
