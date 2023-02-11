import React from "react";
import PlayerCard from "./PlayerCard";

function PlayerContainer(props) {
  const playerElements = props.playerPool.map((player, index) => {
    if (!player.drafted) {
      return (
        <PlayerCard
          key={index}
          firstName={player.firstName}
          lastName={player.lastName}
          position={player.position}
          school={player.school}
          height={player.height}
          weight={player.weight}
          age={player.age}
          img={player.img}
          id={player.id}
          addPlayer={props.addPlayer}
        />
      );
    }
  });

  return <div className="playerContainer">{playerElements}</div>;
}

export default PlayerContainer;
