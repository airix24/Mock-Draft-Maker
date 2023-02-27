import TeamContainer from "./Components/TeamContainer";
import Header from "./Components/Header";
import PlayerContainer from "./Components/PlayerContainer";
import { useState } from "react";
import { prospects } from "./Prospects";
import { teams } from "./Teams";

function App() {
  const [playerPool, setPlayerPool] = useState(prospects);
  const [mockDraft, setMockDraft] = useState(initializeMock(teams));
  const [savedDrafts, setSavedDrafts] = useState([]);

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

  function addPlayer(playerId) {
    const nextOpenSlot = findNextOpenSlot();
    console.log(nextOpenSlot);
    // checks to see if there's an open slot, if not, return, if so, add player
    if (nextOpenSlot === -1) {
      console.log("all slots full");
    }
    else {
      // change the drafted property to true for the player
      setPlayerPool(prev => {
        const newPool = [...prev];
        for (let i=0; i<newPool.length; i++) {
          if (newPool[i].id === playerId) {
            newPool[i].drafted = true;
          }
        }
        return newPool;
      })
      // add the player to the mock slot pick property
      setMockDraft(prev => {
        const newMock = [...prev];
        newMock[nextOpenSlot].pick = playerId;
        return newMock;     
      })
    }
  }


  function removePlayer(playerId) {
    const index = mockDraft.findIndex(slot => slot.pick === playerId);
    // change the drafted property to false for the player
    setPlayerPool(prev => {
      const newPool = [...prev];
      for (let i=0; i<newPool.length; i++) {
        if (newPool[i].id === playerId) {
          newPool[i].drafted = false;
        }
      }
      return newPool;
    })
    // remove the player to the mock slot pick property
    setMockDraft(prev => {
      const newMock = [...prev];
      newMock[index].pick = null;
      return newMock;  
    })
  }

  function clearDraft() {
    setMockDraft(initializeMock(teams));
    setPlayerPool(prev => {
      const newPool = [...prev];
      for (let i=0; i<newPool.length; i++) {
        newPool[i].drafted = false;
      }
      return newPool;
    })
  }

  function saveDraft() {
    console.log("saving draft");
    setSavedDrafts(prev => {
      const newSaved = [...prev];
      newSaved.push(mockDraft);
      return newSaved;
    }
    )
  }

  function findNextOpenSlot() {
    return mockDraft.findIndex(slot => slot.pick === null);
  }

  return (
    <div>
      <Header />
      <div className="container">
        <TeamContainer mockDraft={mockDraft} removePlayer={removePlayer} clearDraft={clearDraft} saveDraft={saveDraft}/>
        <PlayerContainer playerPool={playerPool} addPlayer={addPlayer}/>
      </div>
    </div>
  );
}

export default App;
