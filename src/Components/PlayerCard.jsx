import React from "react";
import { useState } from "react";
import "../Styles/PlayerCard.css";
import {
  FaChevronUp,
  FaChevronDown,
  FaPlus,
  FaRegStar,
  FaStar,
} from "react-icons/fa";

function PlayerCard(props) {
  const [expanded, setExpanded] = useState(props.hoveredCard ? true : false);

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
              {!props.hoveredCard && <h3>{props.rank}.</h3>}
              <div>
                <div className="name-star">
                  {props.hoveredCard ? null : props.starred ? (
                    <button
                      className="icon-button-black"
                      // on click, set starred to false
                      onClick={(e) => {
                        props.setPlayerPool(
                          props.playerPool.map((player) => {
                            if (player.id === props.id) {
                              player.starred = false;
                            }
                            return player;
                          })
                        );
                        e.stopPropagation();
                      }}
                    >
                      <FaStar
                        size={18}
                        // size={props.screenSize === "mobile" ? 24 : 18}
                        color={"#DBCE1E"}
                        alt="starred"
                      />
                    </button>
                  ) : (
                    <button
                      className="icon-button-black"
                      onClick={(e) => {
                        props.setPlayerPool(
                          props.playerPool.map((player) => {
                            if (player.id === props.id) {
                              player.starred = true;
                            }
                            return player;
                          })
                        );
                        e.stopPropagation();
                      }}
                    >
                      <FaRegStar size={18} alt="not starred" />
                    </button>
                  )}
                  <h2>
                    {props.firstName} {props.lastName}
                  </h2>
                </div>
                <h3 className="light">
                  {props.position}
                  {props.archetype != "" ? ` - ${props.archetype}` : ""}
                </h3>
              </div>
            </div>
          ) : (
            <div className="unexp-player-name">
              <h4>{props.rank}.</h4>
              <div className="star-player-stuff">
                {props.starred ? (
                  <button
                    className="icon-button-black"
                    onClick={(e) => {
                      props.setPlayerPool(
                        props.playerPool.map((player) => {
                          if (player.id === props.id) {
                            player.starred = false;
                          }
                          return player;
                        })
                      );
                      e.stopPropagation();
                    }}
                  >
                    <FaStar size={18} color={"#DBCE1E"} alt="starred" />
                  </button>
                ) : (
                  <button
                    className="icon-button-black"
                    onClick={(e) => {
                      props.setPlayerPool(
                        props.playerPool.map((player) => {
                          if (player.id === props.id) {
                            player.starred = true;
                          }
                          return player;
                        })
                      );
                      e.stopPropagation();
                    }}
                  >
                    <FaRegStar size={18} alt="not starred" />
                  </button>
                )}
                <div className="name-position">
                  <h4>
                    {props.firstName} {props.lastName}
                  </h4>
                  <h5 className="light">{props.position}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
        {props.hoveredCard ? null : (
          <div
            className={`player-card-btns ${
              props.mode === "gm" && props.isUserPick()
                ? "player-card-btns-gm"
                : ""
            }`}
          >
            {expanded ? (
              <button
                className="icon-button-black"
                onClick={(e) => {
                  setExpanded(false);
                  e.stopPropagation();
                }}
              >
                <FaChevronUp className="icon" size={18} alt="collapse" />
              </button>
            ) : (
              <button
                className="icon-button-black"
                onClick={(e) => {
                  setExpanded(true);
                  e.stopPropagation();
                }}
              >
                <FaChevronDown className="icon" size={18} alt="expand" />
              </button>
            )}
            {props.mode !== "gm" && !props.isDraftFinished() ? (
              <button
                className="icon-button-black"
                onClick={(e) => {
                  props.addPlayer(props.id);
                  setExpanded(false);
                  e.stopPropagation();
                }}
              >
                <FaPlus
                  className={
                    props.isSimulating
                      ? "disabled icon plus-icon"
                      : "icon plus-icon"
                  }
                  size={18}
                  alt="add player"
                />
              </button>
            ) : props.isUserPick() ? (
              <button
                className={"draft-btn"}
                onClick={(e) => {
                  props.addPlayer(props.id);
                  setExpanded(false);
                  e.stopPropagation();
                }}
              >
                Draft
              </button>
            ) : null}
          </div>
        )}
      </div>
      {expanded ? (
        <div className="expanded">
          <div className="img-container">
            <img
              className="player-img"
              src={props.img}
              alt="player image"
            ></img>
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
