import React from "react";
import "../Styles/ViewDraft.css";
import { findProspect, findTeam } from "../util";
import ViewDraftTop from "./ViewDraftTop";

function ViewDraft(props) {
  const isContestEntry = props.draft.contestsEntered.includes("mainContest");

  return (
    <div className="view-draft">
      <ViewDraftTop
        isViewingFromContestPage={props.isViewingFromContestPage}
        isContestEntry={isContestEntry}
        draft={props.draft}
        user={props.user}
        setCurrDraft={props.setCurrDraft}
        removeEntryFromMainContest={props.removeEntryFromMainContest}
      ></ViewDraftTop>
      <div className="view-draft-mock-draft">
        {props.draft.draft.map((slot, index) => {
          const player = findProspect(slot.pick)
            ? findProspect(slot.pick)
            : "---";
          const team = findTeam(slot.team);
          return (
            <div className="view-draft-slot" key={index}>
              <img
                className="view-draft-slot-logo"
                src={team.logo}
                alt={`${team.teamName} logo`}
              ></img>
              <p className="view-draft-slot-pos">{index + 1}.</p>
              <p className="view-draft-slot-name">
                {player.firstName} {player.lastName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewDraft;
