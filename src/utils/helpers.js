import { NFL_2023_Prospects } from "../Prospects/NFL_2023";
import { NFL_2024_Prospects } from "../Prospects/NFL_2024";
import { NBA_2023_Prospects } from "../Prospects/NBA_2023";
import { NFL_Teams } from "../Teams/NFL_Teams";
import { NBA_Teams } from "../Teams/NBA_Teams";

function findProspect(id, prospectClass) {
  // return NFL_2023_Prospects.find((prospect) => prospect.id === id);
  if (prospectClass === "NFL_2023") {
    return NFL_2023_Prospects.find((prospect) => prospect.id === id);
  }
  if (prospectClass === "NBA_2023") {
    return NBA_2023_Prospects.find((prospect) => prospect.id === id);
  }
  if (prospectClass === "NFL_2024") {
    return NFL_2024_Prospects.find((prospect) => prospect.id === id);
  }
}

function findTeam(abr, league) {
  // return NFL_Teams.find((team) => team.abr === abr);
  if (league === "NFL") {
    return NFL_Teams.find((team) => team.abr === abr);
  }
  if (league === "NBA") {
    return NBA_Teams.find((team) => team.abr === abr);
  }
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
