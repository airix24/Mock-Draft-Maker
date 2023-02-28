import React from "react";
import { prospects } from "../Prospects";
import { FaTimes } from "react-icons/fa";

function TeamCard(props) {
  const draftPick = prospects.find((prospect) => prospect.id === props.pick);

  return (
    <div className="team-card card">
      <h2>{props.draftPosition}.</h2>
      <img className="team-logo" src={props.logo}></img>
      {/* {props.city} {props.teamName} */}
      {props.pick && (
        <h2>
          {draftPick.firstName} {draftPick.lastName}{" "}
          {
            <FaTimes
              className="icon x-icon"
              size={20}
              onClick={() => props.removePlayer(draftPick.id)}
            />
          }
        </h2>
      )}
      {/* {props.pick && (
        <div className="mini-player-card card">
          <div className="playerInfo">
            <img className="player-img-mini" src={draftPick.img}></img>
            <div>
              <h3>
                {draftPick.firstName} {draftPick.lastName}
              </h3>
              <h3>{draftPick.position}</h3>
            </div>
          </div>
          <FaTimes className="x-icon" size={20} onClick={() => props.removePlayer(draftPick.id)} />
        </div>
      )} */}
    </div>
  );
}

export default TeamCard;
