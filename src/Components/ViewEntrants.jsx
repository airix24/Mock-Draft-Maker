import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Modal from "./Modal";
import "../Styles/ViewEntrants.css";

function ViewEntrants(props) {
  const usersCollection = collection(db, "users");

  const [users, setUsers] = useState([]);
  const [entryNames, setEntryNames] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(usersCollection);
        setUsers(data.docs.map((doc) => doc.data()));
      } catch (e) {
        console.error(e);
      }
    };
    getUsers();
  }, []);

  // access the subcollection savedDrafts of each user and add the draft name to the entryNames array
  useEffect(() => {
    users.forEach((user) => {
      const savedDraftsCollection = collection(usersCollection, user.uid, "savedDrafts");
      const getSavedDrafts = async () => {
        try {
          const data = await getDocs(savedDraftsCollection);
          // check if the draft has the mainContest in its contestsEntered array
          data.docs.forEach((doc) => {
            if (doc.data().contestsEntered.includes("mainContest")) {
              setEntryNames((entryNames) => [...entryNames, doc.data().draftName]);
            }
          });
        } catch (e) {
          console.error(e);
        }
      };
      getSavedDrafts();
    });
  }, [users]);

  return (
    <Modal setShowSelf={props.setShowEntrants}>
      <h2 className="view-entrants-header">Total Entries: {entryNames.length}</h2>
      <div className="entry-name-container">
        {entryNames.map((entryName, index) => (
          <div className="entry-name" key={index}>{entryName}</div>
        ))}
      </div>
    </Modal>
  );
}

export default ViewEntrants;
