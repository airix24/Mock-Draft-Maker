import React from "react";

function NFLFirstRoundInfo() {
  return (
    <div className="contest-info">
      <br></br>
      <strong>Prizes</strong>
      <ul>
        <li>1st Place: $100</li>
        <li>2nd Place: $50</li>
        <li>3rd Place: $25</li>
      </ul>
      <br></br>
      <strong>Scoring</strong>
      <ul>
        <li>+1 point for each player correctly included in the first round</li>
        <li>+2 points for each correct player/team match</li>
      </ul>
      <br></br>
      <strong>Notes</strong>
      <ul>
        <li>
          This contest is <strong>FREE</strong> to enter.
        </li>
        <li>
          You are able to edit and resubmit your mock draft up until the contest
          closes.
        </li>
        <li>This contest is for the first round only.</li>
        <li>No trades are allowed.</li>
        <li>
          One entry allowed per person. (users who use multiple accounts to
          enter will be disqualified)
        </li>

        <li>
          Contest closes on April 25th, 2024 at 7 PM ET. (One hour before the
          draft starts). After this, users will no longer be able to enter or
          edit their mock drafts.
        </li>
        <li>
          Make sure to check back during the draft to track the results live!
        </li>
      </ul>
    </div>
  );
}

export default NFLFirstRoundInfo;
