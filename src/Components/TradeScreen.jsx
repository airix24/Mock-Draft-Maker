import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "../Styles/TradeScreen.css";
import { teams } from "../Teams";

function TradeScreen(props) {
  const [team1Abr, setTeam1] = useState(
    props.mode === "gm" ? props.userTeam : "GB"
  );
  const [team2Abr, setTeam2] = useState("GB");

  const team1 = teams.find((team) => team.abr === team1Abr);
  const team2 = teams.find((team) => team.abr === team2Abr);

  const team1PicksElements = team1.picks.map((pick, index) => (
    <div className="pick-div" key={index}>
      {pick}
    </div>
  ));

  const team2PicksElements = team2.picks.map((pick, index) => (
    <div className="pick-div pick-div-selected" key={index}>
      {pick}
    </div>
  ));

  const optionElements = teams.map((team, index) => (
    <option key={index} value={team.abr}>
      {team.city} {team.teamName}
    </option>
  ));

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowTradeScreen(false)}
    >
      <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowTradeScreen(false)}
          />
        </div>
        <div className="modal-content">
          <h1>Trade Screen</h1>
          <div className="trade-container">
            <div className="trade-team-container">
              <h2>Team 1</h2>
              {props.mode === "gm" ? (
                <h3>
                  {team1.city} {team1.teamName}
                </h3>
              ) : (
                <select
                  value={team1.abr}
                  onChange={(e) => setTeam1(e.target.value)}
                >
                  {optionElements}
                </select>
              )}
              <img src={team1.logo} alt="team logo" />
              <div className="picks-container">{team1PicksElements}</div>
            </div>
            <div className="trade-team-container">
              <h2>Team 2</h2>
              <select
                value={team2.abr}
                onChange={(e) => setTeam2(e.target.value)}
              >
                {optionElements}
              </select>
              <img src={team2.logo} alt="team logo" />
              <div className="picks-container"> {team2PicksElements}</div>
            </div>
          </div>
          <button>Make Trade</button>
        </div>
      </div>
    </div>
  );
}

export default TradeScreen;
