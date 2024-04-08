import React from "react";
import "../Styles/ContestPromoHome.css";
import { Link } from "react-router-dom";

function ContestPromoHome() {
  return (
      <div className="promo-container">
        <h1 className="contest-promo-title">
          <em>The Mock Mayhem Draft Contest is Open!</em>
        </h1>
        <p className="contest-promo-text">
          <em>
            Compete against others in an NFL mock draft contest for a chance to
            win prizes! Free to enter!
          </em>
        </p>
        <Link to="/contests" className="contest-promo-btn">
          Learn More
        </Link>
      </div>
  );
}

export default ContestPromoHome;
