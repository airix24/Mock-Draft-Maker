import { useState } from "react";
import "../Styles/PlayerContainer.css";
import "../Styles/slider.css";
import PlayerCard from "./PlayerCard";

function PlayerContainer(props) {
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [showWatchlist, setShowWatchList] = useState(false);
  const [search, setSearch] = useState("");

  const NFL_Positions = [
    "All",
    "QB",
    "RB",
    "WR",
    "TE",
    "T",
    "G",
    "C",
    "DI",
    "ED",
    "LB",
    "S",
    "CB",
  ];

  const NBA_Positions = ["All", "PG", "SG", "SF", "PF", "C"];

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

  const playerElements = filterPlayers(props.playerPool).map(
    (player, index) => {
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
          isDraftFinished={props.isDraftFinished}
          starred={player.starred}
          playerPool={props.playerPool}
          setPlayerPool={props.setPlayerPool}
          screenSize={props.screenSize}
          expanded={player.expanded}
          league={props.league}
          wingspan={player.wingspan}
        />
      );
    }
  );

  const positionOptions =
    props.league === "NFL" ? NFL_Positions : NBA_Positions;

  const positionElements = positionOptions.map((position, index) => {
    return (
      <option key={index} value={position.toLowerCase()}>
        {position}
      </option>
    );
  });

  return (
    <div className="box">
      <div className="player-cont-top-bar top-bar">
        <label>
          <select
            name="positions"
            className="position-select"
            value={selectedPosition}
            onChange={(e) => setSelectedPosition(e.target.value)}
          >
            {positionElements}
          </select>
        </label>
        <div className="watchlist-toggle">
          <label className="switch-label">Watchlist:</label>
          <label className="switch">
            <input
              type="checkbox"
              checked={showWatchlist}
              onChange={(e) => setShowWatchList(e.target.checked)}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <label>
          <input
            type="text"
            value={search}
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          ></input>
        </label>
      </div>
      <div className="playerContainer">
        {playerElements}
        {playerElements.length === 0 ? (
          <div className="no-players-message">
            <h3>
              {search !== ""
                ? "No players match search"
                : showWatchlist
                ? "Watchlist is empty"
                : "No players left at position"}
            </h3>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default PlayerContainer;
