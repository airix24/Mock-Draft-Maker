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
        mainColor={currTeam.mainColor}
        secondaryColor={currTeam.secondaryColor}
        pick={mockSlot.pick}
        removePlayer={props.removePlayer}
        teamNeeds={currTeam.needs}
        mode={props.mode}
        userTeam={props.userTeam}
        abr={currTeam.abr}
      />
    );
  });

  return (
    <div className="box">
      <div className="top-bar">
        {props.isSimulating ? (
          <button
            onClick={() => props.setIsSimulating(false)}
            className={props.mode === "builder" ? "stop-btn" : ""}
          >
            {props.mode === "builder" ? "Stop" : "Pause"}
          </button>
        ) : (
          <button
            className={
              props.isUserPick() || props.isDraftFinished() ? "disabled" : ""
            }
            onClick={() => props.setIsSimulating(true)}
          >
            {props.mode === "builder"
              ? "Simulate"
              : props.isDraftStarted()
              ? "Resume"
              : "Start Draft"}
          </button>
        )}
        {props.isDraftStarted() && (
          <button
            onClick={props.clearDraft}
            className={props.isSimulating ? "disabled" : null}
          >
            {props.mode === "builder" ? "Clear Draft" : "Restart Draft"}
          </button>
        )}

        <button
          className={props.isSimulating ? "disabled" : "disabled"}
          onClick={() => props.setShowTradeScreen(true)}
        >
          Make a Trade
        </button>
        {props.mode === "builder" || props.isDraftFinished() ? (
          <button
            className={props.isSimulating ? "disabled save-btn" : "save-btn"}
            onClick={() => props.setShowSaveScreen(true)}
          >
            Save Draft
          </button>
        ) : null}
      </div>
      <div className="teamContainer">{teamElements}</div>
    </div>
  );
}

export default TeamContainer;
