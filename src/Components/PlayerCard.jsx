import React from "react";
import "../Styles/PlayerCard.css";
import { FaChevronUp, FaChevronDown, FaPlus } from "react-icons/fa";

function PlayerCard(props) {
  const [expanded, setExpanded] = React.useState(false);

  function convertHeight(height) {
    return `${Math.floor(height / 12)}'${height % 12}"`;
  }

  const strengthElements = props.strengths
    ? props.strengths.map((strength, index) => {
        return <h5 key={index}>{strength}</h5>;
      })
    : [];

  const weaknessElements = props.weaknesses
    ? props.weaknesses.map((weakness, index) => {
        return <h5 key={index}>{weakness}</h5>;
      })
    : [];

  return (
    <div className="card">
      <div className="unexpanded">
        <div className="unexpanded-player-info">
          {expanded ? (
            <div className="exp-player-name">
              <h2>
                {props.firstName} {props.lastName}
              </h2>
              <h3 className="light">{props.position} - {props.archetype}</h3>
            </div>
          ) : (
            <>
              <h3>
                {props.firstName} {props.lastName}
              </h3>
              <h4 className="light">{props.position}</h4>
            </>
          )}
        </div>
        <div className="player-card-btns">
          {expanded ? (
            <FaChevronUp
              className="icon"
              size={15}
              onClick={() => setExpanded(false)}
            />
          ) : (
            <FaChevronDown
              className="icon"
              size={15}
              onClick={() => setExpanded(true)}
            />
          )}
          <FaPlus
            className={props.isSimulating ? "disabled icon plus-icon" : "icon plus-icon"}
            size={15}
            onClick={() => {
              props.addPlayer(props.id);
              setExpanded(false);
            }}
          />
        </div>
      </div>
      {expanded ? (
        <div className="expanded">
          <div className="img-container">
            <img className="player-img" src={props.img}></img>
          </div>
          <div className="exp-player-info">
            <div>
              <h4><span className="light">school: </span>{props.school}</h4>
              <h4><span className="light">age: </span>{props.age ? props.age : "---"}</h4>
              <h4><span className="light">height: </span>{convertHeight(props.height)}</h4>
              <h4><span className="light">weight: </span>{props.weight} lbs</h4>
            </div>
            <div className="player-skills">
              <h4>Strengths:</h4>
              {strengthElements}
              <h4>Weaknesses:</h4>
              {weaknessElements}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PlayerCard;
