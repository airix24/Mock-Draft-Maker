import React from "react";

function ContestRules() {
  return (
    <div className="more-info-div">
      <ul className="more-info-list">
        <li className="more-info-li">
          <span className="bold">Scoring</span>:
        </li>
        <ul className="more-info-sub-list">
          <li className="more-info-li">
            1 point awarded for each player correctly included in the first
            round
          </li>
          <li className="more-info-li">
            2 points awarded for each correct player/team match
          </li>
          {/* <span className="bold">Scoring</span>: 1 point awarded for each player
          correctly included in the first round, 2 points for every correct
          player/team pair. (E.G. if you correctly mock Bryce Young to the
          Panthers, you will receive 3 points in total, 1 for having Young in
          the first round, and 2 for having him go to the Panthers) */}
        </ul>

        <li className="more-info-li">
          This contest is for the first round only.
        </li>
        <li className="more-info-li">No trades are allowed.</li>
        <li className="more-info-li">
          One entry allowed per person. (users who use multiple accounts to
          enter will be disqualified)
        </li>
        <li className="more-info-li">The contest is free to enter.</li>
        <li className="more-info-li">
          Contest closes on 4/27/23 at 6 PM CT. (One hour before the draft).
          After this you will no longer be able to enter or edit your mock
          draft.
        </li>
        <li className="more-info-li">
          Whoever scores the most points after round 1 will be deemed the
          winner.
        </li>
        <li className="more-info-li">
          Winner will receive $100. If there is a tie, the prize money will be
          split equally.
        </li>
        <li className="more-info-li">
          The winner will be contacted by email for payment information.
        </li>
        <li className="more-info-li">
          If there is a trade that affects the first round draft order, entries submitted before the trade will still have the old order.
        </li>
      </ul>
    </div>
  );
}

export default ContestRules;
