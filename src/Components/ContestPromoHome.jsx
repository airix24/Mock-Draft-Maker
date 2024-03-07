import React from "react";
import "../Styles/ContestPromoHome.css";
import { Link } from "react-router-dom";

function ContestPromoHome() {
return (
    <div className="contest-promo-home">
        <h1 className="contest-promo-title"><em>The Mock Mayhem 2024 Draft Contest is Coming Soon</em></h1>
        <Link to="/contest-landing" className="contest-promo-btn">Learn More</Link>
        {/* <button className="contest-promo-btn">Draft Now</button> */}
    </div>
);
}

export default ContestPromoHome;
