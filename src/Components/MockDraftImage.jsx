import React from "react";
import { findProspect, findTeam } from "../utils/helpers";
import logo from "../Assets/MM.ico";
import "../Styles/MockDraftImage.css";

function MockDraftImage({ draft, divRef, league, prospectClass }) {
  // map over draft array and create a div for each slot
  const draftElements = draft.map((slot, index) => {
    const player = findProspect(slot.pick, prospectClass)
      ? findProspect(slot.pick, prospectClass)
      : "---";
    const team = findTeam(slot.team, league);
    const teamLogo = `/assets/NFL_logos/${team.abr}.png`; // Assuming logos are in public/assets/NFL_logos/
    return (
      <div key={index} className="mock-draft-image-slot">
        <div className="mock-draft-image-logo-container">
          <img
            className="mock-draft-image-logo"
            src={teamLogo}
            alt={`${team.teamName} logo`}
          />
        </div>

        <div className="mock-draft-image-pick">{index + 1}.</div>
        {/* <div className="mock-draft-image-team">{team.abr} -</div> */}
        <div className="mock-draft-image-player">
          {player.firstName} {player.lastName}
        </div>
      </div>
    );
  });

  return (
    <div ref={divRef} className="mock-draft-image">
      <div className="mock-image-top">
        <div className="mock-draft-image-icon-container">
          <img
            src={logo}
            alt="Mock Mayhem Logo"
            className="mock-draft-image-icon"
          />
        </div>
        <h3 className="mock-draft-image-title">Mock Mayhem</h3>
        <div className="mock-draft-image-icon-container">
          <img
            src={logo}
            alt="Mock Mayhem Logo"
            className="mock-draft-image-icon"
          />
        </div>
      </div>
      <div className="mock-draft-image-container">{draftElements}</div>
      <div className="mock-image-bottom">
        Join the mock draft contest today at
        <span className="mock-draft-image-link">MockMayhem.com/contests</span>
      </div>
    </div>
  );
}

export default MockDraftImage;
