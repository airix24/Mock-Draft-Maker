import { db } from "../config/firebase-config";
import {
  collection,
  doc,
  deleteDoc,
  setDoc,
  getDocs,
  updateDoc,
  increment,
} from "firebase/firestore";
import { nanoid } from "nanoid";

// delete the draft from the database and decrement the draft count in the user document
async function deleteDraft(uid, draftId) {
  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(usersCollection, uid, "savedDrafts");
  const draftDoc = doc(savedDraftsCollection, draftId);
  await deleteDoc(draftDoc)
    .then(() => {
      decrementDraftCount(uid);
    })
    .catch((error) => {
      console.error("Error removing document: ", error);
    });
}

// save the mock draft to the database and increment the draft count in the user document
async function saveDraft(
  userUid,
  name,
  mockDraft,
  enterContest,
  league,
  prospectClass
) {
  const contest = enterContest ? ["lotteryContest"] : [];

  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(
    usersCollection,
    userUid,
    "savedDrafts"
  );
  name = name === "" ? "Untitled" : name;
  const draftId = nanoid();
  const draft = {
    draftId: draftId,
    draftName: name,
    createdAt: new Date(),
    draft: mockDraft,
    contestsEntered: contest,
    userUid: userUid,
    league,
    prospectClass,
  };
  try {
    await setDoc(doc(savedDraftsCollection, draftId), draft)
      .then(() => {
        incrementDraftCount(userUid);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

// update the draft in the database
async function updateDraft(
  userUid,
  nameInBox,
  draftId,
  mockDraft,
  contestsEntered,
  enterContest,
  league,
  prospectClass
) {
  if (enterContest) {
    contestsEntered.push("mainContest");
  }
  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(
    usersCollection,
    userUid,
    "savedDrafts"
  );
  const name = nameInBox === "" ? "Untitled" : nameInBox;
  const draft = {
    draftId: draftId,
    draftName: name,
    createdAt: new Date(),
    draft: mockDraft,
    contestsEntered: contestsEntered,
    userUid: userUid,
    league,
    prospectClass,
  };
  try {
    await setDoc(doc(savedDraftsCollection, draftId), draft);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

//remove draft from contest
async function removeDraftFromContest(userUid, contestId) {
  const contestsCollection = collection(db, "contests");
  const contestDoc = doc(contestsCollection, contestId);
  const entriesCollection = collection(contestDoc, "entries");
  const entryDoc = doc(entriesCollection, userUid);
  deleteDoc(entryDoc);
}

// increment the draft count in the user document
async function incrementDraftCount(userUid) {
  const userDoc = doc(db, "users", userUid);
  await updateDoc(userDoc, {
    draftCount: increment(1),
  });
}

// decrement the draft count in the user document
async function decrementDraftCount(userUid) {
  const userDoc = doc(db, "users", userUid);
  await updateDoc(userDoc, {
    draftCount: increment(-1),
  });
}

// async function checkNumberOfDrafts(userUid, maxDrafts) {
//   const usersCollection = collection(db, "users");
//   const savedDraftsCollection = collection(
//     usersCollection,
//     userUid,
//     "savedDrafts"
//   );
//   const querySnapshot = await getDocs(savedDraftsCollection);
//   return querySnapshot.docs.length < maxDrafts;
// }

// check if the user has a draft entered in the contest, return a boolean
// async function checkIfUserEnteredContest(userUid) {
//   const usersCollection = collection(db, "users");
//   const savedDraftsCollection = collection(
//     usersCollection,
//     userUid,
//     "savedDrafts"
//   );
//   const querySnapshot = await getDocs(savedDraftsCollection);
//   const drafts = querySnapshot.docs.map((doc) => doc.data());
//   const isContestEntered = drafts.some(
//     (draft) => draft.contestsEntered.length > 0
//   );
//   return isContestEntered;
// }

// async function checkIfUserEnteredLotteryContest(userUid) {
//   const usersCollection = collection(db, "users");
//   const savedDraftsCollection = collection(
//     usersCollection,
//     userUid,
//     "savedDrafts"
//   );
//   const querySnapshot = await getDocs(savedDraftsCollection);
//   const drafts = querySnapshot.docs.map((doc) => doc.data());
//   const isContestEntered = drafts.some((draft) =>
//     draft.contestsEntered.includes("lotteryContest")
//   );
//   return isContestEntered;
// }

// async function isUserEnteredInContest(userUid, contestId) {
//   const usersCollection = collection(db, "users");
//   const savedDraftsCollection = collection(
//     usersCollection,
//     userUid,
//     "savedDrafts"
//   );
//   const querySnapshot = await getDocs(savedDraftsCollection);
//   const drafts = querySnapshot.docs.map((doc) => doc.data());
//   const isContestEntered = drafts.some((draft) =>
//     draft.contestsEntered.includes(contestId)
//   );
//   return isContestEntered;
// }

export {
  deleteDraft,
  saveDraft,
  updateDraft,
  removeDraftFromContest,
  // checkNumberOfDrafts,
  // checkIfUserEnteredContest,
  // isUserEnteredInContest,
  // checkIfUserEnteredLotteryContest,
};
