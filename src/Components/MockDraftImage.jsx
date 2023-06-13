import React from "react";
import { findProspect, findTeam } from "../utils/helpers";
import "../Styles/MockDraftImage.css";

function MockDraftImage({ draft, divRef }) {
  const draftElements = draft.map((slot, index) => {
    const player = findProspect(slot.pick) ? findProspect(slot.pick) : "---";
    const team = findTeam(slot.team);
    return (
      <div key={index} className="mock-draft-image-slot">
        {/* <img
          className="mock-draft-image-logo"
          src={team.logo}
          alt={`
            ${team.teamName} logo
        `}
        /> */}

        <div className="mock-draft-image-pick">{index + 1}.</div>
        <div className="mock-draft-image-team">{team.abr} -</div>
        <div className="mock-draft-image-player">
          {player.firstName} {player.lastName}
        </div>
      </div>
    );
  });

  return (
    <div ref={divRef} className="mock-draft-image">
      <div className="mock-image-top">MockMayhem.com</div>
      <div className="mock-draft-image-container">{draftElements}</div>
      <div className="mock-image-bottom">
      </div>
    </div>
  );
}

export default MockDraftImage;
