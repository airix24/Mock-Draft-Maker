import "../Styles/DraftBoard.css";
import TeamContainer from "../Components/TeamContainer";
// import Header from "./Header";
import PlayerContainer from "../Components/PlayerContainer";
import { useEffect, useState } from "react";
import { prospects } from "../Prospects";
import { teams } from "../Teams";
import SaveScreen from "../Components/SaveScreen";
import TradeScreen from "../Components/TradeScreen";

function App(props) {
  const [playerPool, setPlayerPool] = useState([]);
  const [mockDraft, setMockDraft] = useState([]);
  const [showSaveScreen, setShowSaveScreen] = useState(false);
  const [showTradeScreen, setShowTradeScreen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);

  const RANDOM_FACTOR = 3;
  const SPEED = 50;

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

  // simulate draft
  useEffect(() => {
    if (isSimulating) {
      // if mock draft is full, don't simulate
      if (mockDraft.every((slot) => slot.pick !== null)) {
        setIsSimulating(false);
      }
      const interval = setInterval(() => {
        const slot = mockDraft.find((slot) => slot.pick === null);
        if (slot) {
          const team = teams.find((team) => team.abr === slot.team);
          const playerId = selectPlayer(team);
          addPlayer(playerId);
        } else {
          setIsSimulating(false);
        }
      }, SPEED);
      return () => clearInterval(interval);
    }
  }, [isSimulating]);

  // Randomly choose among the three highest ranked player that have not been drafted and that match the team's needs
  function selectPlayer(team) {
    const potentialPicks = [];
    for (let i = 0; i < RANDOM_FACTOR; i++) {
      const index = playerPool.findIndex(
        (player) =>
          player.drafted === false &&
          team.needs.includes(player.position) &&
          !potentialPicks.includes(player.id)
      );
      potentialPicks.push(playerPool[index].id);
    }
    // randomly select a player from the potential picks
    const randomIndex = Math.floor(Math.random() * potentialPicks.length);
    return potentialPicks[randomIndex];
  }

  // add a player to the mock draft
  function addPlayer(playerId, slotIndex) {
    const index = slotIndex
      ? slotIndex
      : mockDraft.findIndex((slot) => slot.pick === null);
    if (index === -1) {
      console.log("Mock draft is full.");
      return;
    }
    setPlayerPool((prev) => {
      const newPool = [...prev];
      for (let i = 0; i < newPool.length; i++) {
        if (newPool[i].id === playerId) {
          newPool[i].drafted = true;
        }
      }
      return newPool;
    });
    setMockDraft((prev) => {
      const newMock = [...prev];
      newMock[index].pick = playerId;
      return newMock;
    });
  }

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

  // swap the picks of two mock draft slots
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
      name: name,
      date: new Date().toLocaleDateString(),
      draft: mockDraft,
    };
    props.setSavedDrafts((prev) => {
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
      {showSaveScreen && (
        <SaveScreen
          setShowSaveScreen={setShowSaveScreen}
          saveDraft={saveDraft}
        />
      )}
      {showTradeScreen && (
        <TradeScreen setShowTradeScreen={setShowTradeScreen} />
      )}
      <div className="container">
        <TeamContainer
          mockDraft={mockDraft}
          removePlayer={removePlayer}
          clearDraft={clearDraft}
          setShowSaveScreen={setShowSaveScreen}
          setIsSimulating={setIsSimulating}
          isSimulating={isSimulating}
          setShowTradeScreen={setShowTradeScreen}
        />
        <PlayerContainer
          playerPool={playerPool}
          addPlayer={addPlayer}
          isSimulating={isSimulating}
        />
      </div>
    </div>
  );
}

export default App;