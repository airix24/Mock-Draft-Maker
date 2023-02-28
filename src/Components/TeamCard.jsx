import React from "react";
import { prospects } from "../Prospects";
import { FaTimes } from "react-icons/fa";

function TeamCard(props) {
  const draftPick = prospects.find((prospect) => prospect.id === props.pick);

  return (
    <div className="team-card card">
      <div className="team-card-info">
        <img className="team-logo" src={props.logo}></img>
        <h3 className="pick-position">{props.draftPosition}.</h3>
        {props.pick && (
          <h3>
            {draftPick.firstName} {draftPick.lastName}
          </h3>
        )}
      </div>

      {props.pick && (
        <FaTimes
          className="icon x-icon"
          size={15}
          onClick={() => props.removePlayer(draftPick.id)}
        />
      )}
    </div>
  );
}

export default TeamCard;
