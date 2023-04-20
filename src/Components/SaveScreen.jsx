import { useState, useEffect } from "react";
import "../Styles/SaveScreen.css";
import Modal from "./Modal";
import Auth from "./Auth";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase-config";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

function SaveScreen(props) {
  const [tooManyDrafts, setTooManyDrafts] = useState(true);
  const [nameInBox, setNameInBox] = useState(
    props.mode === "editor" ? props.draftSettings.draftName : ""
  );
  const navigate = useNavigate();

  // check if the user has 30 saved drafts already
  useEffect(() => {
    if (props.user) {
      const usersCollection = collection(db, "users");
      const savedDraftsCollection = collection(
        usersCollection,
        props.user.uid,
        "savedDrafts"
      );
      getDocs(savedDraftsCollection).then((querySnapshot) => {
        if (querySnapshot.docs.length < 30) {
          setTooManyDrafts(false);
        }
      });
    }
  }, [props.user]);

  // save the mock draft to the database
  function saveDraft(name) {
    const usersCollection = collection(db, "users");
    const savedDraftsCollection = collection(
      usersCollection,
      props.user.uid,
      "savedDrafts"
    );
    name = name === "" ? "Untitled" : name;
    const draftId = nanoid();
    const draft = {
      draftId: draftId,
      draftName: name,
      createdAt: new Date(),
      draft: props.mockDraft,
      contestsEntered: [],
    };
    // Set the document ID as a field in the data object
    if (tooManyDrafts) return;
    setDoc(doc(savedDraftsCollection, draftId), draft)
      .then(() => {
        props.setShowSaveScreen(false);
        props.clearDraft();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  // update the mock draft in the database
  function updateDraft() {
    const usersCollection = collection(db, "users");
    const savedDraftsCollection = collection(
      usersCollection,
      props.user.uid,
      "savedDrafts"
    );
    const name = nameInBox === "" ? "Untitled" : nameInBox;
    const draft = {
      draftId: props.draftSettings.draftId,
      draftName: name,
      createdAt: new Date(),
      draft: props.mockDraft,
      contestsEntered: props.draftSettings.contestsEntered,
    };
    // Set the document ID as a field in the data object
    setDoc(doc(savedDraftsCollection, props.draftSettings.draftId), draft)
      .then(() => {
        props.setShowSaveScreen(false);
        props.clearDraft();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.mode === "editor" ? updateDraft() : saveDraft(e.target[0].value);
    navigate("/");
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
