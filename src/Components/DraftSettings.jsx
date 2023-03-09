import React from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/DraftSettings.css";

function DraftSettings(props) {
  const [form, setForm] = React.useState({
    team: 12,
    rounds: 1,
    speed: 2000,
    randomness: 2,
  });

  return (
    <div
      className="outer-modal"
      onClick={() => props.setShowDraftSettings(false)}
    >
      <div className="inner-modal" onClick={(e) => e.stopPropagation()}>
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
              <option value="1">Arizona Cardinals</option>
              <option value="2">Atlanta Falcons</option>
              <option value="3">Baltimore Ravens</option>
              <option value="4">Buffalo Bills</option>
              <option value="5">Carolina Panthers</option>
              <option value="6">Chicago Bears</option>
              <option value="7">Cincinnati Bengals</option>
              <option value="8">Cleveland Browns</option>
              <option value="9">Dallas Cowboys</option>
              <option value="10">Denver Broncos</option>
              <option value="11">Detroit Lions</option>
              <option value="12">Green Bay Packers</option>
              <option value="13">Houston Texans</option>
              <option value="14">Indianapolis Colts</option>
              <option value="15">Jacksonville Jaguars</option>
              <option value="16">Kansas City Chiefs</option>
              <option value="17">Los Angeles Chargers</option>
              <option value="18">Los Angeles Rams</option>
              <option value="19">Miami Dolphins</option>
              <option value="20">Minnesota Vikings</option>
              <option value="21">New England Patriots</option>
              <option value="22">New Orleans Saints</option>
              <option value="23">New York Giants</option>
              <option value="24">New York Jets</option>
              <option value="25">Oakland Raiders</option>
              <option value="26">Philadelphia Eagles</option>
              <option value="27">Pittsburgh Steelers</option>
              <option value="28">San Francisco 49ers</option>
              <option value="29">Seattle Seahawks</option>
              <option value="30">Tampa Bay Buccaneers</option>
              <option value="31">Tennessee Titans</option>
              <option value="32">Washington Commanders</option>
            </select>
            <h3>Number of Rounds</h3>
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
            </select>
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
              <option value="1000">Fast</option>
              <option value="2000">Normal</option>
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
              <option value="1">A Bit</option>
              <option value="2">Normal</option>
              <option value="3">Crazy</option>
            </select>
            <Link
              to="/draft-board"
              state={ form }            >
              <button className="settings-btn">Enter Draft</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DraftSettings;
