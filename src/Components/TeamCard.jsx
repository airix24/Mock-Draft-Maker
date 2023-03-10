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
  // const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });

  // function handleBoxPosition(boxRef) {
  //   if (!boxRef) return;
  //   const boxWidth = boxRef.offsetWidth;
  //   const boxHeight = boxRef.offsetHeight;
  //   const screenWidth = window.innerWidth;
  //   const screenHeight = window.innerHeight;
  //   let newLeft = mousePosition.x + 10;
  //   let newTop = mousePosition.y + 10;

  //   if (newLeft + boxWidth > screenWidth) {
  //     newLeft = mousePosition.x - boxWidth - 10;
  //   }

  //   if (newTop + boxHeight > screenHeight) {
  //     newTop = mousePosition.y - boxHeight - 10;
  //   }

  //   setBoxPosition({ top: newTop, left: newLeft });
  // };

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
              boxShadow: "0 0 5px gray",
              zIndex: 100,
            }}
          >
            <h5>Needs: {teamNeedsString}</h5>
          </div>
        )}

        <h3 className="pick-position">{props.draftPosition}.</h3>
        {props.pick && (
          <div className="drafted-player-info">
            <h3
              className="drafted-player-name"
              onMouseEnter={() => setIsPlayerHovered(true)}
              onMouseLeave={() => setIsPlayerHovered(false)}
              onMouseMove={(e) =>
                setMousePosition({ x: e.clientX, y: e.clientY })
              }
            >
              {isPlayerHovered && (
                <div
                  // ref={handleBoxPosition}
                  style={{
                    position: "absolute",
                    top: mousePosition.y - 150,
                    left: mousePosition.x + 10,
                    boxShadow: "0 0 5px gray",
                    zIndex: 100,
                    backgroundImage: `linear-gradient(to bottom right, ${props.mainColor}, ${props.secondaryColor})`,
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
