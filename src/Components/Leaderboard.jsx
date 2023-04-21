import { useEffect, useState } from "react";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Modal from "./Modal";
import "../Styles/Leaderboard.css";
import { query, where, getDocs as getDocsQuery } from "firebase/firestore";

function Leaderboard(props) {
  const [users, setUsers] = useState([]);
  const [entryNames, setEntryNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // get every user from the database
  useEffect(() => {
    const getUsers = async () => {
      try {
        const data = await getDocs(collection(db, "users"));
        setUsers(data.docs.map((doc) => doc.data()));
        setIsLoading(false);
      } catch (e) {
        console.error(e);
      }
    };
    getUsers();
  }, []);

  // get every draft from the database that is entered in the main contest
  useEffect(() => {
    users.forEach((user) => {
      const getDrafts = async () => {
        try {
          const q = query(
            collection(db, "users", user.uid, "savedDrafts"),
            where("contestsEntered", "array-contains", "mainContest")
          );
          const data = await getDocsQuery(q);
          data.docs.forEach((doc) => {
            setEntryNames((entryNames) => [
              ...entryNames,
              doc.data().draftName,
            ]);
          });
        } catch (e) {
          console.error(e);
        }
      };
      getDrafts();
    });
  }, [users]);

  return (
    <Modal setShowSelf={props.setShowLeaderboard}>
      {isLoading ? (
        <div className="loading-container-for-modal">
          <p>Loading...</p>
        </div>
      ) : (
        <>
          <h2 className="leaderboard-view-entries-header">
            Total Entries: {entryNames.length}
          </h2>
          <div className="entry-name-container">
            {entryNames.map((entryName, index) => (
              <div className="entry-name" key={index}>
                {entryName}
              </div>
            ))}
          </div>
        </>
      )}
    </Modal>
  );
}

export default Leaderboard;
