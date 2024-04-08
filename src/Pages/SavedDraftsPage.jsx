import { useState, useEffect } from "react";
import "../Styles/SavedDrafts.css";
import { db } from "../config/firebase-config";
import { collection, getDocs } from "firebase/firestore";
import ViewDraft from "../Components/ViewDraft";
import Modal from "../Components/Modal";
import Auth from "../Components/Auth";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";

function SavedDraftsPage(props) {
  const [currDraft, setCurrDraft] = useState(null);
  const [savedDrafts, setSavedDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currLeague, setCurrLeague] = useState("NFL");
  const [isUserSignedIn, setIsUserSignedIn] = useState(
    props.user ? true : false
  );
  const [showAuth, setShowAuth] = useState(false);
  const [showCurrDraft, setShowCurrDraft] = useState(false);
  const [savedDraftElements, setSavedDraftElements] = useState([]);
  const [isDraftJustDeleted, setIsDraftJustDeleted] = useState(false);

  // get the saved drafts collection from the database
  const usersCollection = collection(db, "users");

  // check if the user is signed in
  useEffect(() => {
    setIsUserSignedIn(props.user ? true : false);
  }, [props.user]);

  // get the saved drafts from the database
  useEffect(() => {
    const savedDraftsCollection = isUserSignedIn
      ? collection(usersCollection, props.user.uid, "savedDrafts")
      : null;

    const getSavedDrafts = async () => {
      try {
        if (!isUserSignedIn) {
          setIsLoading(false);
          return;
        }
        const data = await getDocs(savedDraftsCollection);
        setSavedDrafts(data.docs.map((doc) => doc.data()));
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getSavedDrafts();
  }, [isDraftJustDeleted, isUserSignedIn]); // remove currDraft and find better way to update when a draft is deleted

  // create a div for each saved draft, set savedDraftElements
  useEffect(() => {
    const mappedSavedDraftElements = savedDrafts
      .map((draft, index) => {
        // NBA tab gets all drafts with a league of NBA, NFL tab gets all drafts with a league of NFL and all drafts with no league
        if (
          (currLeague === "NBA" && draft.league !== "NBA") ||
          (currLeague === "NFL" && draft.league !== "NFL" && draft.league)
        ) {
          return;
        }
        // format the date
        const date = new Date(
          draft.createdAt.seconds * 1000
        ).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        return (
          <button
            key={index}
            className="saved-draft-card"
            onClick={() => {
              setCurrDraft(draft);
              setShowCurrDraft(true);
            }}
          >
            <h2 className="saved-draft-name">{draft.draftName}</h2>
            <h4 className="saved-draft-date light">{date}</h4>
            {draft.contestsEntered && draft.contestsEntered.length > 0 && (
              <h4 className="contest-indicator">Entered in Contest</h4>
            )}
          </button>
        );
      })
      .sort((a, b) => {
        return (
          new Date(b.props.children[1].props.children) -
          new Date(a.props.children[1].props.children)
        );
      });

    setSavedDraftElements(mappedSavedDraftElements);
  }, [savedDrafts, currLeague]);

  return (
    <>
      <div className="saved-drafts-page">
        {isUserSignedIn ? (
          <div>
            {isLoading ? (
              <div className="loading-container-for-modal">
                <p>Loading...</p>
              </div>
            ) : (
              <>
                <div className="saved-draft-container">
                  <div className="saved-drafts-top">
                    <h1 className="saved-drafts-title">Saved Drafts</h1>
                    <div className="saved-drafts-league-selector">
                      <button
                        className={`league-selector-button ${
                          currLeague === "NFL" ? "saved-drafts-selected" : ""
                        }`}
                        onClick={() => {
                          setCurrLeague("NFL");
                        }}
                      >
                        NFL
                      </button>
                      <button
                        className={`league-selector-button ${
                          currLeague === "NBA" ? "saved-drafts-selected" : ""
                        }`}
                        onClick={() => {
                          setCurrLeague("NBA");
                        }}
                      >
                        NBA
                      </button>
                    </div>
                  </div>
                  {savedDraftElements.length === 0 ? (
                    <div className="no-saved-drafts-message-div">
                      <h3 className="no-saved-drafts-message light">
                        No saved drafts
                      </h3>
                      <Link
                        to="/draft-board"
                        state={{
                          league: "NFL",
                          prospectClass: "NFL_2024",
                          mode: "builder",
                          draftLength: 32,
                          draftData: null,
                        }}
                        className="link"
                      >
                        <button className="med-blue-btn">Draft Now</button>
                      </Link>
                    </div>
                  ) : (
                    <div className="saved-draft-card-list">
                      {savedDraftElements}
                    </div>
                  )}
                </div>
                {/* )} */}
              </>
            )}
          </div>
        ) : (
          <div className="not-signed-in-message">
            <p>
              <span
                className="sign-in-btn-saved-drafts-page"
                onClick={() => {
                  setShowAuth(true);
                }}
              >
                Sign in
              </span>{" "}
              to view saved drafts
            </p>
          </div>
        )}
        {showAuth && (
          <Modal setShowSelf={setShowAuth}>
            <Auth user={props.user} setShowAuth={setShowAuth} />
          </Modal>
        )}
        {showCurrDraft && currDraft && (
          <Modal setShowSelf={setShowCurrDraft}>
            <ViewDraft
              draft={currDraft}
              setCurrDraft={setCurrDraft}
              user={props.user}
              league={currDraft.league ? currDraft.league : "NFL"}
              prospectClass={
                currDraft.prospectClass ? currDraft.prospectClass : "NFL_2023"
              }
              setIsDraftJustDeleted={setIsDraftJustDeleted}
            />
          </Modal>
        )}
      </div>
      <Footer />
    </>
  );
}

export default SavedDraftsPage;
