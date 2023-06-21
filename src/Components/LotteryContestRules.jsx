import React from "react";

function LotteryContestRules() {
  return (
    <div className="more-info-div">
      <ul className="more-info-list">
        <li className="more-info-li">
          <span className="bold">Scoring</span>:
        </li>
        <ul className="more-info-sub-list">
          <li className="more-info-li">
            1 point awarded for each player correctly included in the lottery (first 14 picks)
          </li>
          <li className="more-info-li">
            2 points awarded for each correct player/team match
          </li>
        </ul>
        <li className="more-info-li">
          This contest is for the lottery only.
        </li>
        <li className="more-info-li">No trades are allowed.</li>
        <li className="more-info-li">
          One entry allowed per person. (users who use multiple accounts to
          enter will be disqualified)
        </li>
        <li className="more-info-li">The contest is free to enter.</li>
        <li className="more-info-li">
          Contest closes on 6/22/23 at 6 PM CT. (One hour before the draft).
          After this you will no longer be able to enter or edit your mock
          draft.
        </li>
        <li className="more-info-li">
          Whoever scores the most points after the first 14 picks will be deemed the
          winner.
        </li>
        {/* <li className="more-info-li">
          Winner will receive $100. If there is a tie, the prize money will be
          split equally.
        </li> */}
        {/* <li className="more-info-li">
          The winner will be contacted by email for payment information.
        </li> */}
        <li className="more-info-li">
          If there is a trade that affects the first round draft order, entries
          submitted before the trade will still have the old order.
        </li>
      </ul>
    </div>
  );
}

export default LotteryContestRules;
