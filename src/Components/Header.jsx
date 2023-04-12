import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Header.css";
import { FaUserCircle } from "react-icons/fa";
import Auth from "../Components/Auth";

function Header(props) {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div>
      <div className="header">
        <h1>
          <Link to="/" className="link">
            Mock Draft Machine
          </Link>
        </h1>
        <div
          className="profile-icon"
          onClick={() => {
            setShowAuth((prev) => !prev);
          }}
        >
          {props.user ? (
            <img className="profile-icon-pic" src={props.user.photoURL}></img>
          ) : (
            <FaUserCircle className="icon" size={25} />
          )}
        </div>
      </div>
      {showAuth && <Auth user={props.user} setShowAuth={setShowAuth} />}
    </div>
  );
}

export default Header;
