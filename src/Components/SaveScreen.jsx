import { useState, useEffect } from "react";
import "../Styles/SaveScreen.css";
import Modal from "./Modal";
import Auth from "./Auth";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import { doc, getDoc } from "firebase/firestore";
import {
  saveDraft,
  updateDraft,
  checkIfUserEnteredContest,
  enterDraftIntoContest,
} from "../utils/firebaseFunctions";
import { nanoid } from "nanoid";

function SaveScreen(props) {
  const [loading, setLoading] = useState(true);
  const MAX_DRAFTS = 30;
  const [hasUserEnteredContest, setHasUserEnteredContest] = useState(true);
  const [tooManyDrafts, setTooManyDrafts] = useState(false);
  const [nameInBox, setNameInBox] = useState(
    props.mode === "editor" ? props.draftSettings.draftData.draftName : ""
  );
  const navigate = useNavigate();

  // check if the user has reached the maximum number of drafts
  useEffect(() => {
    const checkNumberOfDrafts = async (uid, maxDrafts) => {
      try {
        const userDoc = await getDoc(doc(db, "users", uid));
        if (userDoc.data().draftCount === undefined) {
          return true;
        }
        return userDoc.data().draftCount < maxDrafts;
      } catch (e) {
        console.error(e);
      }
    };

    if (props.user) {
      checkNumberOfDrafts(props.user.uid, MAX_DRAFTS).then((result) => {
        setTooManyDrafts(!result);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [props.user]);

  // check if the user has already entered the contest
  // for now hardcode in contestId: AS7oCfs5C2hrsSlPmc6I
  useEffect(() => {
    if (props.user) {
      checkIfUserEnteredContest(props.user.uid, "AS7oCfs5C2hrsSlPmc6I").then(
        (result) => {
          setHasUserEnteredContest(result);
        }
      );
    }
  }, [props.user]);

  // check if the user has already entered the contest
  // useEffect(() => {
  //   if (props.user) {
  //     checkIfUserEnteredLotteryContest(props.user.uid).then((result) => {
  //       setHasUserEnteredLotteryContest(result);
  //     });
  //   }
  // }, [props.user]);

  // function handleSubmit(e) {
  //   e.preventDefault();
  //   if (props.mode === "editor") {
  //     handleUpdate();
  //   } else {
  //     if (e.nativeEvent.submitter.name === "saveAndEnter") {
  //       handleSave(true);
  //       navigate("/contest");
  //     } else {
  //       handleSave();
  //     }
  //   }
  //   navigate("/");
  // }

  function handleSave(andEnter = false) {
    saveDraft(
      props.user.uid,
      nameInBox,
      props.mockDraft,
      andEnter,
      props.league,
      props.prospectClass
    ).then((result) => {
      if (result) {
        props.setShowSaveScreen(false);
        props.clearDraft();
      }
    });
  }

  function handleUpdate(andEnter = false) {
    updateDraft(
      props.user.uid,
      nameInBox,
      props.draftSettings.draftData.draftId,
      props.draftSettings.draftData.draft,
      props.draftSettings.draftData.contestsEntered,
      andEnter,
      props.league,
      props.prospectClass
    ).then((result) => {
      if (result) {
        props.setShowSaveScreen(false);
        props.clearDraft();
      }
    });
  }

  return (
    <Modal setShowSelf={props.setShowSaveScreen}>
      {loading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
        </div>
      ) : !props.user ? (
        <div className="save-login-div">
          <h3 className="must-be-logged-in-to-save light">
            Must be logged in to save draft
          </h3>
          <Auth />
        </div>
      ) : tooManyDrafts ? (
        <div className="too-many-drafts-screen">
          <h2 className="light">
            You have reached the maximum number of drafts
          </h2>
          <h3 className="light">Please delete a draft to save a new one</h3>
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
              let andEnter = false; // this isn't necessary anymore
              let enterContest = false;
              if (e.nativeEvent.submitter.name === "save-and-enter") {
                enterContest = true;
                const draft = {
                  draftId: nanoid(),
                  draftName: nameInBox,
                  createdAt: new Date(),
                  draft: props.mockDraft,
                  userUid: props.user.uid,
                  league: props.league,
                  prospectClass: props.prospectClass,
                };
                enterDraftIntoContest(
                  props.user.uid,
                  "AS7oCfs5C2hrsSlPmc6I",
                  draft
                );
              }
              if (props.mode === "editor") {
                handleUpdate(andEnter);
              } else {
                handleSave(andEnter);
              }
              //navigate to /contest if the user clicked save and enter
              if (enterContest) {
                navigate("/contests");
              } else {
                navigate("/saved-drafts");
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
            {
              //if the user has not entered the contest, show the save and enter button
              !hasUserEnteredContest && (
                <>
                  <button
                    type="submit"
                    name="save-and-enter"
                    className="save-and-enter-btn"
                  >
                    Save and Enter Contest
                  </button>
                  <h5 className="light edit-reminder">
                    (You can edit and resubmit your entry up until one hour
                    before the draft)
                  </h5>
                </>
              )
            }
          </form>
        </div>
      )}
    </Modal>
  );
}

export default SaveScreen;
