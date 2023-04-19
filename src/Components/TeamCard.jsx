import { useState } from "react";
import "../Styles/TeamCard.css";
import { prospects } from "../Prospects";
import { FaTimes } from "react-icons/fa";
import PlayerCard from "./PlayerCard";

function TeamCard(props) {
  const draftPick = prospects.find((prospect) => prospect.id === props.pick);
  const teamNeedsString = props.teamNeeds.join(", ");
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isPlayerHovered, setIsPlayerHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`card team-card ${
        props.userTeam === props.abr ? "user-team-card" : ""
      }`}
    >
      <div className="team-card-info">
        <img
          className="team-logo"
          src={props.logo}
          alt={`${props.teamName} logo`}
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
        ></img>
        {isLogoHovered && (
          <div
            className="card"
            style={{
              position: "absolute",
              top: mousePosition.y - 70,
              left: mousePosition.x + 10,
              boxShadow: "0 0 5px gray",
              zIndex: 100,
            }}
          >
            <h5>Needs: {teamNeedsString}</h5>
          </div>
        )}

        <h4 className="pick-position">{props.draftPosition}.</h4>
        {props.pick && (
          <div className="drafted-player-info">
            <h4
              className="drafted-player-name"
              onMouseEnter={() => setIsPlayerHovered(true)}
              onMouseLeave={() => setIsPlayerHovered(false)}
              onMouseMove={(e) =>
                setMousePosition({ x: e.clientX, y: e.clientY })
              }
            >
              {isPlayerHovered && props.screenSize === "desktop" && (
                <div
                  style={{
                    position: "absolute",
                    top: mousePosition.y - 150,
                    left: mousePosition.x + 10,
                    boxShadow: "0 0 5px gray",
                    zIndex: 100,
                    backgroundImage: `linear-gradient(to bottom right, ${props.mainColor} 45%, ${props.secondaryColor} 55%)`,
                    borderRadius: "5px",
                    padding: "3px",
                    width: "400px",
                  }}
                >
                  <PlayerCard
                    key={draftPick.rank}
                    rank={draftPick.rank}
                    firstName={draftPick.firstName}
                    lastName={draftPick.lastName}
                    position={draftPick.position}
                    school={draftPick.school}
                    height={draftPick.height}
                    weight={draftPick.weight}
                    ras={draftPick.ras}
                    class={draftPick.class}
                    img={draftPick.img}
                    archetype={draftPick.archetype}
                    strengths={draftPick.strengths}
                    weaknesses={draftPick.weaknesses}
                    hoveredCard={true}
                  />
                </div>
              )}
              {draftPick.firstName} {draftPick.lastName}
            </h4>
            <h4 className="light">{draftPick.position}</h4>
          </div>
        )}
      </div>

      {props.pick && props.mode !== "gm" && (
        <button
          className="icon-button-black"
          onClick={() => props.removePlayer(draftPick.id)}
        >
          <FaTimes className="icon" size={18} alt="remove player" />
        </button>
      )}
    </div>
  );
}

export default TeamCard;
