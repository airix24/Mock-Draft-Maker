import React from "react";
import "../Styles/PlayerCard.css";
import { FaChevronUp, FaChevronDown, FaPlus } from "react-icons/fa";

function PlayerCard(props) {
  const [expanded, setExpanded] = React.useState(
    props.hoveredCard ? true : false
  );

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
    <div
      className="card player-card"
      onClick={() => setExpanded((prev) => !prev)}
    >
      <div className="unexpanded">
        <div className="unexpanded-player-info">
          {expanded ? (
            <div className="exp-player-name">
              <h3>{props.rank}.</h3>
              <div>
                <h2>
                  {props.firstName} {props.lastName}
                </h2>
                <h3 className="light">
                  {props.position}
                  {props.archetype != "" ? ` - ${props.archetype}` : ""}
                </h3>
              </div>
            </div>
          ) : (
            <div className="unexp-player-name">
              <h3>{props.rank}.</h3>
              <div>
                <h3>
                  {props.firstName} {props.lastName}
                </h3>
                <h4 className="light">{props.position}</h4>
              </div>
            </div>
          )}
        </div>
        {props.hoveredCard ? null : (
          <div className="player-card-btns">
            {expanded ? (
              <FaChevronUp
                className="icon"
                size={15}
                onClick={(e) => {
                  setExpanded(false);
                  e.stopPropagation();
                }}
              />
            ) : (
              <FaChevronDown
                className="icon"
                size={15}
                onClick={(e) => {
                  setExpanded(true);
                  e.stopPropagation();
                }}
              />
            )}
            {props.mode === "builder" || props.isUserPick() ? (
              <FaPlus
                className={
                  props.isSimulating
                    ? "disabled icon plus-icon"
                    : "icon plus-icon"
                }
                size={15}
                onClick={(e) => {
                  props.addPlayer(props.id);
                  setExpanded(false);
                  e.stopPropagation();
                }}
              />
            ) : null}
          </div>
        )}
      </div>
      {expanded ? (
        <div className="expanded">
          <div className="img-container">
            <img className="player-img" src={props.img}></img>
          </div>
          <div className="exp-player-info">
            <div>
              <h4>
                <span className="light">school: </span>
                {props.school}
              </h4>
              <h4 className="class-year">
                <span className="light">class: </span>
                {props.class}
              </h4>
              <h4>
                <span className="light">height: </span>
                {convertHeight(props.height)}
              </h4>
              <h4>
                <span className="light">weight: </span>
                {props.weight} lbs
              </h4>
              <h4>
                <span className="light">RAS: </span>
                {props.ras ? props.ras : "---"}
              </h4>
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
