import React from "react";
import "../Styles/ContestCard.css";

function ContestCard({ name, closeTime, image, prize, fee, user, openModal, isUserEntered }) {
  return (
    <div className="contest-card card">
      <div className="contest-card-top">
        <h3 className="contest-card-name">{name}</h3>
        <h4 className="contest-card-close-date">
          {closeTime.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </h4>
      </div>
      <div className="contest-card-image-container">
        <img className="contest-card-image" src={image} alt="contest" />
      </div>
      <div className="contest-card-info-bar">
        <h4 className="contest-card-fee">Entry: ${fee}</h4>
        <h4 className="contest-card-prize">Prizes: ${prize}</h4>
      </div>

      <button
        className="contest-card-info-btn"
        onClick={() => {
          openModal("contestInfo");
        }}
      >
        More Info
      </button>
      {user ? (
        !isUserEntered ? (
          <button
            className="contest-card-enter-btn"
            onClick={() => {
              openModal("enterContest");
            }}
          >
            Enter
          </button>
        ) : (
          <button
            className="contest-card-enter-btn"
            onClick={() => {
              openModal("viewDraft");
            }}
          >
            View your Entry
          </button>
        )
      ) : (
        <button
          className="contest-card-enter-btn"
          onClick={() => {
            openModal("auth");
          }}
        >
          Sign In to Enter
        </button>
      )}
    </div>
  );
}

export default ContestCard;
