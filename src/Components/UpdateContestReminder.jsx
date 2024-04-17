import React from "react";
import Modal from "./Modal";
import "../Styles/UpdateContestReminder.css";

function UpdateContestReminder(props) {
  return (
    <Modal setShowSelf={props.setShowUpdateContestReminder}>
        <div className="update-contest-reminder">
            <h4 className="light">To update your contest entry, you must remove and then resubmit your entry from the contest page.</h4>
            <button onClick={() => props.setShowUpdateContestReminder(false)}
                className="med-blue-btn"
            >
                Got it
            </button>
        </div>
    </Modal>
  );
}

export default UpdateContestReminder;
