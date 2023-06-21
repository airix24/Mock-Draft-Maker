import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { NFL_2023_Prospects } from "../Prospects/NFL_2023";
import { NBA_2023_Prospects } from "../Prospects/NBA_2023";
import { NFL_Teams } from "../Teams/NFL_Teams";
import { NBA_Teams } from "../Teams/NBA_Teams";

import { sortProspects } from "../utils/helpers";

import SaveScreen from "../Components/SaveScreen";
import PlayerContainer from "../Components/PlayerContainer";
import TeamContainer from "../Components/TeamContainer";
import ControlPanel from "../Components/ControlPanel";

import "../Styles/DraftBoard.css";

function DraftBoard(props) {
  const location = useLocation();
  const draftSettings = location.state;

  const [teams] = useState(
    draftSettings.league === "NFL" ? NFL_Teams : NBA_Teams
  );
  const [prospects] = useState(
    draftSettings.prospectClass === "NFL_2023"
      ? NFL_2023_Prospects
      : NBA_2023_Prospects
  );

  const [playerPool, setPlayerPool] = useState([]);
  const [mockDraft, setMockDraft] = useState([]);
  const [showSaveScreen, setShowSaveScreen] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [mode, setMode] = useState(draftSettings.mode);
  // const [mode] = useState(
  //   !draftSettings ? "builder" : draftSettings.draftId ? "editor" : "gm"
  // );
  const [userTeam] = useState(draftSettings ? draftSettings.team : null);
  // const [rounds, setRounds] = useState(draftSettings ? draftSettings.rounds : 1);
  // const [draftLength] = useState(
  //   draftSettings.draftLength ? draftSettings.draftLength : 31
  // );
  const [speed, setSpeed] = useState(1000);
  const [randomFactor] = useState(3);
  const [currList, setCurrList] = useState("draftResults");

  // initialize mock draft
  function useInitializeMockDraft(teams) {
    useEffect(() => {
      if (mode === "editor") {
        setMockDraft(draftSettings.draftData.draft);
      } else {
        setMockDraft(initializeMock(teams, draftSettings.draftLength));
      }
    }, []);
  }

  function initializeMock(teams, draftLength) {
    const mockSlots = new Array().fill(null).map(() => ({
      team: null,
      pick: null,
    }));

    teams.forEach((team) => {
      if (team.picks) {
        team.picks.forEach((pick) => {
          if (pick > draftLength) return;
          mockSlots[pick - 1] = {
            team: team.abr,
            pick: null,
          };
        });
      }
    });

    return mockSlots;
  }

  // function initializeMock(teams) {
  //   const mockSlots = new Array();
  //   teams.map((team) => {
  //     if (team.picks) {
  //       team.picks.map((pick) => {
  //         mockSlots[pick - 1] = {
  //           team: team.abr,
  //           pick: null,
  //         };
  //       });
  //     }
  //   });
  //   return mockSlots;
  // }

  // initialize player pool
  function useInitializePlayerPool(prospects) {
    useEffect(() => {
      if (mode === "editor") {
        // cycle through the mock draft and set the drafted property of the corresponding player to true
        const newPlayerPool = prospects.map((prospect) => {
          const player = { ...prospect };
          draftSettings.draftData.draft.forEach((slot) => {
            if (slot.pick === player.id) {
              player.drafted = true;
            }
          });
          return player;
        });
        setPlayerPool(sortProspects(newPlayerPool));
      } else {
        const sortedProspects = sortProspects(prospects);
        const newPlayerPool = sortedProspects.map((prospect) => ({
          ...prospect,
          drafted: false,
          starred: false,
          expanded: false,
        }));
        setPlayerPool(newPlayerPool);
      }
    }, []);
  }

  // initialize mock draft and player pool
  useInitializeMockDraft(teams);
  useInitializePlayerPool(prospects);

  // simulate draft
  useEffect(() => {
    if (!isSimulating) {
      return;
    }
    //if player pool is empty, don't simulate
    if (playerPool.every((player) => player.drafted === true)) {
      setIsSimulating(false);
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

  // Randomly choose among the three highest ranked players that have not been drafted and that match the team's needs if it's NFL, if it's NBA, don't worry about team needs
  function selectPlayer(team) {
    const potentialPicks = [];
    const unselectedPlayers =
      draftSettings.league === "NBA"
        ? playerPool.filter(
            (player) =>
              player.drafted === false && !potentialPicks.includes(player.id)
          )
        : playerPool.filter(
            (player) =>
              player.drafted === false &&
              team.needs.includes(player.position) &&
              !potentialPicks.includes(player.id)
          );
  
    const numPlayersToSelect = Math.min(randomFactor, unselectedPlayers.length); // Determine the number of players to select
  
    for (let i = 0; i < numPlayersToSelect; i++) { // Use numPlayersToSelect as the loop condition
      potentialPicks.push(unselectedPlayers[i].id);
    }
  
    const randomIndex = Math.floor(Math.random() * potentialPicks.length);
    return potentialPicks[randomIndex];
  }
  
  // function selectPlayer(team) {
  //   const potentialPicks = [];
  //   const unselectedPlayers =
  //     draftSettings.league === "NBA"
  //       ? playerPool.filter(
  //           (player) =>
  //             player.drafted === false && !potentialPicks.includes(player.id)
  //         )
  //       : playerPool.filter(
  //           (player) =>
  //             player.drafted === false &&
  //             team.needs.includes(player.position) &&
  //             !potentialPicks.includes(player.id)
  //         );
  //   for (let i = 0; i < randomFactor && unselectedPlayers.length > 0; i++) {
  //     potentialPicks.push(unselectedPlayers[i].id);
  //   }
  //   const randomIndex = Math.floor(Math.random() * potentialPicks.length);
  //   return potentialPicks[randomIndex];
  // }

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
        expanded: false,
      }));
      return newPool;
    });
    setMockDraft(initializeMock(teams, draftSettings.draftLength));
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
      {props.screenSize !== "desktop" && (
        <div className="container-select">
          <div
            className={`container-select-btn ${
              currList === "draftResults" && "selected"
            }`}
            onClick={() => setCurrList("draftResults")}
          >
            <h3>Draft Results</h3>
          </div>
          <div
            className={`container-select-btn ${
              currList === "playerPool" && "selected"
            }`}
            onClick={() => setCurrList("playerPool")}
          >
            <h3>Player Pool</h3>
          </div>
        </div>
      )}
      {showSaveScreen && (
        <SaveScreen
          setShowSaveScreen={setShowSaveScreen}
          mockDraft={mockDraft}
          setSavedDrafts={props.setSavedDrafts}
          clearDraft={clearDraft}
          user={props.user}
          mode={mode}
          draftSettings={draftSettings}
          league={draftSettings.league}
          prospectClass={draftSettings.prospectClass}
        />
      )}
      <div className="container">
        {(props.screenSize === "desktop" || currList === "draftResults") && (
          <TeamContainer
            mockDraft={mockDraft}
            mode={mode}
            userTeam={userTeam}
            removePlayer={removePlayer}
            screenSize={props.screenSize}
            league={draftSettings.league}
          />
        )}
        {(props.screenSize === "desktop" || currList === "playerPool") && (
          <PlayerContainer
            playerPool={playerPool}
            addPlayer={addPlayer}
            isSimulating={isSimulating}
            mode={mode}
            isUserPick={isUserPick}
            isDraftFinished={isDraftFinished}
            setPlayerPool={setPlayerPool}
            screenSize={props.screenSize}
            league={draftSettings.league}
          />
        )}
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
