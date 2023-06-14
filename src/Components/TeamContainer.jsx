import React from "react";
import "../Styles/TeamContainer.css";
import TeamCard from "./TeamCard";
import { NFL_Teams } from "../Teams/NFL_Teams";
import { NBA_Teams } from "../Teams/NBA_Teams";

function TeamContainer(props) {
  const teamList = props.league === "NFL" ? NFL_Teams : NBA_Teams;

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
        league={props.league}
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
