import { useState, useEffect } from "react";
import "../Styles/SecretAdminPage.css";
import { db } from "../config/firebase-config";
import {
  collection,
  updateDoc,
  doc,
  getDocs,
} from "firebase/firestore";

function SecretAdminPage() {
  const [teamAbr, setTeamAbr] = useState("ATL");
  const [playerID, setPlayerID] = useState(0);
  const [draftResults, setDraftResults] = useState([]);

  useEffect(() => {
    const getDraftResults = async () => {
      const data = await getDocs(collection(db, "NBADraftResults2023"));
      return data.docs.map((doc) => doc.data());
    };
    getDraftResults().then((results) => {
      setDraftResults(results[0].results);
    });
  }, []);

  const addDraftPick = async (teamAbr, playerID) => {
    const data = await getDocs(collection(db, "NBADraftResults2023"));
    const results = data.docs.map((doc) => doc.data())[0].results;
    const newResults = [
      ...results,
      { team: teamAbr, player: parseInt(playerID) },
    ];
    console.log("New Results:", newResults);
    // update the document in the "NBADraftResults2023" collection with this id: KsYK18meYkTNdv7oyWGL
    await updateDoc(doc(db, "NBADraftResults2023", "KsYK18meYkTNdv7oyWGL"), {
      results: newResults,
    });
    setDraftResults(newResults);
  };

  function handleDeletePreviousPick() {
    const newResults = [...draftResults];
    newResults.pop();
    updateDoc(doc(db, "NBADraftResults2023", "KsYK18meYkTNdv7oyWGL"), {
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
          <option value="ATL">ATL</option> 
          <option value="BOS">BOS</option>
          <option value="BKN">BKN</option>
          <option value="CHA">CHA</option>
          <option value="CHI">CHI</option>
          <option value="CLE">CLE</option>
          <option value="DAL">DAL</option>
          <option value="DEN">DEN</option>
          <option value="DET">DET</option>
          <option value="GSW">GSW</option>
          <option value="HOU">HOU</option>
          <option value="IND">IND</option>
          <option value="LAC">LAC</option>
          <option value="LAL">LAL</option>
          <option value="MEM">MEM</option>
          <option value="MIA">MIA</option>
          <option value="MIL">MIL</option>
          <option value="MIN">MIN</option>
          <option value="NOP">NOP</option>
          <option value="NYK">NYK</option>
          <option value="OKC">OKC</option>
          <option value="ORL">ORL</option>
          <option value="PHI">PHI</option>
          <option value="PHX">PHX</option>
          <option value="POR">POR</option>
          <option value="SAC">SAC</option>
          <option value="SAS">SAS</option>
          <option value="TOR">TOR</option>
          <option value="UTA">UTA</option>
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
