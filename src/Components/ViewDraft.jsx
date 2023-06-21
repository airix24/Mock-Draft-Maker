import "../Styles/ViewDraft.css";
import { findProspect, findTeam } from "../utils/helpers";
import ViewDraftTop from "./ViewDraftTop";

function ViewDraft(props) {
  const isContestEntry = props.draft.contestsEntered.length > 0;

  // calculate points for each slot. One point if the player is included at all, 3 points total if the player is matched with the right team. draftResults is a map of team abr to player id
  function calculatePoints(playerId, teamAbr) {
    let points = 0;
    let playerFound = false;
    for (let i = 0; i < props.draftResults.length; i++) {
      const pick = props.draftResults[i];
      if (pick.player === playerId && pick.team === teamAbr) {
        points += 3;
        playerFound = true;
        break;
      } else if (pick.player === playerId) {
        points += 1;
        playerFound = true;
        // no need to continue looping if player is found
        break;
      }
    }
    return points;
  }

  // calculate total score for the draft
  const totalScore = !props.isViewingFromContestPage
    ? null
    : props.draft.draft.reduce((total, slot) => {
        const player = findProspect(slot.pick, props.prospectClass)
          ? findProspect(slot.pick, props.prospectClass)
          : "---";
        const team = findTeam(slot.team, props.league);
        const pts = calculatePoints(player.id, team.abr);
        return total + pts;
      }, 0);

  return (
    <div className="view-draft">
      <ViewDraftTop
        isViewingFromContestPage={props.isViewingFromContestPage}
        isContestEntry={isContestEntry}
        draft={props.draft}
        user={props.user}
        setCurrDraft={props.setCurrDraft}
        removeEntryFromLotteryContest={props.removeEntryFromLotteryContest}
        isContestClosed={props.isContestClosed}
        totalScore={totalScore}
        isViewingFromLeaderboard={props.isViewingFromLeaderboard}
        currContestId={props.currContestId}
      />
      <div className="view-draft-mock-draft">
        {props.draft.draft.map((slot, index) => {
          const player = findProspect(slot.pick, props.prospectClass)
            ? findProspect(slot.pick, props.prospectClass)
            : "---";
          const team = findTeam(slot.team, props.league);
          const pts = !props.isViewingFromContestPage
            ? null
            : calculatePoints(player.id, team.abr);
          return (
            <div className="view-draft-slot" key={index}>
              <div className="view-draft-slot-left-side">
                <div className="view-draft-slot-logo-container">
                  <img
                    className="view-draft-slot-logo"
                    src={team.logo}
                    alt={`${team.teamName} logo`}
                  />
                </div>
                <p className="view-draft-slot-pos">{index + 1}.</p>
                <p className="view-draft-slot-name">
                  {player.firstName} {player.lastName}
                </p>
              </div>
              {props.isViewingFromContestPage && (
                <p className="view-draft-slot-points">
                  {pts === 0 ? "" : `+${pts}`}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewDraft;
