import { useState } from "react";
import "../Styles/TeamCard.css";
import { NFL_2023_Prospects } from "../Prospects/NFL_2023";
import { NFL_2024_Prospects } from "../Prospects/NFL_2024";
import { NFL_2025_Prospects } from "../Prospects/NFL_2025";
import { NBA_2023_Prospects } from "../Prospects/NBA_2023";
import { FaTimes } from "react-icons/fa";
import PlayerCard from "./PlayerCard";

function TeamCard(props) {
  const prospects =
    props.league === "NFL" ? NFL_2025_Prospects : NBA_2023_Prospects; // temporary solution

  const draftPick = prospects.find((prospect) => prospect.id === props.pick);
  const teamNeedsString = props.teamNeeds.join(", ");
  // const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isPlayerHovered, setIsPlayerHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <div
      className={`card team-card ${
        props.userTeam === props.abr ? "user-team-card" : ""
      }`}
    >
      <div className="team-card-info">
        <div className="team-card-logo-container">
          <img
            className="team-logo"
            src={props.logo}
            alt={`${props.teamName} logo`}
            // onMouseEnter={() => setIsLogoHovered(true)}
            // onMouseLeave={() => setIsLogoHovered(false)}
            // onMouseMove={(e) => setMousePosition({ x: e.clientX, y: e.clientY })}
          ></img>
        </div>
        {/* {isLogoHovered && (
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
        )} */}

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
                    league={props.league}
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
