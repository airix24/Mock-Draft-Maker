import React from "react";
import { FaDiscord } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="social-links">
        {/* <a
          href="https://discord.gg/qcebSQyGg5"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
        >
          <FaDiscord />
        </a> */}
        <a
          href="https://twitter.com/mock_mayhem"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-social-link"
        >
          <FaXTwitter />
        </a>
      </div>
      <div className="legal-stuff">
        <p>&copy; 2024 Mock Mayhem. All rights reserved.</p>
      </div>
      <div className="footer-links">
        <Link to="/priv" className="footer-link priv-link">
          Privacy Policy
        </Link>
        <Link to="/contact" className="footer-link">
          Contact Us
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
