import React from "react";
import "../Styles/ContestPromoHome.css";
import { Link } from "react-router-dom";

function ContestPromoHome() {
  return (
      <div className="promo-container">
        <h1 className="contest-promo-title">
          The NFL Mock Draft Contest is Open!
        </h1>
        <p className="contest-promo-text">
          <em>
            Compete against others in a 2024 first round NFL mock draft contest for a chance to
            win prizes! Free to enter!
          </em>
        </p>
        <div>
          <Link 
            to="/contests" 
            className="contest-promo-btn"
          >
            Learn More
          </Link>
        </div>
      </div>
  );
}

export default ContestPromoHome;
