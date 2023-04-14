import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { db } from "../config/firebase-config";
import { getDocs, collection } from "firebase/firestore";
import Modal from "./Modal";

function ViewEntrants(props) {
  const [entrants, setEntrants] = useState([]);

  const contestEntriesCollection = collection(db, "contestEntries");

  useEffect(() => {
    const getEntrants = async () => {
      //   const entrantsRef = db.collection("entrants");
      //   const entrantsSnapshot = await getDocs(entrantsRef);
      //   const entrants = entrantsSnapshot.docs.map((doc) => doc.data());
      //   setEntrants(entrants);
      try {
        const data = await getDocs(contestEntriesCollection);
        // log the id too
        setEntrants(data.docs.map((doc) => doc.data().mockName));
      } catch (e) {
        console.error(e);
      }
    };
    getEntrants();
  }, []);

  return (
    <Modal setShowSelf={props.setShowEntrants}>
      {entrants.map((entrant) => (
        <div className="entrant" key={entrant}>
          <h4>{entrant}</h4>
        </div>
      ))}
    </Modal>
  );
}

export default ViewEntrants;
