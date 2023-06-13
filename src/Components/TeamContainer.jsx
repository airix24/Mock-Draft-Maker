import React from "react";
import "../Styles/TeamContainer.css";
import TeamCard from "./TeamCard";
import { teams as teamList } from "../Teams/NFL_Teams";

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
        mainColor={currTeam.mainColor}
        secondaryColor={currTeam.secondaryColor}
        pick={mockSlot.pick}
        removePlayer={props.removePlayer}
        teamNeeds={currTeam.needs}
        mode={props.mode}
        userTeam={props.userTeam}
        abr={currTeam.abr}
        screenSize={props.screenSize}
      />
    );
  });

  return (
    <div className="box">
      {props.screenSize === "desktop" && <div className="top-bar"></div>}
      <div className="teamContainer">{teamElements}</div>
    </div>
  );
}

export default TeamContainer;
