import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/DraftSettingsPage.css";

function DraftSettingsPage() {
  const [prospectClass, setProspectClass] = useState("NFL_2025"); //Hardcoded for now
  const navigate = useNavigate();

  const handleStartDraft = () => {
    const settings = {
      prospectClass,
      league: "NFL", // Hardcoded for now
      mode: "builder",    // Hardcoded for now
      draftLength: 32 // Hardcoded for now
    };

    navigate("/draft-board", { state: settings });
  };

  return (
    <div className="draft-settings">
      <div className="settings-container">
        {/* <div className="setting-group">
          <label htmlFor="prospectClass">Prospect Class:</label>
          <select 
            id="prospectClass" 
            value={prospectClass} 
            onChange={(e) => setProspectClass(e.target.value)}
          >
            <option value="NFL_2025">NFL 2025</option>
            <option value="NFL_2024">NFL 2024</option>
            <option value="NFL_2023">NFL 2023</option>
            <option value="NBA_2023">NBA 2023</option>
          </select>
        </div> */}

        <button className="draft-setting-page-button" onClick={handleStartDraft}>Start Draft</button>
      </div>
    </div>
  );
}

export default DraftSettingsPage;