import { useState, useEffect } from "react";
import "../Styles/SaveScreen.css";
import Modal from "./Modal";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import {
  saveDraft,
  updateDraft,
  checkNumberOfDrafts,
} from "../utils/firebaseFunctions";

function SaveScreen(props) {
  const MAX_DRAFTS = 30;
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

  function handleSubmit(e) {
    e.preventDefault();
    if (props.mode === "editor") {
      handleUpdate();
    } else {
      handleSave();
    }
    navigate("/");
  }

  function handleSave() {
    saveDraft(props.user.uid, nameInBox, props.mockDraft).then((result) => {
      if (result) {
        props.setShowSaveScreen(false);
        props.clearDraft();
      }
    });
  }

  function handleUpdate() {
    updateDraft(
      props.user.uid,
      nameInBox,
      props.draftSettings.draftId,
      props.mockDraft,
      props.draftSettings.contestsEntered
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
            // onSubmit={handleSubmit}
            onSubmit={(e) => {
              if (tooManyDrafts && props.mode !== "editor") {
                e.preventDefault();
                alert("You have too many saved drafts already");
              } else {
                handleSubmit(e);
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
            <button className="save-btn">
              {props.mode === "editor" ? "Save Changes" : "Save"}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
}

export default SaveScreen;
