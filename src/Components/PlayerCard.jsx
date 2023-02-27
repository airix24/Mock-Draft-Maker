import React from "react";
import { FaPlus } from "react-icons/fa";

function PlayerCard(props) {
  function convertHeight(height) {
    return `${Math.floor(height / 12)}'${height % 12}"`;
  }

  return (
    <div className="playerCard card">
      <div className="playerInfo">
        <div className="img-container">
          <img className="playerImg" src={props.img}></img>
        </div>
        <div className="playerText">
          <h2>
            {props.firstName} {props.lastName}
          </h2>
          <h3>{props.position}</h3>
          <h4>{props.school}</h4>
          <h4>
            {convertHeight(props.height)} {props.weight} lbs
          </h4>
        </div>
      </div>
      <FaPlus
        className="plus-icon"
        size={20}
        onClick={() => props.addPlayer(props.id)}
      />
    </div>
  );
}

export default PlayerCard;
