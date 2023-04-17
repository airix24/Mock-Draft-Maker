import { prospects } from "./Prospects";
import { teams } from "./Teams";

function findProspect(id) {
  return prospects.find((prospect) => prospect.id === id);
}

function findTeam(abr) {
  return teams.find((team) => team.abr === abr);
}

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

export { findProspect, findTeam, initializeMock, sortProspects };
