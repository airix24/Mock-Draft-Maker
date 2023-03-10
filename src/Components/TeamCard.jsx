import React from "react";
import "../Styles/TeamCard.css";
import { prospects } from "../Prospects";
import { FaTimes } from "react-icons/fa";

function TeamCard(props) {
  const draftPick = prospects.find((prospect) => prospect.id === props.pick);
  const teamNeedsString = props.teamNeeds.join(", ");
  const [isLogoHovered, setIsLogoHovered] = React.useState(false);
  const [isPlayerHovered, setIsPlayerHovered] = React.useState(false);
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

  return (
    <div className="team-card card">
      <div className="team-card-info">
        <img
          className="team-logo"
          src={props.logo}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        ></img>
        {isLogoHovered && (
          <div
            className="card"
            style={{
              position: "absolute",
              top: mousePosition.y - 30,
              left: mousePosition.x + 10,
              boxShadow: '0 0 5px gray',
              zIndex: 100,
            }}
          >
            <h5>Needs: {teamNeedsString}</h5>
          </div>
        )}

        <h3 className="pick-position">{props.draftPosition}.</h3>
        {props.pick && (
          <div className="drafted-player-info">
            <h3 className="drafted-player-name">
              {draftPick.firstName} {draftPick.lastName}
            </h3>
            <h3 className="light">{draftPick.position}</h3>
          </div>
        )}
      </div>

      {props.pick && (
        <FaTimes
          className="icon"
          size={15}
          onClick={() => props.removePlayer(draftPick.id)}
        />
      )}
    </div>
  );
}

export default TeamCard;
