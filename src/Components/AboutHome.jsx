import { useState } from "react";
import { db } from "../config/firebase-config";
import { doc, setDoc } from "firebase/firestore";
import "../Styles/AboutHome.css";

function AboutHome() {
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
    <div className="about-home">
      <h2 className="about-title">What is Mock Mayhem?</h2>
      <p className="about-text">
        Mock Mayhem is a platform where users can create mock drafts and enter
        them into contests to compete against others and win prizes.
      </p>
      <strong className="about-text">Enter your email to receive updates on contests and more!</strong>
      <form onSubmit={handleSubmit} className="about-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          className="about-email-input"
        />
        <button type="submit" className="about-submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AboutHome;
