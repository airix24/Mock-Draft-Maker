import React from "react";
import "../Styles/SaveScreen.css";
import { FaTimes } from "react-icons/fa";
import { nanoid } from "nanoid";

function SaveScreen(props) {
  // save the mock draft to local storage
  function saveDraft(name) {
    name = name === "" ? "Untitled" : name;
    // if the name already exists, append a number to the end of it
    // let i = 1;
    // while (props.savedDrafts.some((draft) => draft.name === name)) {
    //   i++;
    // }
    // if (i > 1) {
    //   name = `${name}(${i})`;
    // }
    const draft = {
      id: nanoid(),
      name: name,
      date: new Date().toLocaleDateString(),
      draft: props.mockDraft,
    };
    props.setSavedDrafts((prev) => {
      const newDraft = [...prev];
      newDraft.push(draft);
      localStorage.setItem("savedDrafts", JSON.stringify(newDraft));
      return newDraft;
    });
    props.setShowSaveScreen(false);
    props.clearDraft();
  }

  return (
    <div className="outer-modal" onClick={() => props.setShowSaveScreen(false)}>
      <div className="inner-modal save-inner-modal" onClick={(e) => e.stopPropagation()}>
        <div className="top-bar modal-bar">
          <FaTimes
            className="icon"
            size={20}
            onClick={() => props.setShowSaveScreen(false)}
          />
        </div>
        <div className="modal-content">
          <h3 className="save-text">Enter a name for your draft</h3>
          <form className="save-form" onSubmit={(e) => {
            e.preventDefault();
            saveDraft(e.target[0].value);
          }}>
            <input type="text" className="save-bar" autoFocus maxLength={30} />
            <button className="save-btn">Save</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SaveScreen;
