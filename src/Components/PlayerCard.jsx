import React, { useState } from "react";
import "../Styles/PlayerCard.css";
import { college_teams } from "../Teams/college_teams";
import {
  FaChevronUp,
  FaChevronDown,
  FaPlus,
  FaRegStar,
  FaStar,
} from "react-icons/fa";

function PlayerCard(props) {
  const [isRASHovered, setIsRASHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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


  function getSchoolLogo(school) {
    for (let i = 0; i < college_teams.length; i++) {
      if (college_teams[i].schoolName === school) {
        return college_teams[i].schoolLogo;
      }
    }
  }

  return (
    <div
      className="card player-card"
      // onClick={() => setExpanded((prev) => !prev)}
      onClick={(e) => {
        props.setPlayerPool(
          props.playerPool.map((player) => {
            if (player.id === props.id) {
              player.expanded = !player.expanded;
              isRASHovered && setIsRASHovered(false);
            }
            return player;
          })
        );
        e.stopPropagation();
      }}
    >
      {isRASHovered ? (
        <div
          className="card"
          style={{
            position: "absolute",
            top: mousePosition.y - 70,
            left: mousePosition.x + 10,
            boxShadow: "0 0 5px gray",
            zIndex: 100,
          }}
        >
          <h5>Relative Athletic Score</h5>
        </div>
      ) : null}
      <div className="unexpanded">
        <div className="unexpanded-player-info">
          {props.expanded || props.hoveredCard ? (
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
                <h3
                  className={`light ${
                    props.hoveredCard ? "hovered-card-indent" : ""
                  }`}
                >
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
            {props.expanded || props.hoveredCard ? (
              <button
                className="icon-button-black"
                // onClick={(e) => {
                //   setExpanded(false);
                //   e.stopPropagation();
                // }}
                onClick={(e) => {
                  props.setPlayerPool(
                    props.playerPool.map((player) => {
                      if (player.id === props.id) {
                        player.expanded = !player.expanded;
                      }
                      return player;
                    })
                  );
                  e.stopPropagation();
                }}
              >
                <FaChevronUp className="icon" size={18} alt="collapse" />
              </button>
            ) : (
              <button
                className="icon-button-black"
                // onClick={(e) => {
                //   setExpanded(true);
                //   e.stopPropagation();
                // }}
                onClick={(e) => {
                  props.setPlayerPool(
                    props.playerPool.map((player) => {
                      if (player.id === props.id) {
                        player.expanded = !player.expanded;
                      }
                      return player;
                    })
                  );
                  e.stopPropagation();
                }}
              >
                <FaChevronDown className="icon" size={18} alt="expand" />
              </button>
            )}
            {props.mode !== "gm" && !props.isDraftFinished() ? (
              <button
                disabled={props.isSimulating}
                className={`icon-button-black ${
                  props.isSimulating ? "disabled" : ""
                }`}
                // onClick={(e) => {
                //   props.addPlayer(props.id);
                //   setExpanded(false);
                //   e.stopPropagation();
                // }}
                onClick={(e) => {
                  props.addPlayer(props.id);
                  props.setPlayerPool(
                    props.playerPool.map((player) => {
                      if (player.id === props.id) {
                        player.expanded = false;
                      }
                      return player;
                    })
                  );
                  e.stopPropagation();
                }}
              >
                <FaPlus className="icon plus-icon" size={18} alt="add player" />
              </button>
            ) : props.isUserPick() ? (
              <button
                className={"draft-btn"}
                // onClick={(e) => {
                //   props.addPlayer(props.id);
                //   setExpanded(false);
                //   e.stopPropagation();
                // }}
                onClick={(e) => {
                  props.addPlayer(props.id);
                  props.setPlayerPool(
                    props.playerPool.map((player) => {
                      if (player.id === props.id) {
                        player.expanded = false;
                      }
                      return player;
                    })
                  );
                  e.stopPropagation();
                }}
              >
                Draft
              </button>
            ) : null}
          </div>
        )}
      </div>
      {props.expanded || props.hoveredCard ? (
        <div className="expanded">
          <div className="img-container">
            <img
              className="player-img"
              src={getSchoolLogo(props.school)}
              alt="player image"
            ></img>
          </div>

          <div className="exp-player-info">
            <div className="school-class-container">
              <div className="player-info-div">
                <h4 className="light">school</h4>
                <h4>{props.school}</h4>
              </div>
              {props.class !== "" ? (
                <div className="class-year player-info-div">
                  <h4 className="light">class</h4>
                  <h4>{props.class}</h4>
                </div>
              ) : null}
            </div>
            <div className="height-weight-ras-container">
              <div className="player-info-div">
                <h4 className="light">height</h4>
                <h4>{convertHeight(props.height)}</h4>
              </div>
              <div className="player-info-div">
                <h4 className="light">weight</h4>
                <h4>{props.weight} lbs</h4>
              </div>
              {/* {props.league === "NFL" ? (
                <div>
                  <h4
                    className="light"
                    onMouseEnter={() => setIsRASHovered(true)}
                    onMouseLeave={() => setIsRASHovered(false)}
                    onMouseMove={(e) =>
                      setMousePosition({ x: e.clientX, y: e.clientY })
                    }
                  >
                    RAS
                  </h4>
                  <h4>{props.ras ? props.ras : "---"}</h4>
                </div>
              ) : (
                <h4>
                  <span className="light">wingspan: </span>
                  {props.wingspan ? convertHeight(props.wingspan) : "---"}
                </h4>
              )} */}
            </div>
            {/* <div className="player-skills">
              <h4>Strengths:</h4>
              {strengthElements}
              <h4>Weaknesses:</h4>
              {weaknessElements}
            </div> */}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PlayerCard;
