import { useState } from "react";
import "../Styles/PlayerContainer.css";
import PlayerCard from "./PlayerCard";

function PlayerContainer(props) {
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [showWatchlist, setShowWatchList] = useState(false);
  const [search, setSearch] = useState("");

  // This is the function that filters the player pool based on the selected position, search query, and whether or not the player has been drafted
  // If showWatchlist is true, it will only show players that are starred
  function filterPlayers(newPool) {
    return newPool.filter(
      (player) =>
        !player.drafted &&
        (selectedPosition === "all" ||
          selectedPosition.toUpperCase() === player.position) &&
        (player.firstName.toLowerCase().includes(search.toLowerCase()) ||
          player.lastName.toLowerCase().includes(search.toLowerCase())) &&
        (!showWatchlist || player.starred)  
    );
  }

  // function filterPlayers(newPool) {
  //   return newPool.filter(
  //     (player) =>
  //       !player.drafted &&
  //       (selectedPosition === "all" ||
  //         selectedPosition.toUpperCase() === player.position) &&
  //       (player.firstName.toLowerCase().includes(search.toLowerCase()) ||
  //       player.lastName.toLowerCase().includes(search.toLowerCase()))
  //   );
  // }

  const playerElements = filterPlayers(props.playerPool).map((player, index) => {
      return (
        <PlayerCard
          key={index}
          rank={player.rank}
          firstName={player.firstName}
          lastName={player.lastName}
          position={player.position}
          school={player.school}
          height={player.height}
          weight={player.weight}
          ras={player.ras}
          class={player.class}
          img={player.img}
          id={player.id}
          addPlayer={props.addPlayer}
          archetype={player.archetype}
          strengths={player.strengths}
          weaknesses={player.weaknesses}
          isSimulating={props.isSimulating}
          mode={props.mode}
          isUserPick={props.isUserPick}
          starred={player.starred}
          playerPool={props.playerPool}
          setPlayerPool={props.setPlayerPool}
        />
      );
    });

  return (
    <div className="box">
      <div className="top-bar">
        <label>
          Position:{" "}
          <select
            name="positions"
            className="position-select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            <option value="all">All</option>
            <option value="qb">QB</option>
            <option value="rb">RB</option>
            <option value="wr">WR</option>
            <option value="te">TE</option>
            <option value="t">T</option>
            <option value="g">G</option>
            <option value="c">C</option>
            <option value="di">DI</option>
            <option value="ed">ED</option>
            <option value="lb">LB</option>
            <option value="s">S</option>
            <option value="cb">CB</option>
          </select>
        </label>
        <button onClick={() => setShowWatchList(prev => !prev)}>Toggle Watchlist</button>
        <label>
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </label>
      </div>
      <div className="playerContainer">{playerElements}</div>
    </div>
  );
}

export default PlayerContainer;
