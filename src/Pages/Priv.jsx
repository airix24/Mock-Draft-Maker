import React from "react";
import Footer from "../Components/Footer";
import "../Styles/PrivacyPolicy.css";

function Priv() {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy for Mock Mayhem</h1>

        <h2>Information We Collect</h2>
        <p>
          We collect your name and email address when you sign up. We collect
          your email address when you subscribe for updates.
        </p>

        <h2>How We Collect Information</h2>
        <p>
          We collect your information when you sign up using your Gmail account
          or enter your email in our mailing list section.
        </p>

        <h2>Purpose of Collection</h2>
        <p>
          We collect your information for user authentication and mailing list
          subscriptions.
        </p>

        <h2>Storage and Protection</h2>
        <p>
          Your information is securely stored in our database, and we take
          measures to protect it.
        </p>

        <h2>Sharing Information</h2>
        <p>We do not share your information with third parties.</p>

        <h2>Access and Updates</h2>
        <p>
          You can access or update your information by contacting us via email
          at MockMayhem1@gmail.com
        </p>

        <h2>Data Retention</h2>
        <p>
          We retain your information as long as necessary for our purposes or as
          required by law.
        </p>

        <h2>Children's Information</h2>
        <p>
          Our website is not intended for anyone under 18, and we do not
          knowingly collect their information.
        </p>

        <h2>Legal Compliance</h2>
        <p>We comply with relevant privacy laws and regulations.</p>

        <h2>Contact Us</h2>
        <p>
          For questions or concerns about our privacy practices, contact us via
          email at MockMayhem1@gmail.com
        </p>

        <h2>Changes to This Policy</h2>
        <p>We may update this policy and will post changes on our website.</p>

        <p>Last Updated: 4/8/2024</p>
      </div>
      <Footer />
    </div>
  );
}

export default Priv;
