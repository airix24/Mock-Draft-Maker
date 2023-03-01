import { prospects } from "./Prospects";

function findProspect(id) {
  return prospects.find((prospect) => prospect.id === id);
}

export { findProspect };
