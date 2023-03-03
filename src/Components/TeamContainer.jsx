import React from "react";
import "../Styles/TeamContainer.css";
import TeamCard from "./TeamCard";
import { teams as teamList } from "../Teams";

function TeamContainer(props) {
  const teamElements = props.mockDraft.map((mockSlot, index) => {
    const currTeam = teamList.find((team) => team.abr === mockSlot.team);
    return (
      <TeamCard
        key={index}
        draftPosition={index + 1}
        city={currTeam.city}
        teamName={currTeam.teamName}
        logo={currTeam.logo}
        pick={mockSlot.pick}
        removePlayer={props.removePlayer}
      />
    );
  });

  return (
    <div className="box">
      <div className="top-bar">
        <button
          onClick={props.clearDraft}
          className={props.isSimulating ? "disabled" : null}
        >
          Clear Draft
        </button>
        {props.isSimulating ? (
          <button
            onClick={() => props.setIsSimulating(false)}
            className="stop-btn"
          >
            Stop
          </button>
        ) : (
          <button
            onClick={() => props.setIsSimulating(true)}
          >
            Simulate
          </button>
        )}

        <button className={props.isSimulating ? "disabled" : ""} onClick={() => props.setShowTradeScreen(true)}>
          Make a Trade
        </button>

        <button
          className={props.isSimulating ? "disabled save-btn" : "save-btn"}
          onClick={() => props.setShowSaveScreen(true)}
        >
          Save Draft
        </button>
      </div>
      <div className="teamContainer">{teamElements}</div>
    </div>
  );
}

export default TeamContainer;
