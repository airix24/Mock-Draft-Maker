import { db } from "../config/firebase-config";
import { collection, doc, deleteDoc, setDoc, getDocs } from "firebase/firestore";
import { nanoid } from "nanoid";

// delete the draft from the database
function deleteDraft(uid, draftId) {
  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(usersCollection, uid, "savedDrafts");
  const draftDoc = doc(savedDraftsCollection, draftId);
  deleteDoc(draftDoc);
}

// save the mock draft to the database
async function saveDraft(userUid, name, mockDraft) {
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
    contestsEntered: [],
    userUid: userUid,
  };
  try {
    await setDoc(doc(savedDraftsCollection, draftId), draft);
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
  contestsEntered
) {
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
  };
  try {
    await setDoc(doc(savedDraftsCollection, draftId), draft);
    return true;
  } catch (error) {
    console.error("Error adding document: ", error);
    return false;
  }
}

async function checkNumberOfDrafts(userUid, maxDrafts) {
  const usersCollection = collection(db, "users");
  const savedDraftsCollection = collection(usersCollection, userUid, "savedDrafts");
  const querySnapshot = await getDocs(savedDraftsCollection);
  return querySnapshot.docs.length < maxDrafts;
}

export { deleteDraft, saveDraft, updateDraft, checkNumberOfDrafts };
