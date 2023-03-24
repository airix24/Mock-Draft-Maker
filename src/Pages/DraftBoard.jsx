import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { prospects } from "../Prospects";
import { teams } from "../Teams";

import { initializeMock, sortProspects } from "../util";

import SaveScreen from "../Components/SaveScreen";
import TradeScreen from "../Components/TradeScreen";
import PlayerContainer from "../Components/PlayerContainer";
import TeamContainer from "../Components/TeamContainer";
import ControlPanel from "../Components/ControlPanel";

import "../Styles/DraftBoard.css";

function DraftBoard(props) {
  const location = useLocation();
  const draftSettings = location.state;

  const [playerPool, setPlayerPool] = useState([]);
  const [mockDraft, setMockDraft] = useState([]);
  const [showSaveScreen, setShowSaveScreen] = useState(false);
  const [showTradeScreen, setShowTradeScreen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mode] = useState(draftSettings ? "gm" : "builder");
  const [userTeam] = useState(draftSettings ? draftSettings.team : null);
  // const [rounds, setRounds] = useState(draftSettings ? draftSettings.rounds : 1);
  const [speed, setSpeed] = useState(draftSettings ? draftSettings.speed : 200);
  const [randomFactor] = useState(draftSettings ? draftSettings.randomness : 3);

  function useInitializeMockDraft(teams) {
    useEffect(() => {
      setMockDraft(initializeMock(teams));
    }, []);
  }

  function useInitializePlayerPool(prospects) {
    useEffect(() => {
      const sortedProspects = sortProspects(prospects);
      const newPlayerPool = sortedProspects.map((prospect) => ({
        ...prospect,
        drafted: false,
        starred: false,
      }));
      setPlayerPool(newPlayerPool);
    }, []);
  }

  // usage
  useInitializeMockDraft(teams);
  useInitializePlayerPool(prospects);

  // simulate draft
  useEffect(() => {
    if (!isSimulating) {
      return;
    }
    // if mock draft is full, don't simulate
    if (mockDraft.every((slot) => slot.pick !== null)) {
      setIsSimulating(false);
      return;
    }
    const interval = setInterval(() => {
      const slot = mockDraft.find((slot) => slot.pick === null);
      // if the user's team is up to pick, stop simulating
      if (!slot || slot.team === userTeam) {
        setIsSimulating(false);
        return;
      }
      const team = teams.find((team) => team.abr === slot.team);
      const playerId = selectPlayer(team);
      addPlayer(playerId);
    }, speed);

    return () => clearInterval(interval);
  }, [isSimulating, mockDraft, speed, userTeam]);

  // Randomly choose among the three highest ranked players that have not been drafted and that match the team's needs
  function selectPlayer(team) {
    const potentialPicks = [];
    const unselectedPlayers = playerPool.filter(
      (player) =>
        player.drafted === false &&
        team.needs.includes(player.position) &&
        !potentialPicks.includes(player.id)
    );
    for (let i = 0; i < randomFactor && unselectedPlayers.length > 0; i++) {
      potentialPicks.push(unselectedPlayers[i].id);
    }
    const randomIndex = Math.floor(Math.random() * potentialPicks.length);
    return potentialPicks[randomIndex];
  }

  function addPlayer(playerId, slotIndex) {
    const index =
      slotIndex ?? mockDraft.findIndex((slot) => slot.pick === null);
    if (index === -1) {
      console.log("Mock draft is full.");
      return;
    }
    updatePlayerPool(playerId, true);
    updateMockDraft(index, playerId);
    if (mode === "gm") {
      setIsSimulating(true);
    }
  }

  function removePlayer(playerId) {
    const index = mockDraft.findIndex((slot) => slot.pick === playerId);
    updatePlayerPool(playerId, false);
    updateMockDraft(index, null);
  }

  function clearDraft() {
    setPlayerPool((prev) => {
      const newPool = prev.map((player) => ({
        ...player,
        drafted: false,
        starred: false,
      }));
      return newPool;
    });
    setMockDraft(initializeMock(teams));
  }

  function updatePlayerPool(playerId, isPlayerBeingDrafted) {
    setPlayerPool((prev) => {
      const index = prev.findIndex((player) => player.id === playerId);
      const newPool = [...prev];
      newPool[index].drafted = isPlayerBeingDrafted;
      return newPool;
    });
  }

  function updateMockDraft(index, playerId) {
    setMockDraft((prev) => {
      const newMock = [...prev];
      newMock[index].pick = playerId;
      return newMock;
    });
  }

  function isDraftStarted() {
    return mockDraft.find((slot) => slot.pick !== null);
  }

  function isUserPick() {
    const slot = mockDraft.find((slot) => slot.pick === null);
    return slot && slot.team === userTeam;
  }

  function isDraftFinished() {
    return mockDraft.every((slot) => slot.pick !== null);
  }

  return (
    <div className="draft-screen">
      {showSaveScreen && (
        <SaveScreen
          setShowSaveScreen={setShowSaveScreen}
          mockDraft={mockDraft}
          setSavedDrafts={props.setSavedDrafts}
          clearDraft={clearDraft}
        />
      )}
      {showTradeScreen && (
        <TradeScreen setShowTradeScreen={setShowTradeScreen} />
      )}
      <div className="container">
        <TeamContainer
          mockDraft={mockDraft}
          mode={mode}
          userTeam={userTeam}
          removePlayer={removePlayer}
        />
        <PlayerContainer
          playerPool={playerPool}
          addPlayer={addPlayer}
          isSimulating={isSimulating}
          mode={mode}
          isUserPick={isUserPick}
          isDraftFinished={isDraftFinished}
          setPlayerPool={setPlayerPool}
        />
      </div>
      <ControlPanel
        mode={mode}
        isDraftFinished={isDraftFinished}
        isDraftStarted={isDraftStarted}
        isUserPick={isUserPick}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        setShowSaveScreen={setShowSaveScreen}
        clearDraft={clearDraft}
        speed={speed}
        setSpeed={setSpeed}
      />
    </div>
  );
}

export default DraftBoard;
