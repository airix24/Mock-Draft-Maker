import { useState, useEffect } from "react";
import "../Styles/SecretAdminPage.css";
import { db } from "../config/firebase-config";
import { collection, updateDoc, doc, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

function SecretAdminPage(props) {
  const [contestID, setContestID] = useState("");
  const [teamAbr, setTeamAbr] = useState("");
  const [playerID, setPlayerID] = useState("");
  const [league, setLeague] = useState("NFL");
  const [prospectClass, setProspectClass] = useState("NFL_2024");
  const [teams, setTeams] = useState([]);
  const [prospects, setProspects] = useState([]);
  const [contests, setContests] = useState([]);

  // dynamically import teams and prospects based on league and prospect class
  useEffect(() => {
    import(`../Teams/${league}_Teams`).then((module) => {
      setTeams(module[league + "_Teams"]);
    });

    import(`../Prospects/${prospectClass}`).then((module) => {
      setProspects(module[prospectClass + "_Prospects"]);
    });
  }, [league, prospectClass]);

  // get all contests. Is this necessary?
  useEffect(() => {
    const getContests = async () => {
      const data = await getDocs(collection(db, "contests"));
      return data.docs.map((doc) => doc.data());
    };
    getContests().then((data) => {
      setContests(data);
    });
  }, []);

  // update the results document of the contest with the new draft pick
  const addDraftPick = async (contestID, teamAbr, playerID) => {
    const data = await getDocs(collection(db, "contests"));
    const contest = data.docs
      .map((doc) => doc.data())
      .find((contest) => contest.id === contestID);
    const results = contest.results;
    const newResults = [
      ...results,
      { team: teamAbr, player: parseInt(playerID) },
    ];
    // update the document in the "contests" collection with the id of the contest
    await updateDoc(doc(db, "contests", contestID), {
      results: newResults,
    });
  };

  const updateEntryScores = async (contestID, teamAbr, playerID) => {
    const entries = await getDocs(
      collection(db, "contests", contestID, "entries")
    );
    for (const entry of entries.docs) {
      const entryData = entry.data();
      const draft = entryData.draft;
      let points = 0;
      for (const slot of draft) {
        if (slot.pick === parseInt(playerID)) {
          points += 1;
          if (slot.team === teamAbr) {
            points += 2;
          }
        }
      }
      // increment the score of the entry
      await updateDoc(
        doc(db, "contests", contestID, "entries", entryData.userUid),
        {
          score: entryData.score + points,
        }
      );
    }
    console.log("Scores updated");
  };

  // set scores for all entries to 0
  const resetScores = async (contestID) => {
    const entries = await getDocs(
      collection(db, "contests", contestID, "entries")
    );
    for (const entry of entries.docs) {
      await updateDoc(
        doc(db, "contests", contestID, "entries", entry.data().userUid),
        {
          score: 0,
        }
      );
    }
    console.log("Scores reset");
  };

  return (
    <div className="secret-admin-page">
      <h1>Admin Page</h1>
      <h3>league: {league}</h3>
      <h3>prospect class: {prospectClass}</h3>
      <h3>team: {teamAbr}</h3>
      <h3>player: {playerID}</h3>
      <h3>contest: {contestID}</h3>

      {props.user && props.user.uid === "f0HuOsXS7XTsJtsXvh197eqBGgw2" ? (
        <div className="admin-main">
          <div className="admin-section">
            <h2>Set League and Prospects</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <label>League</label>
              <select
                value={league}
                onChange={(e) => setLeague(e.target.value)}
              >
                <option value="NFL">NFL</option>
                <option value="NBA">NBA</option>
              </select>
              <label>Prospect Class</label>
              <select
                value={prospectClass}
                onChange={(e) => setProspectClass(e.target.value)}
              >
                <option value="NFL_2024">NFL 2024</option>
                <option value="NBA_2023">NBA 2023</option>
              </select>
            </form>
          </div>

          <div className="admin-section admin-section-submit-pick">
            <h2>Submit Pick</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addDraftPick(contestID, teamAbr, playerID);
                console.log("Pick submitted");
                console.log(contestID, teamAbr, playerID);
                updateEntryScores(contestID, teamAbr, playerID);
              }}
            >
              <label>Contest</label>
              <select
                name="contest"
                value={contestID}
                onChange={(e) => setContestID(e.target.value)}
              >
                <option disabled value="">
                  Select
                </option>
                {contests &&
                  contests.map((contest) => (
                    <option key={contest.id} value={contest.id}>
                      {contest.name}
                    </option>
                  ))}
              </select>
              <label>Team</label>
              <select
                name="team"
                value={teamAbr}
                onChange={(e) => setTeamAbr(e.target.value)}
              >
                <option disabled value="">
                  Select
                </option>
                {teams &&
                  teams.map((team) => (
                    <option key={team.abr} value={team.abr}>
                      {team.abr}
                    </option>
                  ))}
              </select>
              <label>Player</label>
              <select
                name="player"
                value={playerID}
                onChange={(e) => setPlayerID(e.target.value)}
              >
                <option disabled value="">
                  Select
                </option>
                {prospects &&
                  prospects.map((prospect) => (
                    <option key={prospect.id} value={prospect.id}>
                      {prospect.firstName + " " + prospect.lastName}
                    </option>
                  ))}
              </select>
              <button type="submit" className="med-blue-btn">
                Submit
              </button>
            </form>
          </div>
          <div className="admin-section">
            <Link to="/manual-enter">Manual Enter Page</Link>
          </div>
          <div className="admin-section reset-section">
            <h2>Reset Entry Scores</h2>
            <h4>{contestID ? contestID : "select contest first"}</h4>
            <button
              onClick={() => {
                resetScores(contestID);
              }}
              style={{ backgroundColor: "red", color: "white" }}
            >
              Reset Scores
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h1>Unauthorized</h1>
          <p>Sorry, you are not authorized to view this page</p>
        </div>
      )}
    </div>
  );
}

export default SecretAdminPage;
