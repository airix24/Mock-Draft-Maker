import React from "react";
import "../Styles/ContestRules.css";

function NFLFirstRoundRules() {
  return (
    <div className="contest-full-rules">
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
        <li>
          Ex. If you mocked Bryce Young to the Panthers last year, that would've
          been worth three points (one for correctly including him in round one,
          and two for pairing him with the correct team)
        </li>
      </ul>
      <br></br>
      <strong>Rules</strong>
      <ul>
        <li>
          This contest is <strong>FREE</strong> to enter.
        </li>
        <li>
          You are able to edit and resubmit your mock draft up until the contest
          closes.
        </li>
        <li>This contest is for the first round only.</li>
        <li>
          No trades are allowed. (if you think a team will trade up for a
          certain player, just pair him with the team at their current slot)
        </li>
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
          Whoever scores the most points after round 1 will be deemed the
          winner.
        </li>
        <li>If there is a tie, the prize money will be split equally.</li>
        <li>The winner will be contacted by email for payment information.</li>
        <li>
          If there is a trade that affects the first round draft order, entries
          submitted before the trade will still have the old order.
        </li>
        <li>
          The slot the player is drafted in does not matter, what matters is the
          team that drafts the player.
        </li>
        <li>
          Staff members/family are allowed to enter, but are not eligible for
          prizes.
        </li>
        <li>
          Mock Mayhem reserves the right to disqualify any entry for any reason.
        </li>
      </ul>
    </div>
  );
}

export default NFLFirstRoundRules;
