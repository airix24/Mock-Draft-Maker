import { useState } from "react";
import ContestCard from "../Components/ContestCard";
import ContestInfo from "../Components/ContestInfo";
import "../Styles/ContestPage.css";
import hockeyLogo from "../Assets/hockey.svg";
import basketballLogo from "../Assets/basketball.svg";
import baseballLogo from "../Assets/baseball.svg";
import { Link } from "react-router-dom";

function ContestPage() {
  const [showContestInfo, setShowContestInfo] = useState(false);
  const [contestInfo, setContestInfo] = useState({}); // {name, info}

  return (
    <div className="contest-page-container">
      {showContestInfo && (
        <ContestInfo
          setShowContestInfo={setShowContestInfo}
          contestInfo={contestInfo}
        />
      )}
      <div className="contest-card-container">
        <ContestCard
          name="2023 NBA Draft"
          closeTime={new Date("June 22, 2023 23:00:00")}
          image={basketballLogo}
          currentEntrants="0"
          prize={0}
          fee={0}
          setShowContestInfo={setShowContestInfo}
          setContestInfo={setContestInfo}
        />
        <ContestCard
          name="2023 NHL Draft"
          closeTime={new Date("June 28, 2023 23:00:00")}
          image={hockeyLogo}
          currentEntrants="0"
          prize={0}
          fee={0}
          setShowContestInfo={setShowContestInfo}
          setContestInfo={setContestInfo}
        />
        <ContestCard
          name="2023 MLB Draft"
          closeTime={new Date("July 11, 2023 23:00:00")}
          image={baseballLogo}
          currentEntrants="0"
          prize={0}
          fee={0}
          setShowContestInfo={setShowContestInfo}
          setContestInfo={setContestInfo}
        />
      </div>
      <Link to="/past-contests">
        <button className="view-past-contests-btn">View Past Contests</button>
      </Link>
    </div>
  );
}

export default ContestPage;
