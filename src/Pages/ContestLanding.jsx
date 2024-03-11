import React, { useState } from "react";
import "../Styles/ContestLanding.css";
import { db } from "../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import Footer from "../Components/Footer";

const ContestLanding = () => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailDocRef = doc(db, "subscribers", email);
    try {
      await setDoc(emailDocRef, { email: email, timestamp: new Date() });
      console.log("Email submitted:", email);
      alert("Thank you for subscribing!");
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error subscribing. Please try again.");
    }
  };
  
  return (
    <>
    <div className="landing-page-card">
      <h1 className="landing-title">Mock Mayhem 2024 Draft Contest</h1>
      <div className="landing-div">
        <strong>
          Think you know the NFL draft? Prove it by entering Mock Mayhem's 2024
          NFL mock draft contest!
        </strong>
        <strong className="how-it-works">How it works:</strong>
        <p>
          Participants will enter a first round round mock draft to compete
          against others. The scoring is simple: 1 point for each player
          correctly placed in the first round, 2 points for each player
          correctly paired with the team that drafts them. The participant with
          the most points wins.
        </p>
      </div>
      <div className="landing-div">
        <strong className="landing-p">
          Sign up to be notified when the contest opens:
        </strong>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            className="landing-email-input"
          />
          <button type="submit" className="landing-submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ContestLanding;
