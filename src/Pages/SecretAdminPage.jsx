import { useState, useEffect } from "react";
import "../Styles/SecretAdminPage.css";
import { db } from "../config/firebase-config";
import {
  collection,
  updateDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

function SecretAdminPage() {
  const [teamAbr, setTeamAbr] = useState("ARI");
  const [playerID, setPlayerID] = useState(0);
  const [draftResults, setDraftResults] = useState([]);

  useEffect(() => {
    const getDraftResults = async () => {
      const data = await getDocs(collection(db, "NFLDraftResults2023"));
      return data.docs.map((doc) => doc.data());
    };
    getDraftResults().then((results) => {
      setDraftResults(results[0].results);
    });
  }, []);

  const addDraftPick = async (teamAbr, playerID) => {
    const data = await getDocs(collection(db, "NFLDraftResults2023"));
    const results = data.docs.map((doc) => doc.data())[0].results;
    const newResults = [
      ...results,
      { team: teamAbr, player: parseInt(playerID) },
    ];
    console.log("New Results:", newResults);
    // update the document in the "NFLDraftResults2023" collection with this id: 2tvcZxA0MDo3JTp54dZe
    await updateDoc(doc(db, "NFLDraftResults2023", "2tvcZxA0MDo3JTp54dZe"), {
      results: newResults,
    });
    setDraftResults(newResults);
  };

  function handleDeletePreviousPick() {
    const newResults = [...draftResults];
    newResults.pop();
    updateDoc(doc(db, "NFLDraftResults2023", "2tvcZxA0MDo3JTp54dZe"), {
      results: newResults,
    });
    setDraftResults(newResults);
  }

  return (
    <div className="secret-admin-page">
      <h1>Admin Page</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addDraftPick(teamAbr, playerID);
        }}
      >
        <label>Team</label>
        <select
          name="team"
          value={teamAbr}
          onChange={(e) => setTeamAbr(e.target.value)}
        >
          <option value="ARI">ARI</option>
          <option value="ATL">ATL</option>
          <option value="BAL">BAL</option>
          <option value="BUF">BUF</option>
          <option value="CAR">CAR</option>
          <option value="CHI">CHI</option>
          <option value="CIN">CIN</option>
          <option value="CLE">CLE</option>
          <option value="DAL">DAL</option>
          <option value="DEN">DEN</option>
          <option value="DET">DET</option>
          <option value="GB">GB</option>
          <option value="HOU">HOU</option>
          <option value="IND">IND</option>
          <option value="JAX">JAX</option>
          <option value="KC">KC</option>
          <option value="LAC">LAC</option>
          <option value="LAR">LAR</option>
          <option value="LV">LV</option>
          <option value="MIA">MIA</option>
          <option value="MIN">MIN</option>
          <option value="NE">NE</option>
          <option value="NO">NO</option>
          <option value="NYG">NYG</option>
          <option value="NYJ">NYJ</option>
          <option value="PHI">PHI</option>
          <option value="PIT">PIT</option>
          <option value="SEA">SEA</option>
          <option value="SF">SF</option>
          <option value="TB">TB</option>
          <option value="TEN">TEN</option>
          <option value="WAS">WAS</option>
        </select>
        <label>Player</label>
        <input
          type="number"
          name="player"
          placeholder="Player ID"
          value={playerID}
          onChange={(e) => setPlayerID(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={handleDeletePreviousPick}>Delete Previous Pick</button>
    </div>
  );
}

export default SecretAdminPage;
