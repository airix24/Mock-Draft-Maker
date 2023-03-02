import TeamContainer from "./Components/TeamContainer";
import Header from "./Components/Header";
import PlayerContainer from "./Components/PlayerContainer";
import { useEffect, useState } from "react";
import { prospects } from "./Prospects";
import { teams } from "./Teams";
import SavedDrafts from "./Components/SavedDrafts";
import SaveScreen from "./Components/SaveScreen";
import SideMenu from "./Components/SideMenu";
import DisplayDraft from "./Components/DisplayDraft";

function App() {
  const [playerPool, setPlayerPool] = useState([]);
  const [mockDraft, setMockDraft] = useState([]);
  const [savedDrafts, setSavedDrafts] = useState(
    localStorage.getItem("savedDrafts")
      ? JSON.parse(localStorage.getItem("savedDrafts"))
      : []
  );
  const [displayedDraft, setDisplayedDraft] = useState(null);
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [showSavedDrafts, setShowSavedDrafts] = useState(false);
  const [showSaveScreen, setShowSaveScreen] = useState(false);
  const [showDisplayDraft, setShowDisplayDraft] = useState(false);

  // initialize the mock draft when the app loads for the first time
  useEffect(() => {
    setMockDraft(initializeMock(teams));
  }, []);

  // initialize the player pool when the app loads for the first time
  useEffect(() => {
    setPlayerPool(sortProspects(prospects));
  }, []);

  // initialize the mock draft
  function initializeMock(teams) {
    console.log("initializing mock");
    const mockSlots = new Array(31);
    teams.map((team) => {
      if (team.picks) {
        team.picks.map((pick) => {
          mockSlots[pick - 1] = {
            team: team.abr,
            pick: null,
          };
        });
      }
    });
    return mockSlots;
  }

  // return an array of prospects sorted by rank
  function sortProspects(prospects) {
    return prospects.sort((a, b) => a.rank - b.rank);
  }

  // add a player to the mock draft
  function addPlayer(playerId, abr) {
    const index = abr
      ? mockDraft.findIndex((slot) => slot.team === abr)
      : mockDraft.findIndex((slot) => slot.pick === null);
    if (index === -1) {
      return;
    }
    // change the drafted property to true for the player
    setPlayerPool((prev) => {
      const newPool = [...prev];
      for (let i = 0; i < newPool.length; i++) {
        if (newPool[i].id === playerId) {
          newPool[i].drafted = true;
        }
      }
      return newPool;
    });
    // add the player to the mock slot pick property
    setMockDraft((prev) => {
      console.log("adding player to mock");
      const newMock = [...prev];
      newMock[index].pick = playerId;
      return newMock;
    });
  }

  // function randomizeDraft() {
  //   const newMock = [...mockDraft];
  //   const newPool = [...playerPool];
  //   for (let i = 0; i < newMock.length; i++) {
  //     const randomIndex = Math.floor(Math.random() * newPool.length);
  //     const player = newPool[randomIndex];
  //     newMock[i].pick = player.id;
  //     player.drafted = true;
  //     newPool.splice(randomIndex, 1);
  //   }
  //   setMockDraft(newMock);
  //   setPlayerPool(newPool);
  // }

  // remove a player from the mock draft
  function removePlayer(playerId) {
    const index = mockDraft.findIndex((slot) => slot.pick === playerId);
    // change the drafted property to false for the player
    setPlayerPool((prev) => {
      const newPool = [...prev];
      for (let i = 0; i < newPool.length; i++) {
        if (newPool[i].id === playerId) {
          newPool[i].drafted = false;
        }
      }
      return newPool;
    });
    // remove the player from the mock slot pick property
    setMockDraft((prev) => {
      const newMock = [...prev];
      newMock[index].pick = null;
      return newMock;
    });
  }

  // function swapPicks(index1, index2) {
  //   const newMock = [...mockDraft];
  //   const temp = newMock[index1];
  //   newMock[index1] = newMock[index2];
  //   newMock[index2] = temp;
  //   setMockDraft(newMock);
  // }

  // clear the mock draft and reset the player pool
  function clearDraft() {
    setMockDraft(initializeMock(teams));
    setPlayerPool((prev) => {
      const newPool = [...prev];
      for (let i = 0; i < newPool.length; i++) {
        newPool[i].drafted = false;
      }
      return newPool;
    });
  }

  // save the mock draft to local storage
  function saveDraft(name) {
    const draft = {
      name: name,
      date: new Date().toLocaleDateString(),
      draft: mockDraft,
    };
    setSavedDrafts((prev) => {
      const newDrafts = [...prev];
      newDrafts.push(draft);
      localStorage.setItem("savedDrafts", JSON.stringify(newDrafts));
      return newDrafts;
    });
    setShowSaveScreen(false);
    clearDraft();
  }

  return (
    <div>
      {/* <button onClick={randomizeDraft}>randomize</button> */}
      {showSideMenu && (
        <SideMenu
          setShowSideMenu={setShowSideMenu}
          setShowSavedDrafts={setShowSavedDrafts}
        />
      )}
      {showSavedDrafts && (
        <SavedDrafts
          savedDrafts={savedDrafts}
          setShowSavedDrafts={setShowSavedDrafts}
          setShowDisplayDraft={setShowDisplayDraft}
          setDisplayedDraft={setDisplayedDraft}
        />
      )}
      {showSaveScreen && (
        <SaveScreen
          setShowSaveScreen={setShowSaveScreen}
          saveDraft={saveDraft}
        />
      )}
      {showDisplayDraft && (
        <DisplayDraft
          setShowDisplayDraft={setShowDisplayDraft}
          setShowSavedDrafts={setShowSavedDrafts}
          displayedDraft={displayedDraft}
        />
      )}
      <Header showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      <div className="container">
        <TeamContainer
          mockDraft={mockDraft}
          removePlayer={removePlayer}
          clearDraft={clearDraft}
          setShowSaveScreen={setShowSaveScreen}
        />
        <PlayerContainer playerPool={playerPool} addPlayer={addPlayer} />
      </div>
    </div>
  );
}

export default App;
