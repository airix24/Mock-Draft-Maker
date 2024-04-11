import React from "react";
import Footer from "../Components/Footer";
import "../Styles/ContactUs.css";

function ContactUs() {
  return (
    <div className="contact-us-page">
      <div className="contact-us-container">
        <h1>Contact Us</h1>
        <p>
          If you have any questions or concerns, please feel free to reach out
          to us at{" "}
          <a href="mailto:mockmayhem1@gmail.com">mockmayhem1@gmail.com</a>
        </p>
        <p>
          You can also shoot us a DM on X{" "}
          <a
            href="https://twitter.com/mock_mayhem"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mock_mayhem
          </a>
        </p>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
