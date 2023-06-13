import { useState, useEffect } from "react";
import "../Styles/SaveScreen.css";
import Modal from "./Modal";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import {
  saveDraft,
  updateDraft,
  checkNumberOfDrafts,
  checkIfUserEnteredContest,
} from "../utils/firebaseFunctions";

function SaveScreen(props) {
  const MAX_DRAFTS = 30;
  const [hasUserEnteredContest, setHasUserEnteredContest] = useState(true);
  const [tooManyDrafts, setTooManyDrafts] = useState(true);
  const [nameInBox, setNameInBox] = useState(
    props.mode === "editor" ? props.draftSettings.draftName : ""
  );
  const navigate = useNavigate();

  // check if the user has 30 saved drafts already
  useEffect(() => {
    if (props.user) {
      checkNumberOfDrafts(props.user.uid, MAX_DRAFTS).then((result) => {
        setTooManyDrafts(!result);
      });
    }
  }, [props.user]);

  // check if the user has already entered the contest
  useEffect(() => {
    if (props.user) {
      checkIfUserEnteredContest(props.user.uid).then((result) => {
        setHasUserEnteredContest(result);
      });
    }
  }, [props.user]);

  function handleSubmit(e) {
    e.preventDefault();
    if (props.mode === "editor") {
      handleUpdate();
    } else {
      if (e.nativeEvent.submitter.name === "saveAndEnter") {
        handleSave(true);
        navigate("/contest");
      } else {
        handleSave();
      }
    }
    navigate("/");
  }

  function handleSave(andEnter = false) {
    saveDraft(props.user.uid, nameInBox, props.mockDraft, andEnter).then(
      (result) => {
        if (result) {
          props.setShowSaveScreen(false);
          props.clearDraft();
        }
      }
    );
  }

  function handleUpdate(andEnter = false) {
    updateDraft(
      props.user.uid,
      nameInBox,
      props.draftSettings.draftId,
      props.mockDraft,
      props.draftSettings.contestsEntered,
      andEnter
    ).then((result) => {
      if (result) {
        props.setShowSaveScreen(false);
        props.clearDraft();
      }
    });
  }

  return (
    <Modal setShowSelf={props.setShowSaveScreen}>
      {!props.user ? (
        <div className="save-login-div">
          <h3 className="light">Must be logged in to save draft</h3>
          <Auth />
        </div>
      ) : (
        <div className="save-screen">
          <h3 className="save-text">
            {props.mode === "editor"
              ? "Save changes to your draft"
              : "Enter a name for your draft"}
          </h3>
          <form
            className="save-form"
            onSubmit={(e) => {
              e.preventDefault();
              let andEnter = false;
              if (e.nativeEvent.submitter.name === "save-and-enter") {
                andEnter = true;
              }
              if (props.mode === "editor") {
                handleUpdate(andEnter);
              } else {
                handleSave(andEnter);
              }
              //navigate to /contest if the user clicked save and enter
              if (andEnter) {
                navigate("/contests");
              } else {
                navigate("/");
              }
            }}
          >
            <input
              type="text"
              className="save-bar"
              autoFocus
              maxLength={15}
              value={nameInBox}
              onChange={(e) => setNameInBox(e.target.value)}
            />
            <button type="submit" name="save" className="save-btn">
              {props.mode === "editor" ? "Save Changes" : "Save"}
            </button>
            {/* {!hasUserEnteredContest && (
              <>
                <button
                  type="submit"
                  name="save-and-enter"
                  className="save-and-enter-btn"
                >
                  Save and Enter Contest
                </button>
                <h5 className="light edit-reminder">
                  (You can edit your entry up until one hour before the draft)
                </h5>
              </>
            )} */}
          </form>
        </div>
      )}
    </Modal>
  );
}

export default SaveScreen;
