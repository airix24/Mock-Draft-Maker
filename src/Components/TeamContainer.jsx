import React from "react";
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
        <button onClick={props.clearDraft}>Clear Draft</button>
        <button className="save-btn" onClick={() => props.setShowSaveScreen(true)}>Save Draft</button>
      </div>
      <div className="teamContainer">
      {teamElements}
    </div>
    </div>
    
  )
}

export default TeamContainer;
