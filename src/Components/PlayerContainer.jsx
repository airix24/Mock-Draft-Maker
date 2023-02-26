import React from "react";
import PlayerCard from "./PlayerCard";

function PlayerContainer(props) {
  const [selectedPosition, setSelectedPosition] = React.useState("all");

  const playerElements = props.playerPool.map((player, index) => {
    if (!player.drafted && (selectedPosition === "all" || selectedPosition.toUpperCase() === player.position)) {
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

  return (
    <div className="box">
      <div className="top-bar">
        <label>
          position: {" "}
          <select name="positions" value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)}>
            <option value="all">All</option>
            <option value="qb">QB</option>
            <option value="rb">RB</option>
            <option value="wr">WR</option>
            <option value="te">TE</option>
            <option value="t">T</option>
            <option value="g">G</option>
            <option value="di">DI</option>
            <option value="ed">ED</option>
            <option value="lb">LB</option>
            <option value="s">S</option>
            <option value="cb">CB</option>
          </select>
        </label>
      </div>
      <div className="playerContainer">{playerElements}</div>
    </div>
  );
}

export default PlayerContainer;
