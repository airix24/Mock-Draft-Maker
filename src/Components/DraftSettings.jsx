import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/DraftSettings.css";

function DraftSettings(props) {
  const [form, setForm] = useState({
    team: "GB",
    rounds: 1,
    speed: 1000,
    randomness: 3,
  });

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowDraftSettings(false)}
    >
      <div className="inner-modal inner-modal-settings" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowDraftSettings(false)}
          />
        </div>
        <div className="modal-content">
          <form className="settings-form">
            <h3>Select Team</h3>
            <select
              value={form.team}
              onChange={(e) =>
                setForm({
                  ...form,
                  team: e.target.value,
                })
              }
            >
              <option value="ARI">Arizona Cardinals</option>
              <option value="ATL">Atlanta Falcons</option>
              <option value="BAL">Baltimore Ravens</option>
              <option value="BUF">Buffalo Bills</option>
              <option value="CAR">Carolina Panthers</option>
              <option value="CHI">Chicago Bears</option>
              <option value="CIN">Cincinnati Bengals</option>
              <option value="CLE">Cleveland Browns</option>
              <option value="DAL">Dallas Cowboys</option>
              <option value="DEN">Denver Broncos</option>
              <option value="DET">Detroit Lions</option>
              <option value="GB">Green Bay Packers</option>
              <option value="HOU">Houston Texans</option>
              <option value="IND">Indianapolis Colts</option>
              <option value="JAX">Jacksonville Jaguars</option>
              <option value="KC">Kansas City Chiefs</option>
              <option value="LAC">Los Angeles Chargers</option>
              <option value="LAR">Los Angeles Rams</option>
              <option value="MIA">Miami Dolphins</option>
              <option value="MIN">Minnesota Vikings</option>
              <option value="NE">New England Patriots</option>
              <option value="NO">New Orleans Saints</option>
              <option value="NYG">New York Giants</option>
              <option value="NYJ">New York Jets</option>
              <option value="LV">Las Vegas Raiders</option>
              <option value="PHI">Philadelphia Eagles</option>
              <option value="PIT">Pittsburgh Steelers</option>
              <option value="SF">San Francisco 49ers</option>
              <option value="SEA">Seattle Seahawks</option>
              <option value="TB">Tampa Bay Buccaneers</option>
              <option value="TEN">Tennessee Titans</option>
              <option value="WAS">Washington Commanders</option>
            </select>
            {/* <h3>Number of Rounds</h3>
            <select
              value={form.rounds}
              onChange={(e) =>
                setForm({
                  ...form,
                  rounds: e.target.value,
                })
              }
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select> */}
            <h3>Speed</h3>
            <select
              value={form.speed}
              onChange={(e) =>
                setForm({
                  ...form,
                  speed: e.target.value,
                })
              }
            >
              <option value="200">Fast</option>
              <option value="1000">Normal</option>
              <option value="3000">Slow</option>
            </select>
            <h3>Randomness</h3>
            <select
              value={form.randomness}
              onChange={(e) =>
                setForm({
                  ...form,
                  randomness: e.target.value,
                })
              }
            >
              <option value="2">A Bit</option>
              <option value="3">Normal</option>
              <option value="10">Crazy</option>
            </select>
            <Link to="/draft-board" state={form}>
              <button className="settings-btn">Enter Draft</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DraftSettings;
