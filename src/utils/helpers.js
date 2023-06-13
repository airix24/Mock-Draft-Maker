import { prospects } from "../Prospects/NFL_2023";
import { teams } from "../Teams/NFL_Teams";

function findProspect(id) {
  return prospects.find((prospect) => prospect.id === id);
}

function findTeam(abr) {
  return teams.find((team) => team.abr === abr);
}

// return an array of prospects sorted by rank
function sortProspects(prospects) {
  return prospects.sort((a, b) => a.rank - b.rank);
}

//function that converts milliseconds to days, hours, minutes, seconds, returns a string
function convertTime(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export { findProspect, findTeam, sortProspects, convertTime };
